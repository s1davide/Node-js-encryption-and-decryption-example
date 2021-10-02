const fs = require("fs");
const crypto = require("crypto");
const argvNeeded = ["orgPath", "destPath", "algorithm", "key", "iv"];
const argv = process.argv;
const title = require("./title");

const createCipher = (algorithm, key, iv) =>
  iv
    ? crypto.createCipheriv(algorithm, key, iv)
    : crypto.createCipheriv(algorithm, key);

const encryptFile = (algorithm, buffer, key, iv = undefined) =>
  createCipher(algorithm, key, iv).update(buffer);

const createDecipher = (algorithm, key, iv) =>
  iv
    ? crypto.createCipheriv(algorithm, key, iv)
    : crypto.createCipheriv(algorithm, key);

const decryptFile = (algorithm, buffer, key, iv = undefined) =>
  createDecipher(algorithm, key, iv).update(buffer);

const hasArg = (args, arg) =>
  args.filter((f) => (f ? f.indexOf(arg) > -1 : false)).length > 0
    ? true
    : false;

const argMissing = (args, needed) =>
  needed.filter((f) => !hasArg(args, f)).length > 0
    ? needed.filter((f) => !hasArg(args, f))
    : false;

const getMsgArgsMissing = (argM) =>
  `The following arguments are missing: ${argM
    .map((a, i) => (i > 0 ? " " + a : a))
    .join()}`;

const readFileFromPath = (path) =>
  new Promise((resolve, reject) =>
    fs.readFile(`${path}`, (err, data) =>
      err ? resolve({ r: false, v: err }) : resolve({ r: true, v: data })
    )
  );

const saveFile = (data, path) =>
  new Promise((resolve, reject) =>
    fs.writeFile(`${path}`, data, "binary", (err) =>
      err ? resolve(false) : resolve(path)
    )
  );

const getArgv = (args, arg) =>
  args.filter((a) => (a ? a.indexOf(arg + "=") > -1 : false))[0].split("=")[1];

const resultSave = (r, path, action) =>
  r
    ? console.log(
        "\x1b[32m",
        `The file was successfully ${action} and saved on the path: ${path}`
      )
    : console.log("\x1b[31m", `An error has occurred`);

module.exports.encryptFileFromPath = async (argR = process.argv) =>
  argMissing(argR, argvNeeded)
    ? console.log("\x1b[31m", getMsgArgsMissing(argMissing(argR, argvNeeded)))
    : resultSave(
        saveFile(
          encryptFile(
            getArgv(argR, "algorithm"),
            (await readFileFromPath(getArgv(argR, "orgPath")))["v"],
            getArgv(argR, "key"),
            getArgv(argR, "iv")
          ),
          getArgv(argR, "destPath")
        ),
        getArgv(argR, "destPath"),
        "encrypted"
      );

module.exports.decryptFileFromPath = async (argR = process.argv) =>
  argMissing(argR, argvNeeded)
    ? console.log("\x1b[31m", getMsgArgsMissing(argMissing(argR, argvNeeded)))
    : resultSave(
        saveFile(
          decryptFile(
            getArgv(argR, "algorithm"),
            (await readFileFromPath(getArgv(argR, "orgPath")))["v"],
            getArgv(argR, "key"),
            getArgv(argR, "iv")
          ),
          getArgv(argR, "destPath")
        ),
        getArgv(argR, "destPath"),
        "decrypted"
      );
/*
            Print the title and initial message
*/
console.log(
  "\x1b[34m",
  process.execArgv[1].indexOf(".encryptFileFromPath") > -1
    ? title.titleEncrypt
    : title.titleDecrypt
);
console.log(
  "\x1b[36m",
  `Starting file ${
    process.execArgv[1].indexOf(".encryptFileFromPath") > -1
      ? "encryption"
      : "decription"
  } on the path: ${getArgv(process.argv, "orgPath")}...`
);
/*
            Print the title and initial message
*/
console.log("\x1b[31m", "");
