import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    }
},{timestamps: true})

const User = mongoose.model.User || mongoose.model("User",UserSchema)

export default User;