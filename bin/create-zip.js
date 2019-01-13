#!/usr/bin/env node

const mkdirp = require('mkdirp');
const ora = require('ora');
const { green, red, yellow } = require('chalk');
const archiver = require('archiver');
const fs = require('fs');

const spinner = ora();
const spinnerStart = text => {
  spinner.text = text;
  return spinner.start();
};

const manifestFilePath = 'src/manifest.json';
spinnerStart(`read ${manifestFilePath}`);

mkdirp('dist', function(err) {
  if (err) {
    console.error(err);
  } else {
    createZip();
  }
});

function createZip() {
  const zipFilePath = 'dist/ecdetector.zip';
  spinnerStart(`Start create zip ${zipFilePath}`);

  // zipファイルのストリームを生成して、archiverと紐付ける
  const archive = archiver.create('zip', {});

  archive.on('error', err => {
    errorHandler(err);
    throw err;
  });

  archive.on('close', () => {
    console.log(green('zipファイルの作成が成功しました'));
  });

  const output = fs.createWriteStream(zipFilePath);
  archive.pipe(output);

  archive.glob('src/**/*');

  // zip圧縮実行
  archive.finalize();
  spinner.succeed();
}

function errorHandler(err) {
  spinner.fail();
  console.error(red(err.message));

  if (err.response && err.response.body) {
    try {
      console.error(yellow(JSON.stringify(err.response.body, null, 2)));
    } catch (err) {
      console.error(red(err.message));
    }
  }
}
