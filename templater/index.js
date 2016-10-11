const senstack = require('./SENstack');
// const data = require('./Test.json');
module.exports = (data, cwd) => {
  const proj = data.Project;
  const def = data.DBDef;
  const tables = data.Tables;
  const associations = data.Associations;
  // const github = data.DB.github;

  senstack(data, proj, def, tables, associations, cwd);
};
