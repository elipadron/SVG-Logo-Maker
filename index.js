// index.js

const inquirer = require('inquirer');
const { Square, Text } = require('./lib/shapes.');
const fs = require('fs');

async function main() {
  const userInput = await promptUser();

  let svgMarkup;

  switch (userInput.shape) {
    case 'Square':
      const square = new Square(userInput.size, userInput.color);
      svgMarkup = `<rect width="${square.size}" height="${square.size}" fill="${square.color}" />`;
      break;
    case 'Text':
      const text = new Text(userInput.content, userInput.color);
      svgMarkup = `<text x="10" y="40" font-size="16" fill="${text.color}">${text.content}</text>`;
      break;
    default:
      console.error('Invalid shape selected.');
      return; // Exit the function if an invalid shape is selected
  }

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      ${svgMarkup}
    </svg>
  `;

  fs.writeFileSync('examples/generated.svg', svgContent);

  console.log('SVG file generated successfully.');
}

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

// Directly execute the main function
main();

