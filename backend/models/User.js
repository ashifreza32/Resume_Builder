import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Yeh line missing thi [1]

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true 
    }
}, { timestamps: true }); [2]

// Password compare karne ke liye method
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password); [1]
}

const User = mongoose.model('User', userSchema); [1]

export default User; 