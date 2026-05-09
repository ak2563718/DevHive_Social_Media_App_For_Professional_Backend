import express from 'express';
import 'dotenv/config';
import user from './routes/userRoutes.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api',user)
const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})