#!/usr/bin/env node

const program = require('commander');
const exec = require('child_process').exec;
const chalk = require('chalk');
const http = require('http');
const path = require('path');
let template, data;

function templater(options) {

  // define template
  if (options.template) {
    template = require(path.join(process.env.PWD, options.template))
  } else if (options.sen) {
    template = require('./templater/SENstack');
  } else {
    return console.log(chalk.red('You must provide a template.'))
  }

  // get the data
  if (options.url) {
    console.log(chalk.blue('placing your order...'));
    // get the json with an http request
    console.log(options.url)
    http.get(options.url, function(res) {
      // once data is received...
      res.on('data', function(chunk) {
        data = JSON.parse(chunk.toString()).json;
        cookRecipe(template, data)
      });
    });
  } else if (options.json) {
    data = require(path.join(process.env.PWD, options.json))
    console.log('B', template)
    cookRecipe(template, data)
  } else {
    console.log(chalk.red('You must provide a json.'))
  }
};

function cookRecipe(template, data) {
  console.log(chalk.green('your sushi order has been received!'));
  console.log(chalk.blue('step 1: getting your ingredients...'));
  // call senstack on the received json
  template(data);
  console.log(chalk.blue('step 2: chopping the veggies and cooking the rice... (npm install, created database)'));
  exec('cd ' + data.DB.def.DBname + '; npm install', (error, stdout, stderr) => {
    if (error) console.log(chalk.red(error));
    if (stdout) console.log(chalk.yellow(stdout));
    if (stderr) console.log(chalk.yellow(stderr));
    console.log(chalk.blue('step 3: rolling the sushi... (starting server...)'));
    console.log(chalk.green('step 4: enjoy! (server running on port 3000)'));
    exec('cd ' + data.DB.def.DBname + '; npm start', (errornxt, stdoutnxt, stderrnxt) => {
      if (error) console.log(chalk.red(errornxt));
      if (stdout) console.log(chalk.yellow(stdoutnxt));
      if (stderr) console.log(chalk.yellow(stderrnxt));
    });
  });
}

// defaults to json_url (optional req)
program
  .version('0.0.1')
  .command('cook')
  .option('-u, --url <json_url>')
  .option('-j, --json <json_path>')
  .option('-t, --template <template_path>')
  .option('--sen', 'use the senstack template')
  .description('cook the ingredients into a file system')
  .action(templater);

program.parse(process.argv);
