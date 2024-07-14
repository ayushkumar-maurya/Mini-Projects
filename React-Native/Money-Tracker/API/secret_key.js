const crypto = require('crypto');
console.log('Secret Key: ' + crypto.randomBytes(32).toString('hex'));
