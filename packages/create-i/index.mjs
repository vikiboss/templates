#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

import got from 'got'
import degit from 'degit'
import prompts from 'prompts'

const link = 'https://api.github.com/repos/vikiboss/templates/contents/templates'

console.log('⏳ Loading templates...')

/** @type {{ name: string }[]} */
const templates = await got.get(link).json()

console.log('✅ Templates loaded.')

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
    validate: (name) => (!name ? 'Project name is required' : true),
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

if (!name) {
  console.log('Project name is required')
  process.exit(1)
}

const descDir = path.join(process.cwd(), name)

const emitter = degit(`vikiboss/templates/templates/${template}`, {
  mode: 'tar',
  cache: false,
  verbose: true,
  force: overwrite
})

console.log('⏳ Cloning template...')

await emitter.clone(descDir)

console.log(`✅ Template cloned at ${descDir}`)

process.exit(0)
