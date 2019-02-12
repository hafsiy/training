import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

    firstName : { type : String },
    lastName : { type : String },
    email : { type : String },
    login : { type : String , required : true , unique : true},
    password : String, 
}, {
    timestamps: true,
   });
export default mongoose.model('User' , userSchema);