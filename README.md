# sushi_cli

<h2><strong>Welcome to SushiRoll's CLI!</strong></h2>

<strong>This interface will allow you to use templates to create functional code from our agnostic JSONs. You can:</strong>
- write your own templates (or use ours),
- use local JSONs (or use one created on our webapp),
- specify the desired location of the output,
- choose to initialize the folder with a .git,
- ...and more coming soon

<strong>Getting started:</strong> <br />
  Install the NPM package: <br />
  <code> npm install sushi_cli -g </code><br />


Once installed, you can use the phrase 'sushi cook', with any of the following options:

 <strong>Options:</strong>

  - <strong>-u, --url \<json_url\></strong> <br />
    The -u flag allows you to add the URL to a JSON created through our webapp as the data for the template

  - <strong>-j, --json \<json_path\></strong> <br />
    The -j flag allows you to add the path to locally stored JSON object to use as the data for the template

  - <strong>-t, --template \<template_path\></strong> <br />
    The -t flag allows you to add the path to a locally stored template to use to output the proper files

  - <strong>-d, --directory \<directory_path\></strong> <br />
    The -d flag allows you to specify the output location of the directory created by the template

  - <strong>-g, --git</strong> <br />
    The -g flag will initialize a .git file in the directory

  - <strong>--sen</strong> <br />
    The --sen flag indicates that you want to use the included Sequelize, Express, Node template


<strong>Examples:</strong><br />

  _Super Basic:_ <br />
  - I just used Sushi's webapp to create the agnostic JSON scaffolding for my database, it's accessible at: sushiroll.io/**somelongurl**. <br />
  - I want to use the included Sequelize, Express, Node template to cook my sushi.<br />
  - I want to create the file right in my working directory in the terminal.<br />

  <code>sushi cook --sen -u sushiroll.io/**somelongurl**</code>


  _Write to Custom Location_ <br />

  <code>sushi cook --sen -u sushiroll.io/**somelongurl** -d Users/nickrodriguez/newProjectFolder
