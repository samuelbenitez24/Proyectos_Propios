const server=require('../src/server')
const conexion=require("../src/data/conexion");
const app = require("../src/app");
const supertest = require("supertest");
const User = require("../src/models/user_models");
const request=supertest(app);
const { expect, should } = require("chai");

describe('Post/Users',()=>{

    before(async ()=>{
        await User.deleteMany({});
    });
     

    it('Create New User', (done)=>{

        let data={
            usuario:"testMain1",
            nombre:"samuel",
            apellido:"benitez",
            email:"perroraza@gmail.com",
            telefono:"4353dada43sdasdds4543645",
            direccion:["judasdan antonio hello  3434"],
            password:"435dasd34534534",
            roles:["admin","user"]
        }


        request
        .post("/api/users/createUser")
        .send(data)
        .end((err,res)=>{
            if(err) done(err)

            expect(res.status).to.equal(200);
            
            done()
        });
        
        

        
      
    })

    it('existing user', (done)=>{

        let data={
            usuario:"testMain1",
            nombre:"samuel",
            apellido:"benitez",
            email:"perroraza@gmail.com",
            telefono:"4353dada43sdasdds4543645",
            direccion:["judasdan antonio hello  3434"],
            password:"435dasd34534534",
            roles:["admin","user"]
        }


        request
        .post("/api/users/createUser")
        .send(data)
        .end((err,res)=>{

            if(err) done(err)

            expect(res.status).to.equal(400);

            done()

        });  
      
    })

    it('configure user role automatically if there is no role', (done)=>{

        let data={
            usuario:"test58",
            nombre:"samuel",
            apellido:"benitez",
            email:"test@gmail.com",
            telefono:"4353dadasdasddsrer4543645",
            direccion:["judasdan antonio hello  3434"],
            password:"435dasd34534534"
        }


        request
        .post("/api/users/createUser")
        .send(data)
        .end((err,res)=>{

            if(err) done(err)

            expect(res.status).to.equal(200);
            
            done()

        });
        
        

        
      
    })

    it ("Failed to register new user", (done)=>{
        let data={}

        request
        .post("/api/users/createUser")
        .send(data)
        .end((err,res)=>{
            
            if(err) done(err)

            expect(res.status).to.equal(400);

            done()
        })
        
        
    });

   
})




