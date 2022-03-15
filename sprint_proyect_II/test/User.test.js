const app = require("../src/server");
const supertest = require("supertest");
const User = require("../src/models/user_models");
const request=supertest(app);
const mongoose=require("../src/data/conexion");
const { expect } = require("chai");

describe('Post/Users',()=>{

    before(async ()=>{
        await User.remove({});
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

            const datos = res.body;

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

            const datos = res.body;

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

            const datos = res.body;

            expect(res.status).to.equal(200);
            done()

        });
        
        

        
      
    })

    it ("Failed to register new user", (done)=>{
        let data={
            usuario:"test45",
            apellido:"benitez",
            email:"apostoles@gmail.com",
            telefono: "566756",
            direccion:["judasdan antonio hello  3434"],
            password:"435dasd34534534",
            roles:["admin","user"]
        }


        request
        .post("/api/users/createUser")
        .send(data)
        .end((err,res)=>{
            
            if(err) done(err)

            const datos = res.body;

            expect(res.status).to.equal(400);

            done()
        })
        
        
    });

   
})




