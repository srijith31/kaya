const app = require('../app');
const { connectDatabase } = require('../config/database');
const { port } = require('../config/env');

async function start() {
  await connectDatabase();
  app.listen(port, () => console.log(`Kaya API listening on port ${port}`));
}

start().catch(error => {
  console.error('Unable to start Kaya API:', error.message);
  process.exitCode = 1;
});
