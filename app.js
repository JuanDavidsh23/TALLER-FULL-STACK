import express from 'express';
import apiRoutes from './routes/apiRoutes.js';


const app = express();

app.use(express.json());
app.use(apiRoutes);
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});