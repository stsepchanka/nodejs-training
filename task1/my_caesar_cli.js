const { Command } = require('commander');

const actions = ['encode', 'decode'];
const program = new Command();

program.storeOptionsAsProperties(false).passCommandToAction(false);

program
  .requiredOption('-s, --shift [value]', 'a shift')
  .option('-i, --input [value]', 'an input file')
  .option('-o, --output [value]', 'an output file')
  .requiredOption('-a, --action [value]', 'an action encode/decode');

program.parse(process.argv);

const params = program.opts();

if (!actions.some(action => action === params.action)) {
  process.exitCode = 1;
  console.error(`error: please specify action: ${actions}`);
}

if (typeof params.shift === 'boolean' || isNaN(+params.shift)) {
  process.exitCode = 1;
  console.error('error: please specify shift as number');
}

if (!process.exitCode) {
  console.log(params);
}
