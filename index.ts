import express from 'express';
import routes from './src/routes/sra.routes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(3000, ()=>{
    console.log('Server up!');
})