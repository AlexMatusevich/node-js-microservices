"use strict";

export default class Bank {
    public id: string;
    public greeting: string;

    constructor(public title: string) {
        this.greeting = `We're glad to see you in our bank: ${title}`;
    }
}