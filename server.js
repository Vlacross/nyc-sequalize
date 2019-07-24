const { PORT } = require('./config');
const app = require('./app');
const { sequelize } = require('./db/sequelize');

let server;

function runServer(port) {
  return new Promise((resolve, reject) => {
    try {
      server = app.listen(port, () => {
        console.log(`Apps listerine on port ${port}`);
        resolve();
      });
    }

    catch(err) {
      console.error(`Can't start the server: ${err}`);
    }
  });
};

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing Server');
    server.close(err => {
      if(err) {
        return reject(err);
      }
      resolve();
    });
  });
};

if(require.main === module) {
  runServer(PORT)
  .catch(err => {
    console.error(`Can't start server: ${err}`);
    throw err;
  });
};


module.exports = { runServer, closeServer };
