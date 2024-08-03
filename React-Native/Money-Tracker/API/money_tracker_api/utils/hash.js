const bcrypt = require('bcryptjs');

exports.getHashValue = text => bcrypt.hash(text, 10);

exports.compareWithHashValue = (hashValue, text) => {
  return new Promise(resolve => {
    bcrypt.compare(text, hashValue, (err, isCorrect) => resolve(isCorrect));
  });
}
