"use strict";

export default class Transaction {
    public id: string;
    public senderAccountId: string;
    public recipientAccountId: string;
    public value: number;

    constructor(senderAccountId: string, recipientAccountId: string, value: number) {
        this.senderAccountId = senderAccountId;
        this.recipientAccountId = recipientAccountId;
        this.value = value;
    }
}