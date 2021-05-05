const CryptoJS = require("crypto-js");
const { HASH_SECRET } = require('./../config')

module.exports.encryptString = (string) => {
  return CryptoJS.AES.encrypt(string, HASH_SECRET);
}

module.exports.decryptString = (encryptedString) => {
  let decryptedBytes = CryptoJS.AES.decrypt(encryptedString, HASH_SECRET);
  return decryptedBytes.toString(CryptoJS.enc.Utf8);
}