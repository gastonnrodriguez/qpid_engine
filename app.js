const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
dotenv.config({ path: "./config/config.env" });
const { auth, requiresAuth } = require("express-openid-connect");

const app = express();

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

//test routes
app.get("/", (req, res) =>
  res.send(req.oidc.isAuthenticated() ? "logueado" : "vaya a loguearse")
);

app.get("/profile", requiresAuth(),(req, res) => {
res.send(JSON.stringify(req.oidc.user));
});

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.PORT}`.bgGreen.bold)
);
