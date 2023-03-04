import fs from 'fs';
//const readline = require('readline')

export default class JSONFormatter {
    opts: any;
    resolved: any;

    constructor(private inputs: any) {
        this.opts = this.inputs;
        console.log('JSON Formatter instantiated');
    }

    json: any = [];
    readJSON(err: any, data: any) {
        if (err) {
            throw new Error(err);
        } else {
            return JSON.parse(data);
        }
    }

    writeToFile(data: any) {
        const { outputPath, outputFileName } = this.opts;
        fs.writeFile(`${outputPath}/${outputFileName}`, JSON.stringify(data), 'utf8', (err: any) => {
            if (err) {
                throw new Error(err);
            } else {
                console.log(`File written to ${outputPath}/${outputFileName}`);
            }
        });
    }

    private formatJSON(data: any) {
        return data.reduce((prev: any, data: any) => [...prev, ...JSON.parse(data)], []);
    }

    private async readFolder() {
        const { inputPath } = this.opts;
        const folder = fs.readdirSync(inputPath);
        const filePromises = folder.map((file: any) => {
            return fs.promises.readFile(`${inputPath}/${file}`, 'utf8');
        });
        return await Promise.all(filePromises);
    }

    async init() {
        this.resolved = await this.readFolder();
        this.writeToFile(this.formatJSON(this.resolved));
    }
}
