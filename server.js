const { exec } = require('child_process');
const waitOn = require('wait-on');

exec('yarn serve', (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
});

var opts = {
  resources: ['http://localhost:3000'],
};

// Usage with callback function
waitOn(opts, function (err) {
  if (err) {
    throw err;
  }
  console.log('Server ready at port 3000');
});
