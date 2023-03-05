import express from "express";
import {createUser,getUserByName} from "./helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

async function genHashedPassword(password){
    const NO_OF_ROUNDS=10;
    const salt=await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword=await bcrypt.hash(password,salt);
   return hashedPassword;
}

router.post("/signup", async function (request, response) {
    const {username,password} = request.body;
    //db.movies.insertOne(data);
    const userFromDB= await getUserByName(username);
    console.log(userFromDB);

    if(userFromDB){
        response.status(400).send({message:"This Username already Exists"});
    }
    else if(password.length<8){
        response.status(400).send({message:"Password must be atleast 8 characters"});
    }
    else{
    const hashedPassword=await genHashedPassword(password);
    console.log(hashedPassword);

     const result = await createUser({
        username:username,
        password:hashedPassword
     });
     response.send(result);
     }
});
 
router.post("/login", async function (request, response) {
    const {username,password} = request.body;
    //db.movies.insertMany(data);
    const userFromDB = await getUserByName(username);
    console.log(userFromDB);

    if(!userFromDB){
        response.status(401).send({message:"Invalid Credentials"});
    } else{
        const storedPassword=userFromDB.password;
       const isPasswordMatch=await bcrypt.compare(password,storedPassword);
        console.log(isPasswordMatch);
       if(isPasswordMatch){

            const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);

        response.send({message:"Successfully Login",token:token});
                          }
         else{
           response.status(401).send({message:"Invalid Credentials"});
               } 
       }
    });

export const usersRouter = router;


