module.exports = ({ config, axios }) => ({
  post: async (req, res) => {
    const { data: users } = await axios.get(`${config.ApiBaseURL}/users`);
    const found = users.find((x) => x.id === req.body.userId);

    if (found) {
      const { data } = await axios.post(`${config.ApiBaseURL}/posts`, req.body);
      return res.status(201).send(data);
    }
    return res.sendStatus(400);
  },
});
