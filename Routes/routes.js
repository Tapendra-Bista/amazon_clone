import express from "express";
// callback function of routes 
import {orderPut,
    addressGet, addressDelete, address, putcard,
    available, getcart, expensivedata, signin, signup,
    get_sell, post_sell, delete_sell,
    patch_sell, searchitem, data_req, cheapdata, getrating,
    postrating, increment, decrement, total
} from "../Controller/controller.js";

const routes = express.Router();
// search a produts 
routes.route("/Products/search/:productname").get(searchitem);
// item catagory found 
routes.route("/products").get(data_req);
// auth user 
routes.route("/signup").post(signup);
routes.route("/signin").post(signin);
// to sell items
routes.route("/postsell").post(post_sell);
routes.route("/getsell").get(get_sell);

routes.route("/deletesell").delete(delete_sell);
routes.route("/patchsell/:id").patch(patch_sell);
// item in home
routes.route("/expensive").get(expensivedata);
routes.route("/cheap").get(cheapdata);
routes.route("/available").get(available);
// ratinng
routes.route("/rating").get(getrating).post(postrating);
// cart 
routes.route("/cart").get(getcart).patch(putcard);
// decrement and increment
routes.route("/increment").patch(increment);
routes.route("/decrement").patch(decrement);
// total amount
routes.route("/amount").get(total);
// address 
routes.route("/address").get(addressGet).post(address).delete(addressDelete);
// order
routes.route("/order").post(orderPut);
export default routes;


