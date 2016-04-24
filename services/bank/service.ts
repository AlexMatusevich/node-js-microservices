"use strict";

import seneca = require('seneca');
import config from './config';
import api from './api';

seneca()
    .use('entity')
    .use(api)
    .listen(config)
    .ready(function () {
        console.log('Bank Service is ready');
    });