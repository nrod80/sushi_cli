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

function runRecipe(data, proj, def, tables, associations, github, location = './sushi/') {

  const projName = proj.name || 'project';

  // write environment file
  mkdirp.sync(`${location}${projName}/env`, (err) => {
    if (err) throw err;
    console.log('env directory created');
  });

  // write db folder
  mkdirp.sync(`${location}${projName}/db/`, (err) => {
    if (err) throw err;
    console.log('db directory created');
  });

  // write models
  mkdirp.sync(`${location}${projName}/db/models/`, (err) => {
    if (err) throw err;
    console.log('models directory created');
  });

  // create express server
  mkdirp.sync(`${location}${projName}/server`, (err) => {
    if (err) throw err;
    console.log('server directory created');
  });

  // create api routes
  mkdirp.sync(`${location}${projName}/server/routes`, (err) => {
    if (err) throw err;
    console.log('routes directory created');
  });

  // write the env file
  renderAndWrite('environment.js', def, `${location}${projName}/env/index.js`);

  // write the package.json
  renderAndWrite('packageMaker.js', github, `${location}${projName}/package.json`);

  // write the _db and _db_init files
  renderAndWrite('_db.js', def, `${location}${projName}/db/_db.js`);
  renderAndWrite('_db_init.js', def, `${location}${projName}/db/_db_init.js`);


  // write the db models
  tables.forEach((table) => {
    renderAndWrite('sequelizeTable.js', table, `${location}${projName}/db/models/${table.name}.js`);
    renderAndWrite('expressRouter.js', table, `${location}${projName}/server/routes/${table.name}.js`);
  });

  const indexInfo = {
    Associations: associations,
    Tables: data.DB.Tables,
  };

  // write the db index.js
  renderAndWrite('sequelizeIndex.js', indexInfo, `${location}${projName}/db/index.js`);

  // write the app.js
  renderAndWrite('expressServer.js', {}, `${location}${projName}/server/app.js`);

  // need to figure out what data this uses
  renderAndWrite('expressRouterIndex.js', data, `${location}${projName}/server/routes/index.js`);
}

module.exports = runRecipe;
