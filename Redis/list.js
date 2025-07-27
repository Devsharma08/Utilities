const redis  = require('ioredis')
const client = new redis();


async function fun(){
try {
    // const var1 = await client.lpush('list:1',['newUser:devsharma','newUser1:A','newUser2:B']);
    // const var1 = await client.lpop('list:1');
    // const var1 = await client.lrange('list:1',0,-1);
    // const val = await client.rpush('list:1',['bike:1','bike:2','bike:3','bike:4','bike:5'])
    // const var1 = await client.ltrim('list:1',-3,-1);
    const var2 = await client.lrange('list:1',0,-1);
    // console.log(val);
    console.log(var1);
    console.log(var2);


} catch (error) {
    throw error;
}

}

fun();
