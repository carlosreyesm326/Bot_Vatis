const { censura, prefixTuManga } = require("./BD.json");
const { normalizar } = require("./funciones");

module.exports = (cliente, index, callback) => {
  cliente.on("message", (msg) => {
    const { content } = msg;
    normalizada = normalizar(content);

    if (index === "Banwords") {
      if (censura.some((word) => normalizada.includes(word))) {
        callback(msg);
      }
    } else if (index === "manga") {
        if (prefixTuManga.some((word) => normalizada.includes(word))) {
            callback(msg);
          }
    }
  });
};
