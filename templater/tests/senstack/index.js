/*global require it describe before expect */
/*eslint no-unused-expressions: "off"*/

const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const senstack = require('../../');
const json = require('./senstack.test.json');

senstack(json);

const pathToTest = path.join(__dirname, '../../../sushi/testing');

describe('The SENstack template', () => {
  it('creates the project directory', () => {
    const testingDirectoryStats = fs.statSync(pathToTest);
    expect(testingDirectoryStats.isDirectory()).to.be.true;
  });

  describe('package.json', () => {
    it('produces the package.json', () => {
      const stats = fs.statSync(path.join(pathToTest, '/package.json'));
      expect(stats.isFile()).to.be.true;
    });
    it('has the expected dependencies', () => {
      const packageJson = require(path.join(pathToTest, '/package.json'));
      const dependencies = Object.keys(packageJson.dependencies);
      expect(dependencies).to.include('express');
      expect(dependencies).to.include('morgan');
      expect(dependencies).to.include('pg');
      expect(dependencies).to.include('sequelize');
      expect(dependencies).to.include('body-parser');
    });
  });

  describe('env', () => {
    it('produces the env folder and env file', () => {
      const envFolderStats = fs.statSync(path.join(pathToTest, 'env/'));
      const envFileStats = fs.statSync(path.join(pathToTest, 'env/index.js'));
      expect(envFolderStats.isDirectory()).to.be.true;
      expect(envFileStats.isFile()).to.be.true;
    });
    it('has the proper fields', () => {
      const envFile = require(path.join(pathToTest, 'env/index.js'));
      const keys = Object.keys(envFile);
      const expectedObj = {
        DATABASE_URI: 'postgres://localhost:5432/testing',
        LOGGING: false,
        DIALECT: 'postgres',
        DB_NAME: 'testing',
      };
      keys.forEach(key => expect(envFile[key]).to.be.equal(expectedObj[key]));
    });
  });

  describe('db', () => {
    it('produces the db folder, the index file, _db, _db_init, and all the models', () => {
      const dbFolderStats = fs.statSync(path.join(pathToTest, 'db/'));
      const modelsFolderStats = fs.statSync(path.join(pathToTest, 'db/models'));
      const dbStats = fs.statSync(path.join(pathToTest, 'db/_db.js'));
      const dbInitStats = fs.statSync(path.join(pathToTest, 'db/_db_init.js'));
      const userModelStats = fs.statSync(path.join(pathToTest, 'db/models/Users.js'));
      const testModelStats = fs.statSync(path.join(pathToTest, 'db/models/Tests.js'));
      const dbIndexStats = fs.statSync(path.join(pathToTest, 'db/index.js'));

      expect(dbFolderStats.isDirectory()).to.be.true;
      expect(modelsFolderStats.isDirectory()).to.be.true;
      expect(dbStats.isFile()).to.be.true;
      expect(dbInitStats.isFile()).to.be.true;
      expect(userModelStats.isFile()).to.be.true;
      expect(testModelStats.isFile()).to.be.true;
      expect(dbIndexStats.isFile()).to.be.true;
    });

    const db = require(path.join(pathToTest, 'db/index.js'));

    it('tables have the proper fields', () => {
      const userModel = require(path.join(pathToTest, 'db/models/Users.js'));
      const userFields = Object.keys(userModel.tableAttributes);
      expect(userFields).to.include('name');
      expect(userFields).to.include('age');

      const testModel = require(path.join(pathToTest, 'db/models/Tests.js'));
      const testFields = Object.keys(testModel.tableAttributes);
      const expectedTestFields = ['name', 'ages'];
      expect(testFields).to.include('name');
      expect(testFields).to.include('difficulty');
    });

    it('tables have the proper associations', () => {
      const userModel = require(path.join(pathToTest, 'db/models/Users.js'));
      const testModel = require(path.join(pathToTest, 'db/models/Tests.js'));

      // console.dir(userModel, testModel)

      expect(userModel.associations.Tests).to.be.ok;
      expect(userModel.associations.Tests.associationType).to.equal('HasMany');
      expect(testModel.associations.User).to.be.ok;
      expect(testModel.associations.User.associationType).to.equal('BelongsTo');
    });
  });


  describe('routes', () => {
    it('produces the routes folder,  and a router for every model', () => {

      const serverFolderStats = fs.statSync(path.join(pathToTest, 'server/'));
      const appStats = fs.statSync(path.join(pathToTest, 'server/app.js'));
      const routesFolderStats = fs.statSync(path.join(pathToTest, 'server/routes'));
      const routesIndexStats = fs.statSync(path.join(pathToTest, 'server/routes/index.js'));
      const userRoutesStats = fs.statSync(path.join(pathToTest, 'server/routes/Users.js'));
      const testRoutesStats = fs.statSync(path.join(pathToTest, 'server/routes/Tests.js'));

      expect(serverFolderStats.isDirectory()).to.be.true;
      expect(appStats.isFile()).to.be.true;
      expect(routesFolderStats.isDirectory()).to.be.true;
      expect(routesIndexStats.isFile()).to.be.true;
      expect(userRoutesStats.isFile()).to.be.true;
      expect(testRoutesStats.isFile()).to.be.true;
    });

    it('at least one router has proper routes', () => {
      const userRouter = require(path.join(pathToTest, 'server/routes/Users.js'));
      const testRouter = require(path.join(pathToTest, 'server/routes/Tests.js'));
      const getRoute = testRouter.stack[0].route;
      const postRoute = testRouter.stack[2].route;
      const getByIdRoute = testRouter.stack[1].route;
      const putRoute = userRouter.stack[1].route;
      const deleteRoute = userRouter.stack[0].route;

      expect(getRoute.path).to.be.equal('/');
      expect(getRoute.methods.get).to.be.true;

      expect(getByIdRoute.path).to.be.equal('/:id');
      expect(getByIdRoute.methods.get).to.be.true;

      expect(deleteRoute.path).to.be.equal('/:id');
      expect(deleteRoute.methods.delete).to.be.true;

      expect(postRoute.path).to.be.equal('/');
      expect(postRoute.methods.post).to.be.true;

      expect(putRoute.path).to.be.equal('/:id');
      expect(putRoute.methods.put).to.be.true;
    });
  });
});
