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

function generateSvgMarkup(userInput) {
  let size;
  let content;

  switch (userInput.shape) {
    case 'Square':
      size = 100;
      const square = new Square(userInput.color);
      content = `<rect width="${size}" height="${size}" fill="${square.color}" />`;
      break;
    case 'Text':
      const text = new Text(userInput.content, userInput.textColor);
      content = `<text x="10" y="40" font-size="16" fill="${text.textColor}">${text.content}</text>`;
      break;
    case 'Circle':
      size = 160;
      const circle = new Circle(userInput.color);
      content = `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 10}" fill="${circle.color}" />`;
      break;
    default:
      console.error('Invalid shape selected.');
      return;
  }

  return { size, content };
}

main();


