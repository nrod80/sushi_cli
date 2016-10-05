# sushi_cli

<strong>Welcome to Sushi's CLI!</strong> 

<strong>This interface will allow you to use templates to create functional code from our agnostic JSONs. You can:</strong>
- write your own templates (or use ours), 
- use local JSONs (or use one created on our webapp), 
- specify the desired location of the output,
- choose to initialize the folder with a .git,
- ...and more coming soon

<strong>Getting started:</strong>
  Install the NPM package.
  
 <strong>Options:</strong>
 
  - <strong>-u, --url \<json_url\></strong>
    The -u flag allows you to add the URL to a JSON created through our webapp as the data for the template
  
  - <strong>-j, --json \<json_path\></strong>
    The -j flag allows you to add the path to locally stored JSON object to use as the data for the template
  
  - <strong>-t, --template \<template_path\></strong>
    The -t flag allows you to add the path to a locally stored template to use to output the proper files
  
  - <strong>-d, --directory \<directory_path\></strong>
    The -d flag allows you to specify the output location of the directory created by the template
  
  - <strong>-g, --git</strong>
    The -g flag will initialize a .git file in the directory
  
  - <strong>--sen</strong>
    The --sen flag indicates that you want to use the included Sequelize, Express, Node template
