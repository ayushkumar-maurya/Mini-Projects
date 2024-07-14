const crypto = require('crypto');

exports.encrypt = text => {

  // Inputs Text & Key are in UTF-8 & Hex format repectively.
  // Output <IV>:<EncryptedText> will be returned in Hex format.

  const key = process.env.SECRET_KEY;
  const iv = crypto.randomBytes(16);

  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let encryptedText = cipher.update(text, 'utf8', 'hex');
  encryptedText += cipher.final('hex');

  return iv.toString('hex') + ':' + encryptedText;
}

exports.decrypt = encryptedData => {

  // Inputs IV, Encrypted Text & Key all are in Hex format.
  // Output Decrypted Text will be returned in UTF-8 format.

  const key = process.env.SECRET_KEY;
  const [ iv, encryptedText ] = encryptedData.split(':');

  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let decryptedText = decipher.update(encryptedText, 'hex', 'utf8');
  decryptedText += decipher.final('utf8');

  return decryptedText;
}
