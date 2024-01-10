#!/usr/bin/env node

import fs from 'node:fs'
import got from 'got'
import degit from 'degit'
import prompts from 'prompts'
import path from 'node:path'

const link = 'https://api.github.com/repos/vikiboss/templates/contents/templates'

console.log('⏳ loading templates...')

/** @type {{ name: string }[]} */
const templates = await got.get(link).json()

console.log('✅ templates loaded')

/** @type {{ template: string, name: string, overwrite: boolean }} */
const { template, name, overwrite } = await prompts([
  {
    type: 'select',
    name: 'template',
    message: 'Select a template',
    choices: templates.map(({ name }) => ({ title: name, value: name }))
  },
  {
    type: 'text',
    name: 'name',
    message: 'Project name'
  },
  {
    type: (_, { name }) => {
      const dirExists = fs.existsSync(path.join(process.cwd(), name))
      return name && dirExists ? 'confirm' : null
    },
    name: 'overwrite',
    message: 'Overwrite existing files?'
  }
])

const emitter = degit(`vikiboss/templates/templates/${template}`, {
  cache: false,
  verbose: true,
  force: overwrite
})

console.log('⏳ cloning template...')

await emitter.clone(name)

console.log('✅ template cloned')
