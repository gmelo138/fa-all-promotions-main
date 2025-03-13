const watch = require('node-watch');
const { execSync } = require('child_process');
const chalk = require('chalk');

const error = chalk.bold.red('error');
const warning = chalk.yellow('warning');
const success = chalk.green('success');
const info = chalk.blue('info');

/* The flag --no-install is used when some dependencies are linked locally using `npm link`
and refetching it from package registry is not intended.
USAGE: node ./scripts/compile_and_watch.js --no-install
#                      OR
# using prebuilt script - <yarn/npm> run local-api:build --no-install
*/

// The following code is executed when the no-install flag is NOT passed in the command

if (process.argv.indexOf('--no-install') === -1) {
  console.log(info, 'Beginning yarn install...');
  execSync('yarn install --frozen-lockfile --cwd src/api 2>/dev/null');
  console.log(success, 'yarn install done.');
}

try {
  console.log(info, 'Compiling files for the first time...');
  initialCompile();
  console.log(success, 'Files successfully compiled');
} catch (e) {
  console.error(`${error} could not compile files, error:`, e);
  process.exit(1);
}

try {
  console.log(info, 'Watching for new changes...');
  watch('src/api', { recursive: true, filter }, compileFiles);
} catch (e) {
  console.error(`${error} could not compile files, error:`, e);
  process.exit(1);
}

function compileFiles(evt, name) {
  // compile .ts to .js files
  console.log('%s changed.', name);
  console.log(info, 'Beginning to re-compile changes');
  execSync('scripts/compile.sh');
  console.log(success, 'Re-compiling changes done.');
  console.log(info, 'Watching for new changes...');
}

function filter(f, skip) {
  // skip node_modules
  if (/\/node_modules/.test(f)) return skip;
  // only watch for js,ts,json or yml files
  return /[\.js|\.ts|\.json|\.yml]$/.test(f);
}

function initialCompile() {
  // Preparing script for execution
  execSync('chmod +x scripts/compile.sh');
  // Execute at least once
  execSync('scripts/compile.sh');
}
