import express, {Schema} from "mongoose";

const schema = new Schema({
    bankName: {type: String},
    accountType: {type: String},
    ownerName: {type: String},
    creditLimit: {type: Number},
    apikey: {type: String},
});

export default express.model('financial', schema);