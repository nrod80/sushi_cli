<h1>How to Write and Test a Sushi Template:</h1>

<strong>Things you need:</strong> (if you want to create in Node)
  - Frameworks in mind (Sequelize, Express, etc.)
  - A templating framework (Nunjucks, etc.)
  - Node's fs module
  - A beautifying module

<strong>What every template needs:</strong>
  - An Index.js that exports a function to create everything, which takes as a parameter the JSON
  - Template files for every file you're going to create
  - A ReadMe so that other users understand what the expected output will be
  - (Optional) Tests, to ensure that everything functions properly

Ideally, once the template has produced it's output, the only steps necessary to getting a fully functional server/database is npm-installing, then npm-starting.


<strong>First, let's break down our agnostic JSON, so that you have a strong understanding of what you will be designing a template for:</strong>

<pre>
{
  "Associations": {},
  "DBDef": {
    "dbName": "SushiDB",
    "port": 5432,
    "logging": false,
    "dialect": "fish"
  },
  "Tables": {
    "0": {
      "tableName": "Nigiri",
      "routes": {
        "get": false,
        "post": false,
        "getId": false,
        "putId": true,
        "deleteId": true
      },
      "fields": ["field"],
      "getters": ["getter"],
      "setters": ["setter"],
      "hooks": ["hook"]
    },
    "1": {
      "tableName": "tableTwo",
      "routes": {
        "get": true,
        "post": true,
        "getId": true,
        "putId": false,
        "deleteId": false
      },
      "fields": ["field", "anotherfield"],
      "getters": ["getter", "getterTwo"],
      "setters": ["setter"],
      "hooks": ["hook"]
    }
  },
  "Project": {
    "projectName": "NextProject",
    "projectDesc": "I Am A Sushi Description!!!!!!!!!!"
  }
}

</pre>

<strong>Major Components of the JSON:</strong>
  - Project
  - DBDef
  - Tables
  - Assocations

Project:
  - The project section contains two important and basic pieces of information:
    - Project Name
    - Project Description
  - This will be useful for naming certain files and folders or if you choose to auto-create a ReadMe

DBDef:
  - This section contains the pertinent information about the database:
    - Name
    - Dialect
    - Port
    - Logging (T/F)
  - This information is essential to initializing the database

Tables:
  - This section contains all of your tables as objects, including fields, setters, getters, hooks, and routes
  - This is the information necessary to properly configure both the database and all RESTful API routes


