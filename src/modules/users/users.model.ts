import  mongoose, { mongo }  from "mongoose";
import IUser from "./users.interface";

const UserSchema = new mongoose.Schema({
    first_Name: {
        type: String,
        required: true,
    },
    last_Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        index: true,
        required: true,         
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    avatar: {
        type: String,
        // default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Picture.png"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);