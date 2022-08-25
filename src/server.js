const express = require("express");
const axios = require("axios");
const config = require("../config");
const { users } = require("./endpoints");

const app = express();

// Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlers
const usersHandlers = users({ config, axios });

// Users routes
app.get("/", usersHandlers.get);
app.post("/", usersHandlers.post);
app.put("/:id", usersHandlers.put);
app.delete("/:id", usersHandlers.delete);

module.exports = app;
