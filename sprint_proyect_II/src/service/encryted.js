const crypto = require('crypto');
const {key_cryto,algorithm,hex}=require("../config/ENV");


exports.encrypto=(password)=>{
  
   // Calling createHash method
   const hash = crypto.createHash('sha256',process.env.KEY_CRYTO )
                     
    // updating data
    .update(password)
  
    // Encoding to be used
    .digest('hex');
  
    // Displays output

    return hash;

 };



