const {Token_firma}=require('../config/ENV');
const jwt=require('jsonwebtoken');
const User=require('../models/user_models');
const roles=require('../models/roles');
exports.autenticarUsaurio=(req,res,next)=>{

    try {
        const token=req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.json({
                auth:false,
                msg:"not fount token"
            });
            
        }

        const verificarToken=jwt.verify(token,process.env.TOKEN_FIRMA);
        
        if (verificarToken) {
            req.id=verificarToken.id;
            next();
            
        }else{
            res.json('error en el login ');
        }

    } catch (error) {
        res.status(401).json({error_m:"error a auntenticar usuario"});

        
    }    

}
exports.isAdmin= (req,res,next)=>{
    User.findById(req.id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    roles.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });

}

exports.isModerator= (req,res,next)=>{

    User.findById(req.id).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
    
        roles.find(
          {
            _id: { $in: user.roles }
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
    
            for (let i = 0; i < roles.length; i++) {
              if (roles[i].name === "moderator") {
                next();
                return;
              }
            }
    
            res.status(403).send({ message: "Require Moderator Role!" });
            return;
          }
        );
      });


}