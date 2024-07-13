const bcrypt = require('bcryptjs');

exports.compareWithHashValue = (hashValue, text) => {
  return new Promise(resolve => {
    bcrypt.compare(text, hashValue, (err, isCorrect) => resolve(isCorrect));
  });
}
