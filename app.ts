"use strict";

import * as express from 'express';
import * as bodyParser from 'body-parser';
import seneca = require('seneca');


import apiCore from './api';
import personConfig from './services/person/config';
import bankConfig from './services/bank/config';
import accountConfig from './services/account/config';
import transactionConfig from './services/transaction/config';

let senecaApp = seneca();
senecaApp
    .use('entity')
    .use('user')
    .use('auth')
    .use(apiCore)
    .client(personConfig)
    .client(bankConfig)
    .client(accountConfig)
    .client(transactionConfig);

import './services/person/service';
import './services/bank/service';
import './services/account/service';
import './services/transaction/service';


let app = express();

app.use(bodyParser.json());
app.use(senecaApp.export('web'));
app.use(express.static('public'));

app.listen(3000);