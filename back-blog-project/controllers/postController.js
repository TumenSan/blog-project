const PostModel = require("../models/postModel");

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
                    const post = {
                        login: userLogin,
                        post: userPost
                    };
                    const result = await PostModel.create(post);
                    console.log(result);
                    console.log(post);
                }catch(err) {
                    console.log(err);
                    res.status(404).json('error in DB');
                } finally {
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
            const results = await PostModel.find();
            console.log(results);
            res.status(200).send(results);
        }catch(err) {
            console.log(err);
            res.status(404).json('error in DB');
        } finally {
            console.log("Подключение закрыто");
        }
    }
}

module.exports = new UserController();