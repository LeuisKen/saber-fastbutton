/**
 * @file express server for dev
 * @author LeuisKen <leuisken@foxmail.com>
 */

'use strict';

const path = require('path');
const express = require('express');
const Bundler = require('parcel-bundler');

const file = path.join(__dirname, '../demo/index.html');
const options = {};
const bundler = new Bundler(file, options);

const app = express();

app.use(bundler.middleware());

app.listen(8080);
