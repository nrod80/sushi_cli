This Sequelize-Express-Node (SEN) (with Postgres) template creates a functional startpoint for your project.

The resulting project folder will contain the following file tree:
  - package.json {{includes the postinstall/start scripts, the git repo information and the dependencies (express, morgan, pg, sequelize, body-parser)}}
  - env:
    - index.js {{includes all environment variables}}
  - db:
    - models:
      - {{a model for each table in your package.json}}
    - _db_init.js {{runs automatically after 'npm install' and sets up your db in Postgres}}
    - _db.js {{defines the Sequelize db}}
    - index.js {{defines associations between models}}
  - server:
    - routes:
      - {{a router with basic REST functions for each model}}
    - app.js {{sets up the express router and middleware}}
