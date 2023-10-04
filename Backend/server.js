import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

// routes
import auth from "./router/auth.router.js";
import companies from "./router/companies.router.js";
import tokenMiddleWare from "./middleware/token.middleware.js";
import complex from "./router/complex.router.js";
import room from "./router/room.router.js";
import bank from "./router/duration.roter.js"


const app = express();
app.use(express.json());
app.use(cors());


app.use("/auth", auth);
app.use(tokenMiddleWare);
app.use("/companies", companies);
app.use("/complex", complex);
app.use("/room", room);
app.use("bank", bank)



app.listen(port, () => {
  console.log(`Server is running ${port} port`);
});


