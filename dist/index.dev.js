"use strict";

var fs = require("fs");

var crypto = require('crypto'),
    algorithm = 'aes-128-ctr';

function encrypt(algorithm, buffer, key) {
  var iv = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var cipher = crypto.createCipher(algorithm, key, iv) ? crypto.createCipher(algorithm, key, iv) : crypto.createCipher(algorithm, key); //  var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);

  var crypted = cipher.update(buffer);
  return crypted;
}

function decrypt(algorithm, buffer, key) {
  var iv = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var decipher = iv ? crypto.createDecipher(algorithm, key, iv) : crypto.createDecipher(algorithm, key); //  var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);

  console.log(Buffer.byteLength(buffer) / 16);
  var dec = decipher.update(buffer);
  return dec;
}

function otherDecypher(algorithm, buffer, key) {
  var iv = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var decipher = iv ? crypto.createDecipher(algorithm, key, iv) : crypto.createDecipher(algorithm, key);
  var dec = Buffer.concat([decipher.update(buffer, "utf8", "hex"), decipher["final"]("hex")]);
  return dec;
} //Encrypt videTest


fs.readFile("videoTest.mp4", function (err, data) {
  fs.writeFile("enc/videoTest.mp4", encrypt('aes-128-ofb', data, "d6F3Efeq"), "binary", function (err) {
    if (err) {
      console.info(err);
    } else {
      console.info("The file was saved!");
    }
  });
}); //Decryp videTest

fs.readFile("enc/videoTest.mp4", function (err, data) {
  //b'\xae\xafQ\x8d\x8e\xc2\xedn>\xe4\xb1\x87\xac\xa8\xbdH\x95\xdb~`<\n\xf0a\xca5\x8amm\xf3\xcb\xfa'
  // b'\x95\xdb~`<\n\xf0a\xca5\x8amm\xf3\xcb\xfa'
  fs.writeFile("dec/videoTest.mp4", decrypt('aes-128-ofb', data, "d6F3Efeq"), "binary", function (err) {
    if (err) {
      console.info(err);
    } else {
      console.info("The file was saved!");
    }
  });
});
fs.readFile("videoEncoded.mp4", function (err, data) {
  console.log(data);
  console.log(decrypt('aes-128-ofb', data, "5df1b4e0d7ca82a62177e3518fe2f35a"), "fileeee");
  fs.writeFile("dec/videoDecoded.mp4", decrypt('aes-128-ofb', data, "5df1b4e0d7ca82a62177e3518fe2f35a"), "binary", function (err) {
    if (err) {
      console.info(err);
    } else {
      console.info("The file was saved!");
    }
  });
});