const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'innov8',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

