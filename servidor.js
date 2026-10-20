const express = require('express');
const controller = require('./controllers/treinosController.js');

const app = express();
app.use(express.json());

app.get('/treinos', controller.listar);
app.get('/treinos/:id', controller.buscarUm);
app.post('/treinos', controller.criar);
app.put('/treinos/:id', controller.atualizar);
app.delete('/treinos/:id', controller.remover);

const PORTA = Number(process.env.PORT) || 3000;

function iniciarServidor(porta) {
    app.listen(porta, () => {
        console.log(`Servidor rodando em http://localhost:${porta}`);
    }).on('error', (erro) => {
        if (erro.code === 'EADDRINUSE') {
            const proximaPorta = porta + 1;
            console.log(`Porta ${porta} ocupada. Tentando ${proximaPorta}...`);
            iniciarServidor(proximaPorta);
            return;
        }

        throw erro;
    });
}

iniciarServidor(PORTA);