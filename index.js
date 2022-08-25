const express = require("express");
const axios = require("axios");
const config = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/", async (req, res) => {
  const { data } = await axios.get(`${config.ApiBaseURL}/users`);
  return res.status(200).send(data);
});

app.post("/", async (req, res) => {
  const { body } = req;
  const { data } = await axios.post(`${config.ApiBaseURL}/users`, body);
  return res.status(201).send(data);
});

app.put("/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const { data } = await axios.put(`${config.ApiBaseURL}/users/${id}`, body);
  return res.sendStatus(204);
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await axios.delete(`${config.ApiBaseURL}/users/${id}`);
  res.sendStatus(204);
});

app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`);
});
