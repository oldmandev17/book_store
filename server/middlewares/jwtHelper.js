const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const client = require('../helpers/initRedis');
const User = require('../models/userModel');

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        userId,
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: process.env.JWT_ACCESS_EXPIRESIN,
        issuer: process.env.JWT_ISS,
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) return reject(createError.InternalServerError());
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        return next(createError.Forbidden(message));
      }
      req.payload = payload;

      next();
    });
  },
  authorizeRoles: (...roles) => {
    return async (req, res, next) => {
      const user = await User.findById(req.payload.userId);
      if (!roles.includes(user.role))
        return next(
          createError.Unauthorized(
            `Role ${user.role} is not allow to access this resource.`
          )
        );
      next();
    };
  },
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: process.env.JWT_REFRESH_EXPIRESIN,
        issuer: process.env.JWT_ISS,
        audience: userId,
      };
      JWT.sign(payload, secret, options, async (err, token) => {
        if (err) return reject(createError.InternalServerError());
        await client.SET(
          userId,
          token,
          { EX: 365 * 24 * 60 * 60, NX: true },
          (err, rely) => {
            if (err) reject(createError.InternalServerError());
          }
        );
        resolve(token);
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, payload) => {
          if (err) return reject(createError.Unauthorized());
          const userId = payload.aud;
          await client.GET(userId, (err, result) => {
            if (err) return reject(createError.InternalServerError());
            if (refreshToken === result) return resolve(userId);
            reject(createError.Unauthorized());
          });
          resolve(userId);
        }
      );
    });
  },
};
