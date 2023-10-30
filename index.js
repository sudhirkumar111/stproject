import express from 'express'
import connectDB from './connection/db.js';
import Stock from './model/stock.js';
import cors from 'cors'
connectDB();
const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/getData', async (req, res) => {
    try {
        const stockList = await Stock.find();
        res.send(stockList)

    }
    catch (error) {
        res.status(404).send("Something went wrong")
    }
});



app.patch('/update-price', async (req, res) => {
    try {
        const result = await Stock.updateOne({ _id: req.body.stockId }, { $set: { price: req.body.price } })
        console.log(result)
        res.send(result)
    }
    catch (error) {
        res.send("Something went wrong")

    }
})



app.listen(4000, (err) => {
    if (err)
        console.log("something went wrong", err)
    else
        console.log("server is listening at 4000")
})
