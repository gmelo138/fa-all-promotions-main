const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const envPath = path.join(__dirname, '..', '.env');
const { ENVIRONMENT } = process.env;

// IMPORTANT: If you modify this list, please also update .env.template !
const appEnvVars = [
  'APP_BASE_DIRECTORY',
  'APP_NAME',
  'APP_VERSION',
  'AWS_ACCOUNT_ID',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'CDK_DEFAULT_ACCOUNT',
  'CDK_DEFAULT_REGION',
  'STAGE',
];

// IMPORTANT: If you modify this list, please also update .env.template !
const backendEnvVars = ['API_BASE_DIRECTORY'];

/*
 If process.ENVIRONMENT is set to WITH_BACKEND, then we check if all env
 variables (app + backend + RocketChat) exist in .env.
 If process.ENVIRONMENT is undefined, then we omit check for backend envs.
*/
const requiredEnvVars =
  ENVIRONMENT === 'WITH_BACKEND' ? appEnvVars.concat(backendEnvVars) : appEnvVars;

/**
 * Prints a red error message to console
 * @param {string} msg the message to print
 */
function printErr(msg) {
  console.log(chalk.red('[ERROR] ' + msg));
}

/**
 * Parses the env file and checks if minimum env vars are present in .env
 * @returns true if required env vars are defined
 */
function hasRequiredEnvs() {
  const currentFileContent = fs.readFileSync(envPath, { encoding: 'utf8', flag: 'r' });

  if (!currentFileContent) {
    return false;
  }

  for (let envVar of requiredEnvVars) {
    if (!currentFileContent.includes(envVar)) {
      printErr(`Variable ${envVar} not found in ${envPath}`);
      return false;
    }
  }

  return true;
}

/**
 * Checks if a .env file exists and its content is valid
 * @returns true if env configuration is valid
 */
function isValidConfiguration() {
  const envFileExists = fs.existsSync(envPath);
  if (!envFileExists) {
    printErr('.env is missing! Please create it from .env.template!');
    return false;
  }

  if (!hasRequiredEnvs()) {
    printErr('.env exists but some env vars are missing. Please compare with .env.template!');
    return false;
  }

  return true;
}

// Kickstart this script
if (!isValidConfiguration()) {
  // Exit code 1 = Error
  // Exit code 0 or no exit code at all = Success
  process.exit(1);
}
