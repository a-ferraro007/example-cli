#!/usr/bin/env node
import fs from 'fs' //.promises
import { Formatter } from './formatter'
//const Formatter = require('./formatter')

export async function main() {
  const formatter = new Formatter(1)

  const folder = fs.readdirSync('src/json')
  const filePromises = folder.map((file: any) => {
    return fs.promises.readFile(`src/json/${file}`, 'utf8')
  })
  const resolved = await Promise.all(filePromises)

  formatter.writeToFile(formatter.formatJSON(resolved))
}
