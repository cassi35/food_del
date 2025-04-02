// filepath: /home/cassiano/Área de trabalho/food_del/backend/models/UserModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;