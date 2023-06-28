
import mongoose from "mongoose";
// sechema for sign in and sign up
const sign_schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        return value.match(emailRegex);
      },
      message: "Please enter a valid email address",
    }
  },
  password: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {


        return value.length > 8;

      },
      message: "Length of password must be greater than 8 ",
    }
  },
  address: {
    type: String,
    default: "",

  },
  type: {
    type: String,
    default: "user",
  }
},{ versionKey: false });

//  for to add a new products
const sell_sechema = new mongoose.Schema({
  image: [
    {
      type: String,
      required: true,
    }

  ],

  productname: {
    type: String,
    required: true,


  },
  discription: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: String,
    required: true,

  },
  qantity: {
    type: String,
    required: true,

  },
  catergory: {
    type: String,
    required: true,

  },
},{ versionKey: false });
// for rating  a products by user
const ratingnadreviewSchema = new mongoose.Schema({
  productid: {
    type: String,
    required: true,
  },
  ratingGiver: {
    type: String,
    required: true,

  },
  review: {
    type: String,
    required: true,
  },

  rating: {
    type: String,
    required: true,// Number means both int and double
  }
},{ versionKey: false });

// cart schema for products

const cartSechma = new mongoose.Schema({
  useremail: {
    type: String,
    require: true,
  },
  image: [
    {
      type: String,
      required: true,
    }

  ],

  productname: {
    type: String,
    required: true,


  },
  discription: {
    type: String,
    required: true,

  },
  price: {
    type: String,
    required: true,

  },
  qantity: {
    type: String,
    required: true,

  },
  catergory: {
    type: String,
    required: true,

  },
  cartqauntity: {
    type: Number,
    require: true,
  }
},{ versionKey: false });


export { sign_schema, sell_sechema, ratingnadreviewSchema, cartSechma };





