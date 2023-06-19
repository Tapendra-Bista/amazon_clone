import express from "express";
import {available, expensivedata,signin,signup,get_sell,post_sell, delete_sell,patch_sell, searchitem,data_req, cheapdata, getrating, postrating } from "../Controller/controller.js";
const routes = express.Router();
// search
routes.route("/Products/search/:productname").get(searchitem);
// item catagory
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
export  default routes;









