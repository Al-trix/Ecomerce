import express from "express";
import morgan from "morgan"
import usersRoutes from "./routes/users.routes.js";
import { PORT } from "./config.js";

const app = express();

app.use(morgan("dev"))
app.use(express.json())

app.use(usersRoutes);


app.listen(PORT, () => {
   console.log('http://localhost:3000');
})
