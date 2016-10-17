const senstack = require('./SENstack');
const ruby = require('./ruby')
// const data = require('./Test.json');
module.exports = (data, cwd, template) => {
  const proj = data.Project;
  const def = data.DBDef;
  const tables = data.Tables;
  const associations = data.Associations;
  // const github = data.DB.github;
  console.log(template)
  if (template === 'sen') senstack(data, proj, def, tables, associations, cwd);
  else if(template === 'ruby') return ruby(data, proj, def, tables, associations, cwd);
  else return require(template)(data, proj, def, tables, associations, cwd);
};
