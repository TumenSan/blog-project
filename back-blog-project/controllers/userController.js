require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserModel = require("../models/userModel");
const TokenSchema = require("../models/tokenModel");
const userService = require("../service/userService");

class PostController {
    async Signup(req, res, next){
        if(!req.body) return res.sendStatus(400);

        const userLogin = req.body.login;
        const userPassword = req.body.password;

        try {
            /*
            const user = {userLogin, userPassword};
            if ((user.userLogin.length > 5) && (user.userPassword.length > 5)){
                console.log(user);

                //DB
                try {
                    const user = {
                        login: userLogin,
                        password: userPassword
                    };
                    const result = await UserModel.create(user);
                    console.log(result);
                    console.log(user);
                }catch(err) {
                    console.log(err);
                    res.status(404).json('error in DB');
                } finally {
                    console.log("Подключение закрыто");
                    res.status(200).send(user);
                }
            
            }
            else {
                console.log('error body have empty login or password');
                res.status(404).json('error body have empty login or password');
            }
            */
            const userData = await userService.registration(userLogin, userPassword);

            // TODO remove refreshtoken from userData?
            res.cookie("refreshToken", userData.refreshToken, {
              maxAge: 30 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            });
            return res.json(userData);

        } catch(err) {
            console.log(err);
            res.status(404).json('error');
        }
    }

    async Login(req, res, next) {
        try {
          const { login, password } = req.body;
          const userData = await userService.login(login, password);
    
          res.cookie("refreshToken", userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
          });
          return res.json(userData);
        } catch (e) {
          next(e);
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

            const token = jwt.sign(data, jwtSecretKey);
            const tokenDB = {
                Token: token
            }
            await TokenSchema.create(tokenDB);
            res.status(200).send(token);

        }catch(err) {
            console.log(err);
            res.status(404).json('error in DB');
        } finally {
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

            const token = jwt.sign(data, jwtSecretKey);
            let obj = await TokenSchema.find({Token: token});
            console.log(obj);
            if (Object.keys(obj).length === 0)
                throw new Error("Такого пользователя нет");
            res.status(200).send("авторизация прошла успешно");

        }catch(err) {
            console.log(err);
            res.status(404).json('error in DB');
        } finally {
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
            const results = await UserModel.find().select('login');
            res.status(200).send(results);
        }catch(err) {
            console.log(err);
            res.status(404).json('error in DB');
        } finally {
            console.log("Подключение закрыто");
        }
    }
}

module.exports = new PostController();