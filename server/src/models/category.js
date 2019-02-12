import mongoose from 'mongoose';

const CategoriesSchema = mongoose.Schema ({

    Name : { type: String, required: true },
    
}, {
    
    timestamps: true,
  });
  

export default mongoose.model('Categories' , CategoriesSchema)