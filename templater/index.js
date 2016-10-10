const senstack = require('./SENstack');
// const data = require('./Test.json');
module.exports = (data, location) => {
  const proj = data.DB.proj;
  const def = data.DB.def;
  const tables = Object.keys(data.DB.Tables).map(key => data.DB.Tables[key]);
  const associations = data.DB.Associations;
  const github = data.DB.github;

  senstack(data, proj, def, tables, associations, github, location);
};
