import * as Crypto from 'expo-crypto';
import CryptoJS from "crypto-js"
import { SECRET_KEY } from './Base';

export const encrypt = text => {

  // Inputs Text & Key are in UTF-8 & Hex format repectively.
  // Output <IV>:<EncryptedText> will be returned in Hex format.

  const randomBytes = Crypto.getRandomBytes(16);
  const iv = CryptoJS.lib.WordArray.create(randomBytes);

  const encryptedText = CryptoJS.AES.encrypt(text,
    CryptoJS.enc.Hex.parse(SECRET_KEY),
    {
      iv: iv,
      mode: CryptoJS.mode.CBC
    }
  );

  return iv.toString(CryptoJS.enc.Hex) + ':' + encryptedText.ciphertext.toString(CryptoJS.enc.Hex);
};

export const decrypt = encryptedData => {

  // Inputs IV, Encrypted Text & Key all are in Hex format.
  // Output Decrypted Text will be returned in UTF-8 format.

  const [ iv, encryptedText ] = encryptedData.split(':');

  const decryptedText = CryptoJS.AES.decrypt({ciphertext: CryptoJS.enc.Hex.parse(encryptedText)},
    CryptoJS.enc.Hex.parse(SECRET_KEY),
    {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: CryptoJS.mode.CBC
    }
  );

  return decryptedText.toString(CryptoJS.enc.Utf8);
};
