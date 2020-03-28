const fs = require('fs');
const { pipeline } = require('stream');
const { Command } = require('commander');

const CaesarCipherTransform = require('./caesar_cipher_transform');
const { actions } = require('./constants');

const program = new Command();

program.storeOptionsAsProperties(false).passCommandToAction(false);

program
  .requiredOption('-s, --shift [value]', 'a shift')
  .option('-i, --input [value]', 'an input file')
  .option('-o, --output [value]', 'an output file')
  .requiredOption('-a, --action [value]', 'an action encode/decode');

program.parse(process.argv);

const { action, shift, input, output } = program.opts();

if (!actions.some(item => item === action)) {
  process.exitCode = 1;
  console.error(`error: please specify action: ${actions}`);
}

if (typeof shift === 'boolean' || isNaN(+shift)) {
  process.exitCode = 1;
  console.error('error: please specify shift as number');
}

if (!process.exitCode) {
  let readableStream;
  let writeableStream;
  const caesarCipherTransform = new CaesarCipherTransform({ action, shift });

  if (typeof input === 'string') {
    readableStream = fs.createReadStream(input);
  } else {
    readableStream = process.stdin;
  }

  if (typeof output === 'string') {
    writeableStream = fs.createWriteStream(output, { flags: 'a' });
  } else {
    writeableStream = process.stdout;
  }

  pipeline(readableStream, caesarCipherTransform, writeableStream, error => {
    if (error) {
      console.error(error.message);
    }
  });
}
