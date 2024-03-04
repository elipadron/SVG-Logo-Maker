const inquirer = require('inquirer');
const { Square, Text, Circle } = require('./Lib/shapes');
const fs = require('fs');

async function main() {
  const userInput = await promptUser();

  let svgMarkup;
  let size;

