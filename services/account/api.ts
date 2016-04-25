"use strict";

import AccountModel from './model';

export default function () {
    const name = 'account';

    let seneca = this;

    seneca.add({role: name, cmd: 'get'}, getAccount);
    seneca.add({role: name, cmd: 'list'}, listAccounts);
    seneca.add({role: name, cmd: 'save'}, saveAccount);
    seneca.add({role: name, cmd: 'update'}, updateAccount);


    function saveAccount(args, done) {
        let accountModel = (args instanceof AccountModel) ? args : new AccountModel(args.bankId, args.personId);
        let account = seneca.make(name, accountModel);

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

            let accountModel = new AccountModel(response.bankId, response.personId);
            accountModel.id = response.id;
            accountModel.balance = response.balance;

            return done(null, accountModel);
        });
    }

    function listAccounts(args, done) {
        let account = seneca.make(name);

        account.list$(args.query, (error, response) => {
            if (error) {
                return done(error);
            }

            let accountList = response.map(({bankId, personId, id, balance}) => {
                let accountModel = new AccountModel(bankId, personId);
                accountModel.id = id;
                accountModel.balance = balance;

                return accountModel;
            });

            return done(null, accountList);
        });
    }

    function updateAccount(args, done) {
        if (!args.id || !args.value) {
            return done();
        }

        getAccount({id: args.id}, (error, response) => {
            if (error) {
                return done(error);
            }

            response.balance += args.value;

            saveAccount(response, (error, response) => {
                if (error) {
                    return done(error);
                }

                return done(null, {id: response.id});
            });
        });
    }

    return {
        name: name
    };
}