const fs = require('fs').promises
//const readline = require('readline')

export class Formatter {
  constructor(private index: number) {
    console.log('Handler created', this.index)
  }

  json: any = []
  readJSON(err: any, data: any) {
    if (err) {
      throw new Error(err)
    } else {
      return JSON.parse(data)
    }
  }

  writeToFile(data: any) {
    fs.writeFile(`src/json/formatted.json`, JSON.stringify(data), 'utf8', (err: any) => {
      if (err) {
        throw new Error(err)
      } else {
        console.log('File written')
      }
    })
  }

  formatJSON(data: any) {
    return data.reduce((prev: any, data: any) => [...prev, ...JSON.parse(data)], [])
  }
}
