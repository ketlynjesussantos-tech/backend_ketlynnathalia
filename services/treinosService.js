const repository = require('../repositories/treinosRepository.js');

function validarTreino(corpo) {
    if (corpo === null || corpo === undefined || typeof corpo !== 'object') {
        return 'O corpo da requisicao e obrigatorio.';
    }

    if (typeof corpo.nome !== 'string' || corpo.nome.trim() === '') {
        return 'O campo nome e obrigatorio e deve ser um texto.';
    }

    const duracao = Number(corpo.duracao);
    if (!Number.isFinite(duracao) || duracao <= 0 || duracao > 180) {
        return 'O campo duracao e obrigatorio e deve ser um numero maior que zero e menor que 180.';
    }

    return null;
}

function listarTodos() {
    return repository.listarTodos();
}

function buscarPorId(id) {
    return repository.buscarPorId(id);
}

function criarTreino(corpo) {
    const erro = validarTreino(corpo);
    if (erro !== null) return { erro: erro };
    const novo = repository.criar(corpo.nome, Number(corpo.duracao));
    return { treino: novo };
}

function atualizarTreino(id, corpo) {
    const existente = repository.buscarPorId(id);
    if (existente === undefined) return { naoEncontrado: true };
    const erro = validarTreino(corpo);
    if (erro !== null) return { erro: erro };
    const atualizado = repository.atualizar(id, corpo.nome, Number(corpo.duracao));
    return { treino: atualizado };
}

function removerTreino(id) {
    const existente = repository.buscarPorId(id);
    if (existente === undefined) return { naoEncontrado: true };
    repository.remover(id);
    return { removido: true };
}

module.exports = {
    listarTodos,
    buscarPorId,
    criarTreino,
    atualizarTreino,
    removerTreino,
};