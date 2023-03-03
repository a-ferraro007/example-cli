#!/usr/bin/env node

const fs = require('fs').promises

class Formatter {
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
    fs.writeFile(`src/formatted${this.index}.json`, JSON.stringify(data), 'utf8', (err: any) => {
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

async function main() {
  const formatter = new Formatter(1)

  const promise1 = fs.readFile('src/test.json', 'utf8', formatter.readJSON)
  const promise2 = fs.readFile('src/test1.json', 'utf8', formatter.readJSON)
  const promise3 = fs.readFile('src/test2.json', 'utf8', formatter.readJSON)
  const promise4 = fs.readFile('src/test3.json', 'utf8', formatter.readJSON)
  const promise5 = fs.readFile('src/test4.json', 'utf8', formatter.readJSON)

  const resolved = await Promise.all([promise1, promise2, promise3, promise4, promise5])
  formatter.writeToFile(formatter.formatJSON(resolved))
}

;(async function cli(args: string[]) {
  main()
  console.log(args)
})(process.argv.slice(2))
