#!/usr/bin/env node

const program = require('commander');
const exec = require('child_process').execSync;
const chalk = require('chalk');
const https = require('https');
const path = require('path');
let template, data = '', cwd;

function templater(options) {

  if (options.test) {
    return exec('node templater/tests/senstack', {cwd: __dirname})
  }

  // define template
  if (options.template) {
    template = require(path.join(process.env.PWD, options.template))
  } else if (options.sen) { // use default template
    template = require('./templater/SENstack');
  } else {
    return console.log(chalk.red('You must provide a template.'))
  }
  let i = 0;

  // get the data
  if (options.url) {
    console.log(chalk.blue('placing your order...'));
    // get the json with an http request
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    https.get(options.url, function(res) {
      // once data is received...
      res.on('data', function(chunk) {
        i++;
        data += chunk.toString();
      })
      .on('end', function() {
        data = JSON.parse(data).definition;
        cookRecipe(template, data, options.git, options.directory)
      });
    });
  } else if (options.json) { // path to local json
    data = require(path.join(process.env.PWD, options.json))
    cookRecipe(template, data, options.git, options.directory)
  } else {
    console.log(chalk.red('You must provide a json.'))
  }
};

function cookRecipe(template, data, git = false, projLocation = process.env.PWD) {
  cwd = projLocation || path.join(process.env.PWD, data.DB.def.DBname);

  console.log(chalk.green('your sushi order has been received!'));
  console.log(chalk.blue('step 1: getting your ingredients...'));
  // call the template on the received json
  template(data, cwd);
  console.log(chalk.blue('step 2: chopping the veggies and cooking the rice... (npm install, create database)'));
  exec('npm install', {cwd: cwd})
  if (git) {
    console.log(chalk.blue('initializing git repo...'))
    exec('git init', {cwd: cwd})
  };
  console.log(chalk.blue('step 3: rolling the sushi... (starting server...)'));
  console.log(chalk.green('step 4: enjoy! (server running on port 3000)'));
  exec('npm start', {cwd: cwd})
}

// defaults to json_url (optional req)
program
  .version('0.0.1')
  .command('cook')
  .option('-u, --url <json_url>')
  .option('-j, --json <json_path>')
  .option('-t, --template <template_path>')
  .option('-g, --git')
  .option('-d, --directory <directory_path>')
  .option('-T, --test')
  .option('--sen', 'use the senstack template')
  .description('cook the ingredients into a file system')
  .action(templater);

program.parse(process.argv);
