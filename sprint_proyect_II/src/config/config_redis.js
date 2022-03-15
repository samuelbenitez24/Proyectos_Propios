const redis=require('redis');



const client = redis.createClient({
    host: process.env.HOST,
    port: process.env.PORT_REDIS
});



client.on("error",(error)=>{
    console.error(error);
})



module.exports=client;