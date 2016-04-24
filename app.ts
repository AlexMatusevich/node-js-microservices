"use strict";

import * as express from 'express';
import * as bodyParser from 'body-parser';
import seneca = require('seneca');


import apiCore from './api';
import personConfig from './services/person/config';

let senecaApp = seneca();
senecaApp
    .use('entity')
    .use('user')
    .use('auth')
    .use(apiCore)
    .client(personConfig);

import './services/person/service';


let app = express();

app.use(bodyParser.json());
app.use(senecaApp.export('web'));
app.use(express.static('public'));

app.listen(80);