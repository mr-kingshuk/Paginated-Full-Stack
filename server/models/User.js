import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required : true
    },
    gender : {
        type: String,
        required : true,
    }
}, {
    timestamps : true
});

export const userModel = mongoose.model('User', userSchema);