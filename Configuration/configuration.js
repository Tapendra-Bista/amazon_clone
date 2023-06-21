import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import {sign_schema, sell_sechema, ratingnadreviewSchema, cartSechma } from "../Schema/schema.js";
mongoose.connect(process.env.DBURL).then(() => {
    console.log("Connected to db");
}).catch((error) => {
    console.log("  Didnot connect to db", error);
});
const cart_model = mongoose.model("cart",cartSechma);
const rating_module = mongoose.model("rating", ratingnadreviewSchema);
const sign_module = mongoose.model("signdata", sign_schema);
const sell_module = mongoose.model("selldata",sell_sechema)
export { sign_module,sell_module,rating_module,cart_model };
