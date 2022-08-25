const config = require("./config");
const server = require("./src/server");

server.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`);
});
