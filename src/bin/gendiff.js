#!/usr/bin/env node

// eslint-disable-next-line import/no-extraneous-dependencies
import program from 'commander';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>');

program.parse(process.argv);
