const handlers = ({ config, axios }) => ({
  get: async (req, res) => {
    const { data } = await axios.get(`${config.ApiBaseURL}/users`);
    return res.status(200).send(data);
  },
  post: async (req, res) => {
    const { body } = req;
    const { data } = await axios.post(`${config.ApiBaseURL}/users`, body);
    return res.status(201).send(data);
  },
  put: async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    await axios.put(`${config.ApiBaseURL}/users/${id}`, body);
    return res.sendStatus(204);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    await axios.delete(`${config.ApiBaseURL}/users/${id}`);
    res.sendStatus(204);
  },
});

module.exports = handlers;
