import express, { Request, Response } from "express";
import productRoutes from "./products.router";
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Or restrict to 'http://localhost:8080'
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use("/api", productRoutes);
app.use('/img', express.static(path.join(__dirname, 'img')));
/* app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Node.js + TypeScript API!");
}); */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});