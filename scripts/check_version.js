const { exec } = require('child_process');
const semver = require('semver');
const chalk = require('chalk');
const { version } = require('../oneaudi-cli.json');

exec('npm show @oneaudi/create-feature-app version', (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }

  if (semver.lt(version, stdout)) {
    console.log(chalk.yellow.bold(`Your Feature App is outdated!`));
    console.log(
      chalk.yellow(
        `\n${chalk.bold('Current version:')} ${version}\n${chalk.bold(
          'Latest version:',
        )} ${stdout}`,
      ),
    );
    console.log(
      chalk.yellow(
        `Please use ${chalk.bold(
          "'npx @oneaudi/bilbo upgrade <projectPath>'",
        )} to update your App.\nOtherwise you may miss our newest features and bugfixes!\n`,
      ),
    );
  }

  console.log(
    chalk.bgYellow.bold(
      'Please make sure to keep the AppStore data in your package.json up-to-date!',
    ),
  );
});
