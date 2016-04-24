"use strict";

export default class Person {
    public id: string;
    public fullName: string;

    constructor(public firstName: string, public lastName: string) {
        this.fullName = `${firstName} ${lastName}`;
    }
}