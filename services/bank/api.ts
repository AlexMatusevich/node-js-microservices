"use strict";

import BankModel from './model';

export default function () {
    const name = 'bank';

    let seneca = this;

    seneca.add({role: name, cmd: 'get'}, getBank);
    seneca.add({role: name, cmd: 'list'}, listBanks);
    seneca.add({role: name, cmd: 'save'}, saveBank);


    function saveBank(args, done) {
        let bank = seneca.make(name, new BankModel(args.title));

        bank.save$((error, response) => {
            if (error) {
                return done(error);
            }

            return done(null, {id: response.id});
        });
    }

    function getBank(args, done) {
        if (!args.id) {
            return done();
        }

        let bank = seneca.make(name);

        bank.load$(args.id, (error, response) => {
            if (error) {
                return done(error);
            }

            let bank = new BankModel(response.title);
            bank.id = response.id;

            return done(null, bank);
        });
    }

    function listBanks(args, done) {
        let bank = seneca.make(name);

        bank.list$(args.query, (error, response) => {
            if (error) {
                return done(error);
            }

            let bankList = response.map(({title, id}) => {
                let bank = new BankModel(title);
                bank.id = id;

                return bank;
            });

            return done(null, bankList);
        });
    }


    return {
        name: name
    };
}