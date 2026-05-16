import express from 'express';
import 'dotenv/config';
import user from './routes/user.Routes.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import Community from './routes/community.Routes.js'
import Post from './routes/post.Route.js'
import Comment from './routes/comment.Route.js'
import Votes from './routes/vote.Routes.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/api',user)
app.use('/api',Community)
app.use('/api',Post)
app.use('/api',Comment)
app.use('/api',Votes)
const port = process.env.PORT || 5000;

app.use(errorMiddleware)
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})