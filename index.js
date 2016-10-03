#!/usr/bin/env node

const program = require('commander');
const exec = require('child_process').exec;
const chalk = require('chalk');
const http = require('http');
const sen = require('./templater/SENstack');

const templater = (json_url) => {
  // with more templates, check options to figure out which template to use
  console.log(chalk.blue('finding your recipe...'));
  http.get(json_url, function(res) {
    res.on('data', function(chunk) {
      console.log(chalk.blue('your sushi order has been placed!'));
      const data = JSON.parse(chunk.toString()).json;
      console.log(chalk.green('here\'s what your ordered:' + data.toString()));

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
    });
  });
};

program
  .version('0.0.1')
  .command('cook <json_url>')
  .option('-u, --url <json_url>', '')
  .option('-p, --path <json_path>')
  .option('-t, --template <path_to_custom_template>')
  .option('--sen', 'use the senstack template')
  .description('cook the ingredients into a file system')
  .action(templater);

program.parse(process.argv);
