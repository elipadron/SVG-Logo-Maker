const inquirer = require('inquirer');
const { Square, Text, Circle } = require('./Lib/shapes');
const fs = require('fs');

async function main() {
  const userInput = await promptUser();
  const svgMarkup = generateSvgMarkup(userInput);

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${svgMarkup.size}" height="${svgMarkup.size}">
      ${svgMarkup.content}
    </svg>
  `;

  fs.writeFileSync('examples/generated.svg', svgContent);

  console.log('SVG file generated successfully.');

}

async function promptUser() {
  const shapeAndColorAnswers = await inquirer.prompt([
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape:',
      choices: ['Square', 'Triangle', 'Circle'],
    },
    {
      type: 'input',
      name: 'color',
      message: 'Enter the color:',
    },
  ]);
  const textContentAnswers = await inquirer.prompt([
    {
      type: 'input',
      name: 'content',
      message: 'Enter the text content:',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color:',
    },
  ]);

  return { ...shapeAndColorAnswers, ...textContentAnswers };
}




