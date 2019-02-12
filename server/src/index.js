import {ApolloServer , gql}  from 'apollo-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './models/user';
import Product from './models/product';
import Categories from './models/category';



const Secret = 'mySecret';
function generateToken(id,email){
  const token = jwt.sign({id,email}, Secret);
  return token;
}
function verifyToken(token){
  try{
    const{ id } = jt.verify(token, SECRET);
    return id;

  } catch (err){
    return null;
  }
}

const typeDefs = gql`
  type Product {
    id : ID!
    Name : String
    Category : String
    Price : String
    Quantity : String
    Description : String
    image : String
  }
  input ProductInput {

    id : ID
    Name : String
    Category : String
    Price : String
    Quantity : String
    Description : String
    image : String
  }
  type User{
    id: ID!
    firstName : String
    lastName : String
    email : String
    login: String!
    password : String
    
    
  }
  type Categories{
    id: ID
    Name: String
    products :[Product]
}

input InputCategories{
  Name: String
    
}
  input UserInput {
    id: ID
    firstName : String
    lastName : String
    email : String
    login: String!
    password : String
  }
  type UserLogged{

    login : String
    token: String
  
  }
  
  type Query {
    me: UserLogged
    User : [User]
    Product : [Product]
    ProductById ( id:ID! ) : Product
    Categories : [Categories]

  }
  type Mutation {
    register(input: UserInput): User
    login(input: UserInput): UserLogged
    addProduct(input : ProductInput) : Product
    deleteProduct (id : ID!) : Boolean
    updateProduct (id:ID! ,input : ProductInput) : Product
    addCategory(input : InputCategories) : Categories
    deleteCategory (id : ID!) : Boolean
    updateCategory (input : InputCategories) : Categories
  }
`;

const resolvers = {
  Query: {
    Product: async (_, $, {models}) =>{

      const Product = await models.Product.find();
      console.log("Product" , Product);
      return Product;
    },
    ProductById: (_, {id} , {models}) => models.Product.findOne({_id : id}),
    me :(_, $ , {models, userId}) => models.User.findOne({_id: userId}),
    User : async (_, $ , {models}) => {

      const User = await models.User.find();
      console.log("User", User);
      return User;
    },
    Categories : async (_, $, {models}) =>{

      const categorie = await models.Categories.find();
      console.log("Categories" , Categories);
      return categorie;
    },
  },
  
  
  Mutation:{
    
  addProduct : async (_, {input} , {models}) => {
    const newProduct = new models.Product ({
      Name : input.Name,
      Category : input.Category,
      Price : input.Price,
      Quantity : input.Quantity,
      Description : input.Description,
      image : input.image
    });
    const ProductAdded = await newProduct.save();
    return ProductAdded;

  },
  updateProduct :  (_, {input : {id, Name , Category , Price , Quantity , Description , image}}) => {
    const prod = Product.findOneAndUpdate({_id : id}, {
      $set : {
        Name,
        Category,
        Price,
        Quantity,
        Description,
        image,
      }
    });
    console.log(prod);
    return prod;
    
  },
  deleteProduct: async (_, { id }) => {
    await Product.findByIdAndDelete(id);
    return true;
  },
  addCategory : async (_, {input} , {models}) => {
    const newCategory = new models.Categories ({
      Name : input.Name,
      
    });
    const CategoryAdded = await newCategory.save();
    return CategoryAdded;

  },
  updateCategory :  (_, {input : {id, Name }}) => {
    const Cat = Categories.findOneAndUpdate({_id : id}, {
      $set : {
        Name,
      }
    });
    console.log(Cat);
    return Cat;
    
  },
  deleteCategory: async (_, { id }) => {
    await Categories.findByIdAndDelete(id);
    return true;
  },
   register : async (_, {input} , {models} ) =>{
    const hashPassword = await bcrypt.hash(input.password, 3);
    const user = new models.User({

    firstName : input.firstName,
    lastName : input.lastName,
    email : input.email,
    login : input.login,
    password : hashPassword,
    });
    await user.save();
    const token = generateToken(user.id, user.login);
    return {token,firstName : input.firstName,lastName : input.lastName, email : input.email,login: user.login   };
   },

   login: async (_, {input}, {models}) => {
    const currentUser = await models.User.findOne({login: input.login});
    if(!currentUser){
      throw new Error('User not found');
    }
    const correctPassword = await bcrypt.compare(input.password, currentUser.password);
    console.log('***', correctPassword);
    if(!correctPassword){
      throw new Error('Wrong Password !!');
    }
    const token = generateToken(currentUser.id, currentUser.login);
    return {token, login: currentUser.login};
  },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context : ({req}) => {
    const userId = verifyToken(req.headers.authorization);
    return {
      userId,
    
      models : {
        User,
        Product,
        Categories,
        
       
        
        
      },
    };
  },

});
mongoose.connect('mongodb://localhost:27017/MyApp', { useNewUrlParser: true })
  .then(() =>{
    console.log('connected to database');
    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  });