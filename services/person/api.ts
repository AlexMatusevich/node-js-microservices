"use strict";

import PersonModel from './model';

export default function () {
    const name = 'person';

    let seneca = this;

    seneca.add({role: name, cmd: 'get'}, getPerson);
    seneca.add({role: name, cmd: 'list'}, listPersons);
    seneca.add({role: name, cmd: 'save'}, savePerson);


    function savePerson(args, done) {
        let person = seneca.make(name, new PersonModel(args.firstName, args.lastName));

        person.save$((error, response) => {
            if (error) {
                return done(error);
            }

            return done(null, {id: response.id});
        });
    }

    function getPerson(args, done) {
        if (!args.id) {
            return done();
        }

        let person = seneca.make(name);

        person.load$(args.id, (error, response) => {
            if (error) {
                return done(error);
            }

            let person = new PersonModel(response.firstName, response.lastName);
            person.id = response.id;

            return done(null, person);
        });
    }

    function listPersons(args, done) {
        let person = seneca.make(name);

        person.list$(args.query, (error, response) => {
            if (error) {
                return done(error);
            }

            let personList = response.map(({firstName, lastName, id}) => {
                let person = new PersonModel(firstName, lastName);
                person.id = id;

                return person;
            });

            return done(null, personList);
        });
    }


    return {
        name: name
    };
}