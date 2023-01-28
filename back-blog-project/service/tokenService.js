const jwt = require("jsonwebtoken");
const tokenModel = require("../models/tokenModel");
require('dotenv').config();

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "15m", //access
    });
    console.log('accessToken ' + accessToken);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY, {
      expiresIn: "30d", //refresh
    });
    console.log('refreshToken ' + refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveRefreshToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeRefreshToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });

    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_KEY); //access

      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_KEY); //refresh

      return userData;
    } catch (e) {
      return null;
    }
  }

  async findRefreshToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken });

    return tokenData;
  }
}

module.exports = new TokenService();