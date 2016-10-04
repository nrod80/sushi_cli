#!/usr/bin/env node

const program = require('commander');
const exec = require('child_process').exec;
const chalk = require('chalk');
const http = require('http');

const templater = (options) => {

  // define template
  if (options.template) {
    const template = require(options.template)
    console.log(options.template)
  } else if (options.sen) {
    const template = require('./templater/SENstack');
  } else {
    return console.log(chalk.red('You must provide a template.'))
  }

  // get the data
  if (options.url) {
    console.log(chalk.blue('finding your recipe...'));
    // get the json with an http request
    http.get(json_url, function(res) {
      // once data is received...
      res.on('data', function(chunk) {
        const data = JSON.parse(chunk.toString()).json;
        cookRecipe(template, data)
      });
    });
  } else if (options.json) {
    const data = require(options.json)
    cookRecipe(template, data)
  } else {
    console.log(chalk.red('You must provide a json.'))
  }
};

function cookRecipe(template, data) {
  console.log(chalk.blue('your sushi order has been placed!'));
  console.log(chalk.green('here\'s what your ordered:' + data.toString()));
  // call senstack on the received json
  sen(data);
  console.log(chalk.blue('step 1: grab the ingredients (npm install)'));
  exec('cd ' + data.DB.def.DBname + '; npm install', (error, stdout, stderr) => {
    if (error) console.log(error);
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
    console.log(chalk.blue('step 2: roll the sushi (created database, starting server...)'));
    console.log(chalk.green('step 3: enjoy! (server running on port 3000)'));
    exec('cd ' + data.DB.def.DBname + '; npm start', (errornxt, stdoutnxt, stderrnxt) => {
      if (error) console.log(errornxt);
      if (stdout) console.log(stdoutnxt);
      if (stderr) console.log(stderrnxt);
    });
  });
}

// defaults to json_url (optional req)
program
  .version('0.0.1')
  .command('cook')
  .option('-u, --url <json_url>')
  .option('-j, --json <json_path>')
  .option('-t, --template <custom_template_path>')
  .option('--sen', 'use the senstack template')
  .description('cook the ingredients into a file system')
  .action(templater);

program.parse(process.argv);
