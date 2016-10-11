const fs = require('fs');
const nj = require('nunjucks');
const mkdirp = require('mkdirp');
const beautify = require('js-beautify').js_beautify;

const njenv = nj.configure(__dirname, {
  noCache: true,
  trimBlocks: true,
});

njenv.addFilter('Sequelize_Type', str => `Sequelize.${str.toUpperCase()}`);

function renderAndWrite(template, data, location) {
  const render = njenv.render(template, data);
  fs.writeFileSync(location, beautify(render, { indent_size: 2 }));
}

function runRecipe(data, proj, def, tables, associations, cwd) {

  const projLocation = cwd;

  // write environment file
  mkdirp.sync(`${projLocation}/env`, (err) => {
    if (err) throw err;
    console.log('env directory created');
  });

  // write db folder
  mkdirp.sync(`${projLocation}/db/`, (err) => {
    if (err) throw err;
    console.log('db directory created');
  });

  // write models
  mkdirp.sync(`${projLocation}/db/models/`, (err) => {
    if (err) throw err;
    console.log('models directory created');
  });

  // create express server
  mkdirp.sync(`${projLocation}/server`, (err) => {
    if (err) throw err;
    console.log('server directory created');
  });

  // create api routes
  mkdirp.sync(`${projLocation}/server/routes`, (err) => {
    if (err) throw err;
    console.log('routes directory created');
  });

  // write the env file
  renderAndWrite('environment.js', def, `${projLocation}/env/index.js`);

  // write the package.json
  renderAndWrite('packageMaker.js', proj, `${projLocation}/package.json`);

  // write the _db and _db_init files
  renderAndWrite('_db.js', def, `${projLocation}/db/_db.js`);
  renderAndWrite('_db_init.js', def, `${projLocation}/db/_db_init.js`);


  // write the db models
  Object.keys(tables).forEach((table) => {
    renderAndWrite('sequelizeTable.js', tables[table], `${projLocation}/db/models/${tables[table].tableName}.js`);
    renderAndWrite('expressRouter.js', tables[table], `${projLocation}/server/routes/${tables[table].tableName}.js`);
  });

  const indexInfo = {
    Associations: associations,
    Tables: Object.keys(tables).map(table => tables[table]),
  };

  // write the db index.js
  renderAndWrite('sequelizeIndex.js', indexInfo, `${projLocation}/db/index.js`);

  // write the app.js
  renderAndWrite('expressServer.js', {}, `${projLocation}/server/app.js`);

  // need to figure out what data this uses
  renderAndWrite('expressRouterIndex.js', data, `${projLocation}/server/routes/index.js`);
}

module.exports = runRecipe;
