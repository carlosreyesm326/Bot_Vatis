const discord =  require("discord.js");
const cliente = new discord.Client();
const config = require("./config.json")
const comandos = require("./comandos")


cliente.on("ready",()=>{
    console.log(`EL BOT ${cliente.user.tag} ESTA LISTO`);
    comandos(cliente,"ping",(message)=>{
        message.channel.send("pong")
    })
})

cliente.on('message', message => {
    // If the message is "what is my avatar"
    if (message.content === 'what is my avatar') {
      // Send the user's avatar URL
      message.reply(message.author.displayAvatarURL());
    }
  });

cliente.login(config.token)