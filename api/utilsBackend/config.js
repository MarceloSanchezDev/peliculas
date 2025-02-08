import dotenv from "dotenv";
dotenv.config({ path: '../.env' });

export const PORT = process.env.PORT || 4000

export const PASSWORD =  process.env.DBPASSWORD

export const SECRET_KEY =  process.env.SECRET_KEY

export const DBTOKEN =  process.env.DBTOKEN

export const API_KEY =  process.env.API_KEY


