const { censura } = require("./BD.json");
const { normalizar } = require("./funciones");

module.exports = (cliente, callback) => {
  cliente.on("message", (msg) => {
    const { content } = msg;
    normalizada = normalizar(content);
    if (censura.some((word) => normalizada.includes(word))) {
      callback(msg);
    }
  });
};
