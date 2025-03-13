const chalk = require('chalk');
const path = require('path');
const os = require('os');
const fs = require('fs');
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJsonData = require(packageJsonPath);

const ssrBuildScript = 'build:fh:ssr';
const buildFeatureHubScript = packageJsonData.scripts['build:fh'];

if (ssrBuildScript in packageJsonData.scripts) {
  const containsBuildSsr =
    buildFeatureHubScript?.includes(ssrBuildScript) ||
    buildFeatureHubScript?.includes('npm-run-all -p build:fh:*');
  if (!containsBuildSsr) {
    logMessage(
      `There is no SSR build command called in your build:fh script in the package.json. Please refer to the SSR guide under https://oneaudi-dev-portal.cdn.prod.collab.apps.one.audi/secure/Basic%20developing/FeatureApp%20development/Development/Server%20Side%20Rendering/SSR%20-%20FeatureApp%20preparations.html${os.EOL}`,
    );
  }
} else {
  logMessage(
    `There is no SSR build command defined in your package.json! Please refer to the SSR guide under https://oneaudi-dev-portal.cdn.prod.collab.apps.one.audi/secure/Basic%20developing/FeatureApp%20development/Development/Server%20Side%20Rendering/SSR%20-%20FeatureApp%20preparations.html${os.EOL}`,
  );
}

if (!packageJsonData?.appStore?.extra?.featureHub?.serverSideBundleUrl) {
  logMessage(
    'There is no entry for serverSideBundleUrl in the App Store metadata of the package.json!',
  );
} else {
  const filePath = path.join(
    __dirname,
    '..',
    'dist',
    'app',
    packageJsonData?.appStore?.extra?.featureHub?.serverSideBundleUrl,
  );

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      logMessage(
        `There is no ${packageJsonData?.appStore?.extra?.featureHub?.serverSideBundleUrl} file present in your build. Please refer to the SSR guide under https://oneaudi-dev-portal.cdn.prod.collab.apps.one.audi/secure/Basic%20developing/FeatureApp%20development/Development/Server%20Side%20Rendering/SSR%20-%20FeatureApp%20preparations.html${os.EOL}`,
      );
    }
  });
}

function logMessage(message) {
  if (process.env.CI) {
    process.stdout.write(`::warning::${message}`);
  } else {
    console.warn(chalk.red(message));
  }
}
