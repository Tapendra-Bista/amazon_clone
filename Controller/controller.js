import { sign_module, sell_module, rating_module, cart_model } from "../Configuration/configuration.js";
// importing models 
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Jwt from "jsonwebtoken";

dotenv.config();
// signup in amazon
const signup = async (req, resp) => {
    const { username, email, password } = req.body;
    const checking_user = await sign_module.findOne({ email });
    if (checking_user) {
        return resp.status(409).json({ status: false, message: "User already exists from this email" })
    }
    try {
        const hash_password = await bcrypt.hash(password, 10);
        const data = await sign_module.create({
            username: username,
            email: email,
            password: hash_password,
        });
        console.log(data);
        return resp.status(200).json({ status: true, message: "Successfully sign up" });
    } catch (erro) {
        return resp.status(403).json({ status: false, message: erro['message'] })
    }

}
// signin in amazon
const signin = async (req, resp) => {

    const { email, password } = req.body;
    const checking_user = await sign_module.findOne({ email });

    if (!checking_user) {
        return resp.status(404).json({ status: false, message: "User dosn't exist from this email" });
        // 404 is doesnot exists status code
    }
    if (checking_user && (await bcrypt.compare(password, checking_user.password,

    ))) {
        const token = Jwt.sign({
            checking_user: {
                email: checking_user.email,
                password: checking_user.password,
            }

        }, process.env.ACCESS_TOKEN, { expiresIn: "7d" });
        console.log(`${token},${checking_user}`);
        return resp.status(200).json({ status: true, message: "Successfully sign in", token: token, ...checking_user._doc });

    } else {
        return resp.status(401).json({ status: false, message: "Wrong password" });
        // 401 is a status code for unthorized
    }

}

// for sell or add a products
const post_sell = async (req, resp) => {
    const { image, productname, discription, price, qantity, catergory } = req.body;
    const data = await sell_module.create({
        image: image,
        productname: productname,
        discription: discription,
        price: price,
        qantity: qantity,
        catergory: catergory,
    });
    resp.status(200).json({ status: true, message: 'New item created' });
    console.log(data);
    if (!image && !productname && !discription && !price && qantity && !catergory) {
        resp.status(403).json({ message: 'Invalid Input' });
    }
}
// get all data  of products
const get_sell = async (req, resp) => {
    const selldata = await sell_module.find().sort({ "price": 1 });
    resp.status(200).json(selldata);
};
const available = async (req, resp) => {
    const availabledata = await sell_module.find();
    resp.status(200).json(availabledata);
};
// delete a products by produts name
const delete_sell = async (red, resp) => {
    const { productname } = red.body;
    const datadelete = await sell_module.findOneAndDelete(

        productname
    );
    console.log(datadelete);
    resp.status(200).json("deleted successfully");

};
// patch a products 
const patch_sell = async (req, resp) => {
    const { productname, discription, price, qantity, catergory } = req.body;
    const patchdata = await sell_module.updateOne(
        {
            _id: req.params.id
        },

        {
            $set: req.body

        });
    console.log(patchdata);
    resp.status(200).json("deleted successfully");
}




// find a products by catergory

const data_req = async (req, resp) => {

    const selldata = await sell_module.find({
        catergory: req.query.catergory
    });
    resp.status(200).json(selldata);
};

// search products by names
const searchitem = async (req, resp) => {
    console.log(req.params.productname)
    const searchresult = await sell_module.find({
        productname: new RegExp(req.params.productname, 'i'),

    }
    );
    if (searchresult.length === 0) {
        return resp.status(404).json({ message: "Item Not Found !" });
    }

    resp.status(200).json(searchresult);
    console.log(searchresult);

};


// home items list 
// expensive
const expensivedata = async (req, resp) => {

    const expensive = await sell_module.find({
        'price': { "$gte": "500" }
    }).sort({ "price": -1 });




    resp.status(200).json(expensive);
};

// cheap
const cheapdata = async (req, resp) => {

    const cheap = await sell_module.find({
        'price': { "$gte": "1", "$lt": "500", }
    }).sort({ "price": -1 });



    resp.status(200).json(cheap);
};

// for rating a products 
const postrating = async (req, res) => {
    const { ratingGiver, review, rating, productid } = req.body;
    const datacreated = await rating_module.create({
        rating: rating,
        ratingGiver: ratingGiver,
        review: review,
        productid: productid,
    });
    console.log(datacreated);
    res.status(200).json(datacreated);
}
// get rating of produts 
const getrating = async (req, res) => {



    const datarev = await rating_module.find({
        productid: req.query.productid,

    }).sort({ "rating": -1 });
    if (datarev.length === 0) {
        return res.status(404).json({ rate: "0" });
    }
    res.status(200).json(datarev);


}

// add a products in a cart by user 
const putcard = async (req, res) => {
    const { cartqauntity, usermail, image, productname, discription, price, qantity, catergory } = req.body;
    const checkingitem = await cart_model.findOne({ productname:req.body. productname});
    if (!checkingitem) {
        const createcart = await cart_model.create({
            productname: productname,
            usermail: usermail,
            image: image,
            discription: discription,
            price: price,
            qantity: qantity,
            catergory: catergory,
            cartqauntity: cartqauntity,

        });
        console.log(createcart);
        return res.status(200).json({ message: "product added to cart" });

    } else {
 const cartupdate  = await cart_model.findOneAndUpdate({
    productname:req.body.productname,
 },{
   $inc:{"cartqauntity":1}
  }
 );
  
 console.log("quantity increment by 1");
 return res.status(201).json({message:"quantity increment by 1"});

}
    }



// display list of  products cart 
const getcart = async (req, res) => {
    const data = await cart_model.find();
if (data.length===0){
  return  res.status(404).json({message:"Add a products in cart"});
}
console.log(data);

 return res.status(200).json(data);
 
}
export { getcart, putcard, getrating, postrating, available, cheapdata, expensivedata, signup, signin, post_sell, get_sell, delete_sell, patch_sell, data_req, searchitem };



