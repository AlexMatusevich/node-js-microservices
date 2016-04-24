"use strict";

import AccountModel from './model';

export default function () {
    const name = 'account';

    let seneca = this;

    seneca.add({role: name, cmd: 'get'}, getAccount);
    seneca.add({role: name, cmd: 'list'}, listAccounts);
    seneca.add({role: name, cmd: 'save'}, saveAccount);
    //seneca.add({role: name, cmd: 'update'}, updateAccount);


    function saveAccount(args, done) {
        let account = seneca.make(name, new AccountModel(args.bankId, args.personId));

        account.save$((error, response) => {
            if (error) {
                return done(error);
            }

            return done(null, {id: response.id});
        });
    }

    function getAccount(args, done) {
        if (!args.id) {
            return done();
        }

        let account = seneca.make(name);

        account.load$(args.id, (error, response) => {
            if (error) {
                return done(error);
            }

            let account = new AccountModel(response.bankId, response.personId);
            account.id = response.id;
            account.balance = response.balance;

            return done(null, account);
        });
    }

    function listAccounts(args, done) {
        let account = seneca.make(name);

        account.list$(args.query, (error, response) => {
            if (error) {
                return done(error);
            }

            let accountList = response.map(({bankId, personId, id, balance}) => {
                let account = new AccountModel(bankId, personId);
                account.id = id;
                account.balance = balance;

                return account;
            });

            return done(null, accountList);
        });
    }


    return {
        name: name
    };
}