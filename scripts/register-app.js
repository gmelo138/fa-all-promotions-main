const fs = require('fs');
const path = require('path');
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = require(packageJsonPath);
const oneAudiCliJsonPath = path.join(__dirname, '..', 'oneaudi-cli.json');
const oneAudiCliJson = require(oneAudiCliJsonPath);
const readline = require('readline');
const fetch = require('node-fetch');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  'To register your App in the AppStore, please provide the token from https://fawi.one.audi/token ',
  (token) => {
    rl.close();

    const hostname = 'https://app-store.api.prod.one.audi.com';
    const urlPath = '/api/v1/apps';
    const url = hostname + urlPath;

    const addAppStoreInformation = (appId) => {
      packageJson.appStore.appId = appId;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    };

    const setAppStoreRegistered = (appStoreRegistered) => {
      oneAudiCliJson.project.features.registeredInAppStore = appStoreRegistered;
      fs.writeFileSync(oneAudiCliJsonPath, JSON.stringify(oneAudiCliJson, null, 2));
    };

    // Get the app name without prefixes (e.g.: '@oneaudi')
    let appName = packageJson.name.split('/').slice(-1)[0];

    let postData = JSON.stringify({
      name: appName,
    });

    const options = {
      method: 'POST',
      body: postData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      follow: 20,
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((body) => {
        if (body.id && body.accessKey) {
          console.log(chalk.yellow(`\nApp Id (saved in package.json): ${body.id}`));
          console.log(chalk.yellow(`\nYou can define all AppStore metadata in package.json.`));
          console.log(chalk.yellow(`App Store Access Key: ${body.accessKey}`));
          console.log(chalk.red(`DO NOT LOSE THE APPSTORE ACCESS KEY.\nPlease store it safely.`));

          // Save the App Id in the project package.json
          addAppStoreInformation(body.id);
          setAppStoreRegistered(true);
        } else {
          throw `Could not register app. ${body.errorType}: ${body.errorMessage}.`;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
);
