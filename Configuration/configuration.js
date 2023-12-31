import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import {
    orderSechma, addressSchema, sign_schema,
    sell_sechema, ratingnadreviewSchema, cartSechma,
    totalSchema
} from "../Schema/schema.js";

mongoose.connect(process.env.DBURL).then(() => {
    // moongoose url to connect 
    console.log("Connected to db");
}).catch((error) => {
    console.log("  Didnot connect to db", error);
});
// list  of mongoose model 
const cart_model = mongoose.model("cart", cartSechma);
const rating_module = mongoose.model("rating", ratingnadreviewSchema);
const sign_module = mongoose.model("signdata", sign_schema);
const sell_module = mongoose.model("selldata", sell_sechema);
const totalModel = mongoose.model("total", totalSchema);
const addressModel = mongoose.model("address", addressSchema);
const orderModel = mongoose.model("order", orderSechma);
export {
    orderModel, addressModel,
    totalModel, sign_module, sell_module,
    rating_module, cart_model
};
