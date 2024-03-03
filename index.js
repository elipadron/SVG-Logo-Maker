
const inquirer = require('inquirer');
const { Square, Text } = require('./lib/shapes.');
const fs = require('fs');

async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape:',
      choices: ['Square', 'Text'],
    },
    {
      type: 'input',
      name: 'size',
      message: 'Enter the size:',
      when: (answers) => answers.shape === 'Square',
      validate: (value) => !isNaN(value) && value > 0,
    },
    {
      type: 'input',
      name: 'color',
      message: 'Enter the color:',
    },
    {
      type: 'input',
      name: 'content',
      message: 'Enter the text content:',
      when: (answers) => answers.shape === 'Text',
    },
  ]);

  return answers;
}

