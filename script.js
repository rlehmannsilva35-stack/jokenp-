const opcoesValidas = ['pedra', 'papel', 'tesoura'];

const icones = {
  pedra: '✊',
  papel: '✋',
  tesoura: '✌️'
};

let pontosUsuario = 0;
let pontosComputador = 0;

const botoesOpcao = document.querySelectorAll('.btn-opcao');
const btnReiniciar = document.getElementById('btn-reiniciar');
const maoUsuario = document.getElementById('mao-usuario');
const maoComputador = document.getElementById('mao-computador');
const textoUsuario = document.getElementById('texto-usuario');
const textoComputador = document.getElementById('texto-computador');
const campoResultado = document.getElementById('resultado');
const placarUsuarioEl = document.getElementById('pontos-usuario');
const placarComputadorEl = document.getElementById('pontos-computador');

function gerarEscolhaComputador() {
  const indice = Math.floor(Math.random() * opcoesValidas.length);
  return opcoesValidas[indice];
}

function verificarVencedor(usuario, computador) {
  if (usuario === computador) {
    return 'empate';
  }

  const usuarioVenceu =
    (usuario === 'pedra' && computador === 'tesoura') ||
    (usuario === 'papel' && computador === 'pedra') ||
    (usuario === 'tesoura' && computador === 'papel');

  return usuarioVenceu ? 'vitoria' : 'derrota';
}

function aplicarAnimacao(elemento, classeAnimacao) {
  elemento.classList.remove(classeAnimacao);
  void elemento.offsetWidth; // Força o reflow para reiniciar a animação
  elemento.classList.add(classeAnimacao);
}

function jogar(escolhaUsuario) {
  const escolhaComputador = gerarEscolhaComputador();
  const status = verificarVencedor(escolhaUsuario, escolhaComputador);

  maoUsuario.textContent = icones[escolhaUsuario];
  textoUsuario.textContent = escolhaUsuario;

  maoComputador.textContent = icones[escolhaComputador];
  textoComputador.textContent = escolhaComputador;

  aplicarAnimacao(maoUsuario, 'animar-escolha');
  aplicarAnimacao(maoComputador, 'animar-escolha');

  campoResultado.className = `resultado ${status}`;

  if (status === 'vitoria') {
    pontosUsuario++;
    placarUsuarioEl.textContent = pontosUsuario;
    campoResultado.textContent = `Você venceu! ${escolhaUsuario.toUpperCase()} ganha de ${escolhaComputador.toUpperCase()}.`;
  } else if (status === 'derrota') {
    pontosComputador++;
    placarComputadorEl.textContent = pontosComputador;
    campoResultado.textContent = `Você perdeu! ${escolhaComputador.toUpperCase()} ganha de ${escolhaUsuario.toUpperCase()}.`;
  } else {
    campoResultado.textContent = `Empate! Ambos escolheram ${escolhaUsuario.toUpperCase()}.`;
  }

  aplicarAnimacao(campoResultado, 'animar-resultado');
}

function reiniciarJogo() {
  pontosUsuario = 0;
  pontosComputador = 0;

  placarUsuarioEl.textContent = '0';
  placarComputadorEl.textContent = '0';

  maoUsuario.textContent = '❔';
  maoComputador.textContent = '❔';
  textoUsuario.textContent = 'Aguardando...';
  textoComputador.textContent = 'Aguardando...';

  campoResultado.className = 'resultado neutro';
  campoResultado.textContent = 'Jogo reiniciado! Faça sua jogada.';
}

botoesOpcao.forEach((botao) => {
  botao.addEventListener('click', () => {
    const escolha = botao.dataset.escolha;
    jogar(escolha);
  });
});

[maoUsuario, maoComputador].forEach((elemento) => {
  elemento.addEventListener('animationend', () => {
    elemento.classList.remove('animar-escolha');
  });
});

btnReiniciar.addEventListener('click', reiniciarJogo);