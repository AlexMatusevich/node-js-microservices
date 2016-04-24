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
                'bank/get': {GET: true}
            }
        }
    });

    return {
        name: name
    };
}