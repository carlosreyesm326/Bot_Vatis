const {prefix}= require("./config.json")


module.exports=(cliente,aliases,callback)=>{
    if(typeof aliases==="string"){
        aliases=[aliases]
    }

    cliente.on("message", msg=>{
    const {content}=msg;
    aliases.forEach(alias => {
        const comando=`${prefix}${alias}`
        if(content.startsWith(`${comando} `)|| content===comando){
            console.log(`running the command ${comando}`);
            callback(msg)
        }
    });
})
}