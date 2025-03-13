const Confirm = require('prompt-confirm');
const chalk = require('chalk');

const title = chalk.red.bold('Warning:');
const message = "You're about to run yarn deploy locally! We suggest to do this in pipelines only.";
const question = chalk.red.bold('Are you sure you want to continue anyway?');
const fullDialog = `${title}\n${message}\n${question}\n`;

// Ask for confirmation if deploy should be executed when not in continuous integration environment
if (typeof process.env.CI === 'undefined') {
  new Confirm({ message: fullDialog, default: false }).ask(function (answer) {
    if (!answer) {
      process.exit(1); // do not deploy if not confirmed
    }
  });
}
