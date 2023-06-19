import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import express from "express";
import https from "https";
import path from 'path';
import fs from "fs";
import { fileURLToPath } from "url";
import helmet from "helmet"
import routes from "./Routes/routes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const certpath = path.join(__dirname, "security/cert.pem");
const keypath = path.join(__dirname, "security/key.pem");
const port = process.env.PORT || "3000"
const app = express();
app.use(express.json());
app.use(helmet());
app.use(passport.initialize());
app.use("/api", routes);

https.createServer({
key:fs.readFileSync(keypath),
cert:fs.readFileSync(certpath),
},app).listen(port,()=>{
    console.log("Listening server at port no:",port)
});




// openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365
