"use strict";

let assert = require('chai').assert;

import PersonModel from './../services/person/model';
import BankModel from './../services/bank/model';

describe('Person', () => {
    describe('Full Name', () => {
        it('should return the correct full name', () => {
            let personModel = new PersonModel('Alex', 'Matusevich');

            assert.equal('Alex Matusevich', personModel.fullName);
        });
    });
});

describe('Bank', () => {
    describe('Greeting Message', () => {
        it('should return the correct greeting message', () => {
            let bankModel = new BankModel('The Best Bank');

            assert.equal('We\'re glad to see you in our bank: The Best Bank', bankModel.greeting);
        });
    });
});