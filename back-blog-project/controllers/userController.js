require('dotenv').config();
const jwt = require('jsonwebtoken');

const MongoClient = require("mongodb").MongoClient;
const url = process.env.DATABASE;
// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient(url);

class UserController {
    async Signup(req, res, next){
        if(!req.body) return res.sendStatus(400);

        const userLogin = req.body.Login;
        const userPassword = req.body.Password;

        try {
            const user = {userLogin, userPassword};
            if ((user.userLogin.length > 5) && (user.userPassword.length > 5)){
                console.log(user);

                //DB
                try {
                    await mongoClient.connect();
                    const db = mongoClient.db("blogbox");
                    const collection = db.collection("users");
                    const user = {
                        login: userLogin,
                        password: userPassword
                    };
                    const result = await collection.insertOne(user);
                    console.log(result);
                    console.log(user);
                }catch(err) {
                    console.log(err);
                    res.status(404).json('error in DB');
                } finally {
                    await mongoClient.close();
                    console.log("Подключение закрыто");
                    res.status(200).send(user);
                }
            
            }
            else {
                console.log('error body have empty login or password');
                res.status(404).json('error body have empty login or password');
            }

        } catch(err) {
            console.log(err);
            res.status(404).json('error');
        }
    }

    async generateToken (req, res, next) {
        console.log('generateToken');

        if(!req.body) return res.sendStatus(400);

        //DB
        try {
            let jwtSecretKey = process.env.SECRET_KEY;
            let data = {
                Login: req.body.Login,
                Password: req.body.Password
            }

            await mongoClient.connect();
            const db = mongoClient.db("blogbox");
            const collection = db.collection("users");

            const token = jwt.sign(data, jwtSecretKey);
            const tokenDB = {
                Token: token
            }
            await collection.insertOne(tokenDB);
            res.status(200).send(token);

        }catch(err) {
            console.log(err);
            res.status(404).json('error in DB');
        } finally {
            await mongoClient.close();
            console.log("Подключение закрыто");
        }
    }

    async verifyToken (req, res, next) {
        console.log('verifyToken');

        if(!req.body) return res.sendStatus(400);

        //DB
        try {
            let jwtSecretKey = process.env.SECRET_KEY;
            let data = {
                Login: req.body.Login,
                Password: req.body.Password
            }

            await mongoClient.connect();
            const db = mongoClient.db("blogbox");
            const collection = db.collection("users");

            const token = jwt.sign(data, jwtSecretKey);
            let obj = await collection.find({Token: token}).toArray();
            console.log(obj);
            if (Object.keys(obj).length === 0)
                throw new Error("Такого пользователя нет");
            res.status(200).send("авторизация прошла успешно");

        }catch(err) {
            console.log(err);
            res.status(404).json('error in DB');
        } finally {
            await mongoClient.close();
            console.log("Подключение закрыто");
        }
    }

    async Hello (req, res) {
        console.log('hello');
        res.status(200).json('hello pet');
      }

    async Goodbye (req, res) {
        console.log('goodbye');
        res.status(200).json('goodbye pet');
    }

    async GetAllUsers (req, res) {
        console.log('GetAllUsers');

        //DB
        try {
            await mongoClient.connect();
            const db = mongoClient.db("blogbox");
            const collection = db.collection("users");
            const count = await collection.countDocuments();
            console.log(`В коллекции users ${count} документа/ов`);
            const results = await collection.find().toArray();
            //const results = await collection.find({name: "Tom"}).toArray();
            console.log(results);
            res.status(200).send(results);
        }catch(err) {
            console.log(err);
            res.status(404).json('error in DB');
        } finally {
            await mongoClient.close();
            console.log("Подключение закрыто");
        }
    }
}

module.exports = new UserController();