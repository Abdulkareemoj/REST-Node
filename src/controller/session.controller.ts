import { validatePassword } from "../service/user.service";
import { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config({ path: '../../config/.env' });
 import { createSession, createAccessToken } from "../service/"
export async function createUserSessionHandler(res:Request, req:Response){
  
const refreshtoken = process.env.REFRESHTOKEN as string


    //Validate the email and password
const user = await validatePassword(req.body)
if (user){
    return res.status(401).send("Invalid username or password")
}

    //Create a session
const session = await createSession(user._id, req.get("user-agent") || "")

    //Create access token

const accessToken = createAccessToken({
    user,
    session,
})
    //Create refresh token

const refreshToken =sign(session,{
    expiresIn: process.env.refreshtoken //1 year
})

    //Send access and refresh token back
    return res.send({accessToken, refreshToken})
}