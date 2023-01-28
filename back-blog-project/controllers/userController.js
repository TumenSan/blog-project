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

    async Logout(req, res, next) {
        try {
          const { refreshToken } = req.cookies;
          const token = await userService.logout(refreshToken);
          
          res.clearCookie("refreshToken");
          return res.sendStatus(200);
        } catch (e) {
          next(e);
        }
    }

    async Refresh(req, res, next) {
        try {
          const { refreshToken } = req.cookies;
    
          const userData = await userService.refreshToken(refreshToken);
    
          res.cookie("refreshToken", userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
          });
          return res.json(userData);
        } catch (e) {
          next(e);
        }
      }

    async Hello (req, res) {
        console.log('hello');
        res.status(200).json('hello user');
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