import express, {Schema} from "mongoose";

const schema = new Schema({
    name: {type: String},
    email: {type: String, unique: true},
    password: {type: String},
    phoneNumber: {type: String},
    apikey: {type: String, unique: true},
    createdAt: {type: Date, default: Date.now}
});

export default express.model("users", schema);