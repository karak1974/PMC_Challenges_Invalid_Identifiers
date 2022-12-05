//const setDomainLinkage = require('./utilities/auth')
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
//const express = require('express')
import express from 'express'

const app = express()
const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000

app.use(express.static('public'))

import {setDomainLinkage} from './utilities/auth.js'

app.get('/api/helloworld', (req,res) => {
  res.send('Hello World!')
})
app.get('/api/domainLinkage', async (req, res) => {
  const domainLinkage = await setDomainLinkage()
  res.status(200).send(domainLinkage)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
