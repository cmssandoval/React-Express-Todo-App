import express from 'express';
const app = express();
const port = 5000;

app.listen(port, () => {
    console.log(`¡Servidor encendido! Escuchando el puerto ${port}`);
    console.log(`Ir a http://localhost:${port}`);
});

app.get('/', (req,res) => {
    res.json({message: "Hello World!"});
});