const { execSync } = require('child_process');
const chalk = require('chalk');

initGitAndHuskyHooks();

function initGitAndHuskyHooks() {
  const projectName = 'fa-all-promotions';
  const gitHubOrganization = 'oneaudi';

  try {
    console.log('Init git...');
    initGit(projectName, gitHubOrganization);
    console.log('git successfully initialized');
  } catch (e) {
    console.error(`could not initialize git, error:`, e);
    process.exit(1);
  }

  try {
    console.log('Init husky...');
    initHusky(projectName);
    console.log('husky successfully initialized');
  } catch (e) {
    console.error(`could not initialize husky, error:`, e);
    process.exit(1);
  }

  console.log(chalk.green.bold('git has been successfully initialized!'));
  console.log(chalk.green.bold('You can now proceed with your first commit.'));
}

function initGit(projectName, gitHubOrganization) {
  execSync(`git init -q`);
  execSync(`git remote add origin git@github.com:${gitHubOrganization}/${projectName}.git`);
  // HEAD might be set to master. Replace with main
  execSync(`git branch -m main`);
}

function initHusky(projectName) {
  execSync('chmod u+x .husky/*');
  execSync('npx husky install');
}
