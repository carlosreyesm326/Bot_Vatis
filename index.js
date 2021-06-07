const { Client, MessageEmbed } = require("discord.js");
const cliente = new Client();
const config = require("./config.json");
const comandos = require("./comandos");
const listener = require("./pasivo");
const { censura } = require("./BD.json");
const {normalizar}=require("./funciones");

censura.forEach((e) => {
  console.log(e);
});

cliente.on("ready", () => {
  console.log(`EL BOT ${cliente.user.tag} ESTA LISTO`);
  comandos(cliente, ["ping", "test"], (message) => {
    message.channel.send("pong");
  });
  listener(cliente, (msg) => {
    const embed = new MessageEmbed()
      .setColor("RED")
      .setTitle("Family Friendly")
      .setDescription(`${msg.author} ha utilizado una palabra BANEABLE`)
      .setFooter("El mensaje sera eliminado");

    msg.channel.send(embed);
    if (msg) {
      msg.delete({ timeout: 1500 });

    }
  });
  comandos(cliente, "add", (msg) => {
    const { content } = msg;
    const splt = content.split(" ");
    console.log(splt);
    splt.forEach(word => {
      if (!word.includes(">>")) {
        console.log(normalizar(word));
      }
    });
  });
});

cliente.on("message", (message) => {
  // If the message is "what is my avatar"
  if (message.content === "what is my avatar") {
    // Send the user's avatar URL
    message.reply(message.author.displayAvatarURL());
  }
});

cliente.login(config.token);
