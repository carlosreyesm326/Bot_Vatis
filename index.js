  const { Client, MessageEmbed } = require("discord.js");
  const cliente = new Client();
  const config = require("./config.json");
  const comandos = require("./comandos");
  const listener = require("./pasivo");
  const { censura } = require("./BD.json");
  const { normalizar } = require("./funciones");

  censura.forEach((e) => {
    console.log(e);
  });

  cliente.on("ready", () => {
    console.log(`EL BOT ${cliente.user.tag} ESTA LISTO`);
    cliente.user.setPresence({
      status:"online",
      activity:{
        name:"help | crater",
        type:"LISTENING"
      }
    })
  });

  comandos(cliente, ["ping", "test"], (message) => {
    message.channel.send("pong");
  });
  listener(cliente, "Banwords", (msg) => {
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
    splt.forEach((word) => {
      if (!word.includes(">>")) {
        console.log(normalizar(word));
      }
    });
  });

  comandos(cliente, "status", (msg)=>{
    const statusG = cliente.user.presence.status==="online"? `💚 ${cliente.user.presence.status}`:`🧡 ${cliente.user.presence.status}`

    const emb = new MessageEmbed()
    .setTitle("My Status")
      .setColor(0xae70c2)
      .setDescription("Soy Berú-chan (✿◠‿◠)  \n Un bot diseñado para complacerte, Nya!!!")
      .setFooter("\xA9 Copyright 2021 - CarlosReyesM ")
      .setThumbnail("https://i.imgur.com/9tWjjr6.jpg")
      .setTimestamp()
      .setURL("https://github.com/CraterMaik")
      .addField("Nombre de usuario",cliente.user.tag,true)
      .addFields({name:" Estado", value:statusG, inline:true})
        msg.channel.send(emb)
  })

  listener(cliente, "manga", (msg) => {
  
    if (msg.channel.id !== "779860119948361778") {
      const embed = new MessageEmbed()
        .setColor("YELLOW")
        .setTitle("Advertencia")
        .setDescription(`${msg.author} envie sus porquerias donde se debe`)
        .setFooter("Moviendo mensaje...");

      msg.channel.send(embed);
      const reply = `${msg.author} envió este manga al canal <#${msg.channel.name}> \n  ${msg.content}`
      cliente.channels.cache.get("779860119948361778").send(reply)
      if (msg) {
        msg.delete({ timeout: 1500 });
      }
    }
    
  console.log(msg.channel.id);
  });

  cliente.on("message", (message) => {
    // If the message is "what is my avatar"
    if (message.content === "what is my avatar") {
      // Send the user's avatar URL
      message.reply(message.author.displayAvatarURL());
    }
  });

  cliente.login(config.token);
