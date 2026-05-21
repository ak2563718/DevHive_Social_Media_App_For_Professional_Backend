import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secretkey = process.env.SECRET_KEY;

export const accessToken = (user)=>{
   return jwt.sign({
        id:user.id,
        email:user.email,
        username:user.username,
    },secretkey, { expiresIn:"15m" })
}

export const refreshToken = (user)=>{
  return  jwt.sign({
        id:user.id,
        email:user.email,
    },secretkey, { expiresIn:"7d" })
}


export const decodeaccessToken = (token)=>{
    const decode = jwt.verify(token, secretkey)
    return decode;
}

export const decodeRefreshToken = (token)=>{
    const decode = jwt.verify(token,secretkey)
    return decode;
}
