import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true //createdAT, updatedAT

});

const Password = mongoose.model('Password', passwordSchema);

export default Password;