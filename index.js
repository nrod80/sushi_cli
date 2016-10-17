#!/usr/bin/env node

const program = require('commander');
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;
const chalk = require('chalk');
const https = require('https');
const path = require('path');
let template, data = '',
  cwd, templateToUse;

function templater(options) {
  // define template
  if (options.template) {
    template = require(path.join(process.env.PWD, options.template))
  } else if (options.sen || options.ruby) { // use default template
    template = require('./templater/');
    if (options.sen) {
      templateToUse = 'sen'
    } else {
      templateToUse = 'ruby'
    }
  } else {
    return console.log(chalk.red('You must provide a template.'))
  }

  // get the data
  if (options.url) {
    console.log(chalk.blue('placing your order...'));
    // get the json with an http request
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    https.get(options.url, function(res) {
      // once data is received...
      res.on('data', function(chunk) {
          data += chunk.toString();
        })
        .on('end', function() {
          data = JSON.parse(data).definition;
          cookRecipe(template, data, options.git, options.directory, templateToUse)
        });
    });
  } else if (options.json) { // path to local json
    data = require(path.join(process.env.PWD, options.json))
    cookRecipe(template, data, options.git, options.directory, templateToUse)
  } else {
    console.log(chalk.red('You must provide a json.'))
  }
};

function cookRecipe(template, data, git = false, projLocation, templateToUse) {
  cwd = projLocation || path.join(process.env.PWD, (data.Project.projectName || 'sushiroll'));
  console.log(chalk.green('your sushi order has been received!'));

  if (templateToUse === 'ruby') {
    let commands = template(data, cwd, templateToUse);
    exec('rails new ' + (data.Project.projectName || 'sushiroll'), { cwd: process.env.CWD })
    commands.forEach(command => execSync(command, {
      cwd: cwd
    }))
    return;
  } else if (templateToUse === 'sen') {
    console.log(chalk.blue('step 1: getting your ingredients...'));
    // call the template on the received json
    template(data, cwd, templateToUse);
    console.log(chalk.blue('step 2: chopping the veggies and cooking the rice... (npm install, create database)'));
    execSync('npm install', {
      cwd: cwd
    })
    if (git) {
      console.log(chalk.blue('initializing git repo...'))
      execSync('git init', {
        cwd: cwd
      })
    };
    console.log(chalk.blue('step 3: rolling the sushi... (starting server...)'));
    console.log(chalk.green('step 4: enjoy! (server running on port 8080)'));
    execSync('npm start', {
      cwd: cwd
    })
  }
  else {
    return template(data);
  }
}

// defaults to json_url (optional req)
program
  .version('0.0.1')
  .command('roll')
  .option('-u, --url <json_url>')
  .option('-j, --json <json_path>')
  .option('-t, --template <template_path>')
  .option('-g, --git')
  .option('-d, --directory <directory_path>')
  .option('-r --ruby')
  .option('--sen', 'use the senstack template')
  .description('roll the ingredients into a file system')
  .action(templater);

program.parse(process.argv);
