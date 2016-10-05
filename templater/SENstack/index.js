'use strict'
const fs = require('fs')
const nj = require('nunjucks')
const mkdirp = require('mkdirp')
const beautify = require('js-beautify').js_beautify
const path = require('path')

const runRecipe = function(data, projLocation = data.DB.def.name) {

  const projName = data.projName || 'project';

  //configure nunjucks
  const njenv = nj.configure(__dirname, {
    noCache: true,
    trimBlocks: true
  })

  //add sequelize filter
  njenv.addFilter('Sequelize_Type', function(str) {
    return 'Sequelize.' + str.toUpperCase();
  })

  //write environment file
  mkdirp.sync(path.join(projLocation, '/env'), function(err) {
    if (err) throw err;
    console.log('env directory created');
  })

  const envIndex = nj.render('environment.js', data.DB.def);

  const toReturn = beautify(envIndex, { indent_size: 2 })
  fs.writeFileSync(path.join(projLocation, '/env/index.js'), toReturn)

  //create package.json
  const packageMade = njenv.render('packageMaker.js', data.github)
  fs.writeFileSync(path.join(projLocation, '/package.json'), beautify(packageMade, { indent_size: 2 }))

  //write db folder
  mkdirp.sync(path.join(projLocation, '/db/'), function(err) {
    if (err) throw err;
    console.log('db directory created')
  });

  //write the _db and _db_init files
  const _db = njenv.render('_db.js', data.DB.def)
  fs.writeFileSync(path.join(projLocation, '/db/_db.js'), beautify(_db, { indent_size: 2 }))

  const _db_init = njenv.render('_db_init.js', data.DB.def)
  fs.writeFileSync(path.join(projLocation, '/db/_db_init.js'), beautify(_db_init, { indent_size: 2 }))

  //write models
  mkdirp.sync(path.join(projLocation, '/db/models/'), function(err) {
    if (err) throw err;
    console.log('models directory created')
  });

  data.DB.Tables.forEach((table) => {
    const model = njenv.render('sequelizeTable.js', table);
    fs.writeFileSync(path.join(projLocation, `/db/models/${table.name}.js`), beautify(model, { indent_size: 2 }))
  })

  const associations = njenv.render('sequelizeIndex.js', data.DB)
  fs.writeFileSync(path.join(projLocation, `/db/index.js`), beautify(associations, { indent_size: 2 }))

  //create express server
  mkdirp.sync(path.join(projLocation, '/server'), function(err) {
    if (err) throw err;
    console.log('server directory created')
  });

  const expressServer = njenv.render('expressServer.js', {})
  fs.writeFileSync(path.join(projLocation, '/server/app.js'), beautify(expressServer, { indent_size: 2 }))

  //create api routes
  mkdirp.sync(path.join(projLocation, '/server/routes'), function(err) {
    if (err) throw err;
    console.log('routes directory created')
  });

  const router = njenv.render('expressRouterIndex.js', data.DB)
  fs.writeFileSync(path.join(projLocation, `/server/routes/index.js`), beautify(router, { indent_size: 2 }))

  data.DB.Tables.forEach((table) => {
    const router = njenv.render('expressRouter.js', table)
    fs.writeFileSync(path.join(projLocation, `/server/routes/${table.name}.js`), beautify(router, { indent_size: 2 }))
  });

}

module.exports = runRecipe;
