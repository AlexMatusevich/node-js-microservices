"use strict";

export default class Account {
    public id: string;
    public bankId: string;
    public personId: string;
    public balance: number;

    constructor(bankId: string, personId: string) {
        this.bankId = bankId;
        this.personId = personId;
        this.balance = 0;
    }
}