const senstack = require('./SENstack');
const ruby = require('./ruby')
// const data = require('./Test.json');
module.exports = (data, cwd, template) => {
  const proj = data.Project;
  const def = data.DBDef;
  const tables = data.Tables;
  const associations = data.Associations;
  // const github = data.DB.github;

  if (template === 'sen') senstack(data, proj, def, tables, associations, cwd);
  else return ruby(data, proj, def, tables, associations, cwd)
};
