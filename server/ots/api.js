const axios = require("axios");
const url = require("url");
const invariant = require("invariant");

const otsUsername = "23a659ba@opayq.com";
const apiToken = "09571e2e1224dcd22a24ebd302128970d7523a12";

const apiClient = axios.create({
  baseURL: "https://onetimesecret.com/api/v1/",
  auth: {
    username: otsUsername,
    password: apiToken
  }
});

function getOtsUrl({ secret, passphrase, ttl = 120 }) {
  invariant(
    secret && passphrase,
    "You forgot to pass a valid secret or a passphrase!"
  );

  return apiClient
    .post("share", null, {
      params: {
        secret,
        passphrase,
        ttl
      }
    })
    .then(({ data }) => {
      return url.format({
        protocol: "https",
        hostname: "onetimesecret.com",
        pathname: `secret/${data.secret_key}`
      });
    })
    .catch(err => {
      console.error("ERROR", err);
    });
}

module.exports = { getOtsUrl };
