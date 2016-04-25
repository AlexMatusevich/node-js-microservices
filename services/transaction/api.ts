"use strict";

import TransactionModel from './model';

export default function () {
    const name = 'transaction';

    let seneca = this;

    seneca.add({role: name, cmd: 'get'}, getTransaction);
    seneca.add({role: name, cmd: 'list'}, listTransactions);
    seneca.add({role: name, cmd: 'save'}, saveTransaction);


    function saveTransaction(args, done) {
        let transactionModel = new TransactionModel(args.senderAccountId, args.recipientAccountId, args.value);
        let transaction = seneca.make(name, transactionModel);

        transaction.save$((error, response) => {
            if (error) {
                return done(error);
            }

            return done(null, {id: response.id});
        });
    }

    function getTransaction(args, done) {
        if (!args.id) {
            return done();
        }

        let transaction = seneca.make(name);

        transaction.load$(args.id, (error, response) => {
            if (error) {
                return done(error);
            }

            let transactionModel = new TransactionModel(response.senderAccountId, response.recipientAccountId, response.value);
            transactionModel.id = response.id;

            return done(null, transactionModel);
        });
    }

    function listTransactions(args, done) {
        let transaction = seneca.make(name);

        transaction.list$(args.query, (error, response) => {
            if (error) {
                return done(error);
            }

            let transactionList = response.map(({senderAccountId, recipientAccountId, value, id}) => {
                let transactionModel = new TransactionModel(senderAccountId, recipientAccountId, value);
                transactionModel.id = id;

                return transactionModel;
            });

            return done(null, transactionList);
        });
    }


    return {
        name: name
    };
}