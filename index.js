import dotenv from "dotenv";
dotenv.config();
import express from "express";
import https from "https";
import path from 'path';
import fs from "fs";
import { fileURLToPath } from "url";
import helmet from "helmet"
import routes from "./Routes/routes.js";
const app = express();
// for path find 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// cert and key of https
const certpath = path.join(__dirname, "security/cert.pem");
const keypath = path.join(__dirname, "security/key.pem");
// port number for localhost
const port = process.env.PORT || "3000"

// routtes middleware
app.use(express.json());
app.use(helmet()); // hide inter part
app.use("/api", routes);

// https localhost
https.createServer({
    key: fs.readFileSync(keypath),
    cert: fs.readFileSync(certpath),
}, app).listen(port, () => {
    console.log("Listening server at port no:", port)
});




// openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365
