#!/usr/bin/env node

import got from 'got'

console.log('loading templates...')

const templates = await got('https://api.github.com/users/lukeed/repos', {})
