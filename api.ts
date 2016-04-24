"use strict";

export default function () {
    const name = 'api';

    let seneca = this;

    // Person (Client) routes
    seneca.add({role: name, end: 'person/save'}, savePerson);
    seneca.add({role: name, end: 'person/list'}, listPersons);
    seneca.add({role: name, end: 'person/get'}, getPerson);

    // Bank routes
    seneca.add({role: name, end: 'bank/save'}, saveBank);
    seneca.add({role: name, end: 'bank/list'}, listBanks);
    seneca.add({role: name, end: 'bank/get'}, getBank);

    // Account routes
    seneca.add({role: name, end: 'account/save'}, saveAccount);
    seneca.add({role: name, end: 'account/list'}, listAccounts);
    seneca.add({role: name, end: 'account/get'}, getAccount);
    //seneca.add({role: name, end: 'account/update'}, updateAccount);


    function savePerson(args, done) {
        let data = {
            firstName: args.req$.body.firstName,
            lastName: args.req$.body.lastName
        };

        seneca.act('role:person, cmd:save', data, done);
    }

    function listPersons(args, done) {
        let query = {
            sort$: {
                fullName: 1
            }
        };

        if (args.req$.query && args.req$.query.sort) {
            query.sort$ = args.req$.query.sort;
        }

        seneca.act('role:person, cmd:list', {query: query}, done);
    }

    function getPerson(args, done) {
        seneca.act('role:person, cmd:get', {id: args.req$.query.id}, done);
    }


    function saveBank(args, done) {
        let data = {
            title: args.req$.body.title
        };

        seneca.act('role:bank, cmd:save', data, done);
    }

    function listBanks(args, done) {
        let query = {
            sort$: {
                title: 1
            }
        };

        if (args.req$.query && args.req$.query.sort) {
            query.sort$ = args.req$.query.sort;
        }

        seneca.act('role:bank, cmd:list', {query: query}, done);
    }

    function getBank(args, done) {
        seneca.act('role:bank, cmd:get', {id: args.req$.query.id}, done);
    }


    function saveAccount(args, done) {
        let data = {
            bankId: args.req$.body.bankId,
            personId: args.req$.body.personId,
        };

        seneca.act('role:account, cmd:save', data, done);
    }

    function listAccounts(args, done) {
        let query = {
            sort$: {
                balance: 1
            }
        };

        if (args.req$.query && args.req$.query.sort) {
            query.sort$ = args.req$.query.sort;
        }

        seneca.act('role:account, cmd:list', {query: query}, done);
    }

    function getAccount(args, done) {
        seneca.act('role:account, cmd:get', {id: args.req$.query.id}, done);
    }


    seneca.act({
        role: 'web',
        use: {
            prefix: '/api/',
            pin: {
                role: name,
                end: '*'
            },
            map: {
                'person/save': {POST: true},
                'person/list': {GET: true},
                'person/get': {GET: true},

                'bank/save': {POST: true},
                'bank/list': {GET: true},
                'bank/get': {GET: true},

                'account/save': {POST: true},
                'account/list': {GET: true},
                'account/get': {GET: true}
            }
        }
    });

    return {
        name: name
    };
}