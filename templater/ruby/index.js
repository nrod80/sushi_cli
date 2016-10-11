const execSync = require('child_process').execSync;
const path = require('path');

module.exports = (data, proj, def, tables, associations, cwd) => {
  let returnArr = [];

  let tableArr = Object.keys(tables).map(table => {
    let fieldsString = '';
    tables[table].fields.forEach(field => {
      fieldsString += field.name + ':' + field.type + ' ';
    })
    return [tables[table].tableName, fieldsString]
  })

  let projname = cwd;

  let env = {
    tables: tableArr,
    HOME: process.env.HOME,
    projname
  }
  tableArr.forEach(arr => {arr.unshift('rails generate scaffold'); returnArr.push(arr.join(' '));})
  returnArr.push('rake db:migrate');

  return returnArr;
}
