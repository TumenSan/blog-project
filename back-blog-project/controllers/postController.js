require('dotenv').config();
const jwt = require('jsonwebtoken');

const MongoClient = require("mongodb").MongoClient;
const url = process.env.DATABASE;
// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient(url);

class UserController {
    async AddPost(req, res, next){
        if(!req.body) return res.sendStatus(400);

        const userLogin = req.body.Login;
        const userPost = req.body.Post;

        try {
            const post = {userLogin, userPost};
            if ((post.userLogin.length > 5) && (post.userPost.length > 0)){
                console.log(post);

                //DB
                try {
                    await mongoClient.connect();
                    const db = mongoClient.db("blogbox");
                    const collection = db.collection("blog");
                    const post = {
                        login: userLogin,
                        post: userPost
                    };
                    const result = await collection.insertOne(post);
                    console.log(result);
                    console.log(post);
                }catch(err) {
                    console.log(err);
                    res.status(404).json('error in DB');
                } finally {
                    await mongoClient.close();
                    console.log("Подключение закрыто");
                    res.status(200).send(post);
                }
            
            }
            else {
                console.log('error body have empty login or post');
                res.status(404).json('error body have empty login or post');
            }

        } catch(err) {
            console.log(err);
            res.status(404).json('error');
        }
    }

    async GetPosts(req, res, next){
        console.log('GetPosts');

        //DB
        try {
            await mongoClient.connect();
            const db = mongoClient.db("blogbox");
            const collection = db.collection("blog");
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