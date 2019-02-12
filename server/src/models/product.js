import mongoose from 'mongoose';

const productSchema = mongoose.Schema ({

    Name : String,
    Category : String,
    Price : Number,
    Quantity : Number ,
    Description : String,
    image : String,
    
}, {
   
    timestamps: true,
  });

export default mongoose.model('Product' , productSchema)