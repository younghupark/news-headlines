const express = require('express')()
const app = express
const bodyParser = require('body-parser')()
const request = require('request')
const config = require('config')

const apiKey= config.get('apiKey');
