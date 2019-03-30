#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  // eslint-disable-next-line max-len
  .action((firstConfig, secondConfig) => console.log(genDiff(firstConfig, secondConfig, program.format)));

program.parse(process.argv);
