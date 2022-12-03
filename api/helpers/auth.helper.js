const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("../config/config");

const accessTokenExpireTime =  50 * 60 * 1000; // 50 minutes

module.exports = {
  generateToken,
  generateRandomSalt,
  setTokenCookie,
  generateResetToken,
  validatePassword,
  getResetPasswordLink,
};

function generateToken(user) {
  const { password, permissions, ...userInfo } = user;
  return jwt.sign(
    userInfo,
    config.jwtSecret
    // { expiresIn: accessTokenExpireTime }
  );
}

function setTokenCookie(res, token) {
  return setCookie(res, "access", token, {
    maxAge: accessTokenExpireTime,
    httpOnly: true,
  });
}

function setCookie(res, cookieId, token, options) {
  res.cookie(cookieId, token, options);
  return true;
}
// function setCloudFrontSignedCookie(res) {

//   const AWS = require("aws-sdk");
//   const privateKey = Buffer.from(process.env.PRIVATE_KEY, "base64");
//   const publicKey = Buffer.from(process.env.PUBLIC_KEY, "base64");
//   const cloudFront = new AWS.CloudFront.Signer(publicKey, privateKey);
//   const policy = JSON.stringify({
//     Statement: [
//       {
//         Resource: "http*://du1jzqmqkepz6.cloudfront.net/*", // http* => http and https
//         Condition: {
//           DateLessThan: {
//             "AWS:EpochTime":
//               Math.floor(new Date().getTime() / 1000) + 60 * 60 * 1, // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
//           },
//         },
//       },
//     ],
//   });
//   const cookie = cloudFront.getSignedCookie({
//     policy,
//   });
//   console.log(cookie);
//   res.cookie('CloudFront-Key-Pair-Id', cookie['CloudFront-Key-Pair-Id'], {  httpOnly: true });
//   res.cookie('CloudFront-Policy', cookie['CloudFront-Policy'], {  httpOnly: true });
//   res.cookie('CloudFront-Signature', cookie['CloudFront-Signature'], {  httpOnly: true });
//   return true;
// }

function generateRandomSalt() {
  return crypto.randomBytes(48).toString("hex");
}
function generateResetToken(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function validatePassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/.test(
    password
  );
}
function getResetPasswordLink(token, type) {
  console.log("base url is",config.appBaseUrl)
  return `${config.appBaseUrl}/${type}?token=${token}`;
}
