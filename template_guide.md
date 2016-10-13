<h1>How to Write and Test a Sushi Template:</h1>

<p>While sushiroll.io offers some templates, everybody uses a different stack and prefers their files to be laid out in a particular manner. Making your own template to utilize the language-agnostic JSON ehances sushioroll's power.</p>

<strong>Things you need:</strong>
  - Frameworks in mind (Sequelize, Express, Ruby on Rails, Mongo etc.)
  - A JSON document produced by sushiroll.io
  - A way to create the necessary files => this may be via template or a series of terminal commands
  - An index.js file that exports a function to create everything, which takes as a parameter the JSON
  - (If public) A ReadMe so that other users understand what the expected output will be
  - (Optional) Tests, to ensure that everything functions properly

<p>Ideally, once the template has produced it's output, the only steps necessary to getting a fully functional server/database is npm-installing, then npm-starting.<p>


<strong>Your index.js should export a function which takes the JSON as a parameter. The important parts of the JSON are:</strong>

<pre>
"Project" = {
  "projectName": "Sushi Meow",
  "projectDesc": "A sushi restaurant just for cats"
}

"DBDef" = {
  "dbName": "Sushi Restaurant",
  "port": 5432,
  "logging": false,
  "dialect": "postgres"
}

"Tables" = {
  "0": {
    "tableName": "Sushi",
    "routes": {
      "get": true,
      "post": true,
      "getId": true,
      "putId": true,
      "deleteId": true
    },
    "fields": [
      {"name": "Type of Fish", "type": "string"},
      {"name": "Type of Rice", "type": "string"},
      {"name": "in stock", "type": "boolean"},
      {"name": "last shipment received", "type": "date"},
      {"name": "price", "type": "float"}
    ],
    "getters": ["how long until next shipment"],
    "setters": ["order next batch of sushi"],
    "hooks": ["make sure sushi is fresh"]
  },
  "1": {
    "tableName": "Purchase",
    "routes": {
      "get": false,
      "post": true,
      "getId": true,
      "putId": true,
      "deleteId": false
    },
    "fields": [
      {"name": "total price", "type": "float"},
      {"name": "total tip", "type": "float"},
      {"name": "time of sale", "type": "date"},
      {"name": "payment method", "type": "string"},
      {"name": "profit", "type": "float"}
    ],
    "getters": ["get all sales"],
    "setters": [],
    "hooks": ["calculate profit"]
  },
  "2": {
    "tableName": "Employees",
    "routes": {
      "get": true,
      "post": true,
      "getId": true,
      "putId": false,
      "deleteId": false
    },
    "fields": [
      {"name": "first name", "type": "string"},
      {"name": "last name", "type": "string"},
      {"name": "age", "type": "integer"},
      {"name": "pay per hour", "type": "float"},
      {"name": "day joined", "type": "date"}
    ],
    "getters": ["get full name"],
    "setters": [],
    "hooks": ["capitalize name"]
  }
}

"Assocations" = {
  "Sales": {
    "Sushi": "hasMany"
  }
}
</pre>

<p>Using these parts of the JSON, you should be able to create all the files necessary to get your project up and running in the language/stack of your choice! We always welcome pull requests with new templates, so if you think others would benefit from your template, please share!</p>

<strong>BUT WAIT HOW DO I ACTUALLY HOOK IT UP TO RECEIVE THE JSON???</strong>

<p>Well, you could always just find a way to feed the JSON manually to your index.js, but if you use the <code>-t [path to your template]</code> flag in the command line interface and also point us to the JSON you want to use (whether that be a filepath or a url), we'll take care of that for you.</p>

