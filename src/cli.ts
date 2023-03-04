#!/usr/bin/env node
//import { main } from './index.js';
import welcome from 'cli-welcome';
import inquirer from 'inquirer';
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt';
import chalk from 'chalk';
import path from 'path';
import JSONFormatter from './formatter.js';
//import * as url from 'node:url';
//const __filename = url.fileURLToPath(import.meta.url);
//const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

(async function cli() {
    inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);
    welcome({
        title: 'JSON Formatter',
        tagLine: 'by me',
        description: `A simple CLI to format a folder of json files into a one output file. Default formatting removes the outer array and concatenate all the json files into a single array.`,
        version: '0.0.1',
        bgColor: '#0066FF',
        color: '#000000',
        bold: true,
        clear: true,
    });

    inquirer
        .prompt([
            {
                type: 'file-tree-selection',
                name: 'inputPath',
                message: 'select input folder',
                enableGoUpperDirectory: true,
                transformer(input) {
                    const name = input.split(path.sep).pop();
                    if (name[0] === '.') {
                        return chalk.grey(name);
                    }
                    return name;
                },
                onlyShowDir: false,
            },
            {
                type: 'file-tree-selection',
                name: 'outputPath',
                message: 'select output folder',
                transformer(input) {
                    const name = input.split(path.sep).pop();
                    if (name[0] === '.') {
                        return chalk.grey(name);
                    }
                    return name;
                },
                onlyShowDir: false,
            },
            {
                type: 'input',
                name: 'outputFileName',
                message: 'name of formatted output file: ',
            },
        ])
        .then((answers: any) => {
            const formatter = new JSONFormatter(answers);
            formatter.init();
        });
})();
