{
  "name": "{{projectName}}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node ./server/app.js",
    "db-init": "node ./db/_db_init.js",
    "postinstall": "npm run db-init"
  },
  "license": "ISC",
  "dependencies": {
    "express": "^4.13.3",
    "morgan": "^1.6.1",
    "pg": "^4.5.5",
    "sequelize": "^3.21.0",
    "body-parser": "^1.15.2"
  }
}
