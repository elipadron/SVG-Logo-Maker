const inquirer = require('inquirer');
const { Square, Text, Circle } = require('./Lib/shapes');
const fs = require('fs');

async function main() {
  const userInput = await promptUser();

  let svgMarkup;
  let size;

  switch (userInput.shape) {
    case 'Square':
      size = 100;
      const square = new Square(userInput.color);
      svgMarkup = `<rect width="${size}" height="${size}" fill="${square.color}" />`;
      break;
    case 'Text':
      const text = new Text(userInput.content, userInput.textColor);
      svgMarkup = `<text x="10" y="40" font-size="12" fill="${text.textColor}">${text.content}</text>`;
      break;
    case 'Circle':
      size = 160;
      const circle = new Circle(userInput.color);
      svgMarkup = `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 10}" fill="${circle.color}" />`;
      break;
    default:
      console.error('Invalid shape selected.');
      return;
  }

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      ${svgMarkup}
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

main();





