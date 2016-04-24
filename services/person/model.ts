"use strict";

export default class Person {
    public id: number;
    public fullName: string;

    constructor(public firstName: string, public lastName: string) {
        this.fullName = `${firstName} ${lastName}`;
    }
}