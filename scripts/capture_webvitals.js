const fs = require('fs');
const path = require('path');
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = require(packageJsonPath);

const lighthouseFolderPath = path.join(__dirname, '..', '.lighthouseci');

const targetFileRegx = new RegExp('^lhr-.+json$');
const timeStampRegex = /(\d+)/;
let fileNameTimeStamp = 0;
fs.readdir(lighthouseFolderPath, function (err, files) {
  console.log('Getting latest report...');
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  files.forEach(function (file) {
    if (targetFileRegx.test(file)) {
      const currentFileTimeStamp = file.match(timeStampRegex)[0];
      fileNameTimeStamp =
        Number(fileNameTimeStamp) > Number(currentFileTimeStamp)
          ? fileNameTimeStamp
          : currentFileTimeStamp;
    }
  });

  if (fileNameTimeStamp) {
    const files = {
      fullJsonPath: path.join(lighthouseFolderPath, `lhr-${fileNameTimeStamp}.json`),
      fullHtmlPath: path.join(lighthouseFolderPath, `lhr-${fileNameTimeStamp}.html`),
      htmlPath: `lhr-${fileNameTimeStamp}.html`,
    };
    setWebVitals(getWebVitals(files));
  } else {
    return console.log('Could not find lighthouse report in directory');
  }
});

const getWebVitals = ({ fullJsonPath, htmlPath }) => {
  console.log('Getting web-vitals from report...');
  try {
    const reportData = require(fullJsonPath);
    const webVitals = {
      performanceScore: `${reportData?.categories?.performance?.score * 100}`,
      totalBlockingTime: getMetrics(reportData?.audits, 'total-blocking-time'),
      largestContentPaint: getMetrics(reportData?.audits, 'largest-contentful-paint'),
      cumulativeLayoutShift: getMetrics(reportData?.audits, 'cumulative-layout-shift'),
      reportUrl: `{{baseUrl}}/lighthouse/${htmlPath}`,
    };
    return reportData ? webVitals : console.log('Could not read file');
  } catch (err) {
    console.log('failed to read the web-vitals from', fullJsonPath);
  }
};

const setWebVitals = (webVitals) => {
  console.log('Updating package.json with web-vitals...');
  packageJson.appStore.webVitals = webVitals;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};

const getMetrics = (audits, key) => {
  const { numericValue, numericUnit } = audits[key];
  return { numericValue, numericUnit };
};
