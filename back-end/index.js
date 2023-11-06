const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(
    process.env.MONGODB_URL,
    {useNewUrlParser:true})
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((e)=>{
        console.log("Couldn't connect to MongoDB",e);
    })
const User = require('./db/User');
const Product = require('./db/Product');
const app = express();
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';
app.use(cors());
app.use(express.json());
app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
            res.send({ result: "Something went wrong please try again" })
        }
        res.send({ result, auth: token })
    })
})

app.post('/login',async (req, res) => {

    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "1h" }, (err, token) => {
                if (err) {
                    res.send({ result: "Something went wrong please try again" })
                }
                res.send({ user, auth: token })
            })

        }
        else {
            res.send({ result: "No user found" });
        }
    }
    else {
        res.send({ result: "Please enter correct email or password" });
    }
})

app.post('/add-product',verifyToken,async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/producter/:email', async (req, res) => {
    let result = await User.find({email:req.params.email});
    console.log(result);
    res.send(result);
})
app.get('/products/:id',verifyToken, async (req, res) => {
    console.log(req.params.id);
    let result = await Product.find({userId:req.params.id});
    console.log(result);
    if (result.length > 0) {
        res.send(result);
    }
    else {
        res.send({ Output: "No Products found" })
    }

})

app.delete('/product/:id',verifyToken,async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(req.params.id);
})

app.get('/product/:id',verifyToken,async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) { res.send(result); }
    else {
        res.send({ result: "No record Found" });
    }
})

app.put('/product/:id',  async (req, res) => {
    let result = await Product.updateOne({ _id: req.params.id }, {
        $set: req.body
    })
    res.send(result);
})

app.get('/search/:key', async (req, res) => {
    let result = await Product.find(
        { name: { $regex: req.params.key } }
    );

    res.send(result);
})
function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        // console.log("middleware called", token);
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please enter a valid token with header" })
            }
            else {
                next();
            }
        })
    }
    else {
        res.status(403).send({ result: "Please enter a token with header" })
    }

}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
