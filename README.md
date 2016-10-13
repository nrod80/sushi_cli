# sushi_cli

<h2><strong>Welcome to SushiRoll's CLI!</strong></h2>

<strong>This interface will allow you to use templates to create functional code from <a href="https://github.com/Abazhenov/Sushi">sushiroll.io's</a> agnostic JSONs. You can:</strong>
- <a href="https://github.com/nrod80/sushi_cli/blob/master/template_guide.md"> write your own templates</a> (or use ours),
- use local JSONs (or use one created on our webapp),
- specify the desired location of the output,
- choose to initialize the folder with a .git,
- ...and more coming soon

<strong>Getting started:</strong> <br />
  Install the NPM package: <br />
  <code> npm install sushi_cli -g </code><br />


Once installed, you can use the phrase <code>sushi cook</code>, with any of the following options:

 <strong>Options:</strong>

  - <code>-u, --url \<json_url\></code> <br />
    The -u flag allows you to add the URL to a JSON created through our webapp as the data for the template

  - <code>-j, --json \<json_path\></code> <br />
    The -j flag allows you to add the path to locally stored JSON object to use as the data for the template

  - <code>-t, --template \<template_path\></code> <br />
    The -t flag allows you to add the path to a locally stored template to use to output the proper files

  - <code>-d, --directory \<directory_path\></code> <br />
    The -d flag allows you to specify the output location of the directory created by the template

  - <code>-g, --git</code> <br />
    The -g flag will initialize a .git file in the directory

  - <code>--sen</code> <br />
    The --sen flag indicates that you want to use the included Sequelize, Express, Node template

  - <code>-r --ruby </code> <br />
    The -r flag indicates that you want to use the included Ruby on Rails template


<strong>Examples:</strong><br />

  _Super Basic:_ <br />
  - I just used Sushi's webapp to create the agnostic JSON scaffolding for my database, it's accessible at: sushiroll.io/**somelongurl**. <br />
  - I want to use the included Sequelize, Express, Node template to cook my sushi.<br />
  - I want to create the file right in my working directory in the terminal.<br />
  <code>sushi cook --sen -u sushiroll.io/**somelongurl**</code><br />

  _Write Folder to Custom Location_ <br />
  - <code>sushi cook --sen -u sushiroll.io/**somelongurl** -d Users/nickrodriguez/newProjectFolder<br />

  _Use a Custom Template_ <br />
  <code>sushi cook -t Users/nickrodriguez/templates/[*directory containing your index.js*] -u sushiroll.io/**somelongurl**<br />

  _Use a Local JSON_ <br />
  <code>sushi cook -j Users/nickrodriguez/jsons/[*your JSON file*] -r<br />
