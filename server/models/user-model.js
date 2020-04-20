import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    refreshToken: String,
    primaryCalendarId: String,
});

const User = mongoose.model('user', userSchema);

export default User;
