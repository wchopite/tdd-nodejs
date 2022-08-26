const express = require("express");
const config = require("../config");
const { users, posts } = require("./api/handlers");
const { autheticate } = require("./api/middlewares");
const services = require("./api/services");

const app = express();

// Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlers
const usersHandlers = users({ config, ...services });
const postsHandlers = posts({ config, ...services });

// Users routes
app.get("/", usersHandlers.get);
app.post("/", usersHandlers.post);
app.put("/:id", usersHandlers.put);
app.delete("/:id", usersHandlers.delete);

// Posts routes (with TDD)
app.post("/posts", autheticate, postsHandlers.post);

module.exports = app;
