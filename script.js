let modoRelax = false;
let tempoRestante = 30;
let intervaloTempo;

const perguntas = [
  {
    pergunta: "O que é a velocidade de uma reação química?",
    alternativas: ["A quantidade de calor liberada na reação","O tempo que os reagentes demoram para se misturar","A variação da quantidade de reagentes ou produtos por unidade de tempo",
    "A energia mínima necessária para a reação acontecer"],
    correta: 2
  },
  {
    pergunta: "Qual fator aumenta a velocidade de uma reação química?",
    alternativas: ["Diminuição da temperatura", "Presença de um catalisador", "Redução da superfície de contato", "Diminuição da concentração dos reagentes"],
    correta: 1
  },
  {
    pergunta: "O que é um catalisador?",
    alternativas: ["Uma substância que é consumida na reação", "Uma substância que aumenta a energia de ativação", "Uma substância que participa da reação e forma novos produtos", 
    " Uma substância que acelera a reação sem ser consumida"],
    correta: 3
  },
  {
    pergunta: "Aumentar a superfície de contato dos reagentes sólidos faz com que:",
    alternativas: ["A velocidade da reação aumente", "A reação seja mais lenta no início", " A velocidade da reação diminua", "A reação pare completamente"],
    correta: 0
  },
  {
    pergunta: "A temperatura influencia a velocidade da reação porque:",
    alternativas: ["Diminui a energia cinética das moléculas", "Aumenta a energia cinética e a frequência das colisões", "Faz com que os produtos se tornem reagentes", "Remove a necessidade de energia de ativação"],
    correta: 1
  },
  {
    pergunta: " Qual expressão representa corretamente a velocidade média de uma reação química?",
    alternativas: ["Δt / Δn", "Δn / Δt", "produtos – reagentes", "Energia de ativação / tempo"],
    correta: 1
  },
  {
    pergunta: " A unidade da velocidade de uma reação química depende de:",
    alternativas: ["Apenas da massa molar dos produtos", "Da constante de equilíbrio", "Da energia dos reagentes", "Da ordem da reação"],
    correta: 3
  },
  {
    pergunta: "Dada a equação elementar: 2A + B → C, qual a relação correta entre as velocidades de consumo dos reagentes?",
    alternativas: ["Vel(A) = Vel(B)", "Vel(B) = 2 × Vel(C)", "Vel(A) = 2 × Vel(B)", "Vel(A) = ½ Vel(B)"],
    correta: 2
  },
  {
    pergunta: " Em um gráfico energia x progressão da reação, a diferença entre o pico da curva e a energia dos reagentes representa:",
    alternativas: ["Energia de ativação (Ea)", "Energia dos produtos", "Entalpia da reação", "Energia do catalisador"],
    correta: 0
  },
  {
    pergunta: "A teoria das colisões afirma que uma reação ocorre quando:",
    alternativas: [" O número de moléculas for ímpar", "Os produtos possuem maior energia que os reagentes", "Os reagentes se dissolvem na água", "As moléculas colidem com orientação adequada e energia suficiente"],
    correta: 3
  },
  {
    pergunta: "Em uma reação de ordem zero, qual é a unidade da constante de velocidade (k)?",
    alternativas: ["mol·L⁻¹·min⁻¹ ", "L·mol⁻¹·s⁻¹", "mol·L⁻¹·s⁻¹ ", "s⁻¹"],
    correta: 2
  },
  {
    pergunta: "A equação da velocidade para uma reação é dada por: v = k[A]²[B]. Se a concentração de A é dobrada e a de B é triplicada, o fator pelo qual a velocidade aumenta é:",
    alternativas: ["12", "6", " 18 ", "36"],
    correta: 0
  },
  {
    pergunta: "O que representa a energia de ativação (Ea) em uma reação química?",
    alternativas: ["A energia liberada na formação dos produtos", "A energia mínima necessária para que as moléculas reajam ", "A energia total dos reagentes no estado inicial", "A energia absorvida após a reação ocorrer "],
    correta: 1
  },
  {
    pergunta: "Para uma reação elementar unimolecular, qual é a dependência da velocidade em relação à concentração do reagente?*",
    alternativas: ["Ordem três", "Ordem zero", "Ordem dois ", "Ordem um"],
    correta: 3
  },
  {
    pergunta: " O método das velocidades iniciais é utilizado para:",
    alternativas: ["Determinar os produtos da reação ", "Calcular a constante de equilíbrio", "Estimar a ordem parcial dos reagentes na reação ", " Medir o calor liberado na reação"],
    correta: 2
  }
]

let indiceAtual = 0;
let dinheiro = 0;
let acertos = 0;

const premios = [1000, 5000, 10000, 20000, 40000, 60000, 80000, 100000, 200000, 300000, 400000, 500000, 700000, 900000, 1000000];

function carregarPergunta() {
  const container = document.getElementById("pergunta-container");
  container.classList.remove("fade-in");
  container.classList.add("fade-out");

  setTimeout(() => {
    if (indiceAtual >= perguntas.length) return;

    const p = perguntas[indiceAtual];
    document.getElementById("pergunta").innerText = p.pergunta;

    const altDiv = document.getElementById("alternativas");
    altDiv.innerHTML = "";

    p.alternativas.forEach((texto, i) => {
      const btn = document.createElement("button");
      btn.innerText = texto;
      btn.onclick = () => verificarResposta(i);
      altDiv.appendChild(btn);
    });

    const mensagem = document.getElementById("mensagem");
    mensagem.innerText = "";
    mensagem.className = "oculta";

    container.classList.remove("fade-out");
    container.classList.add("fade-in");

    avatarFala(`Pergunta ${indiceAtual + 1} de ${perguntas.length}. Boa sorte!`);
    atualizarBarraProgresso();

    clearInterval(intervaloTempo);
    iniciarTimer();
  }, 300);
}

function verificarResposta(i) {
  clearInterval(intervaloTempo);
  const correta = perguntas[indiceAtual].correta;
  const botoes = document.querySelectorAll("#alternativas button");

  botoes.forEach(btn => btn.disabled = true);

  if (i === correta) {
    botoes[i].classList.add("acerto");
    dinheiro = premios[indiceAtual];
    acertos++;
    document.getElementById("mensagem").innerText = "✅ Resposta correta!";
    document.getElementById("som-acerto").play();
    document.getElementById("mensagem").className = "correta";
    avatarFala("Muito bem! Você acertou!");
    document.getElementById("pontuacao").innerText = `R$ ${dinheiro.toLocaleString("pt-BR")},00`;

    if (acertos >= 3) {
      document.getElementById("ajuda-bomba").disabled = false;
      document.getElementById("ajuda-eliminacao").disabled = false;
    }

    if (indiceAtual >= perguntas.length - 1) {
  window.location.href = "milhao.html";
  return;
}


    indiceAtual++;
    setTimeout(carregarPergunta, 1500);
    setTimeout(() => {
      document.getElementById("mensagem").classList.remove("oculta");
    }, 200);

    atualizarBarraProgresso();
  } else {
    botoes[i].classList.add("erro");
    botoes[correta].classList.add("acerto");
    document.getElementById("mensagem").innerText = "❌ Resposta errada! Fim de jogo.";
    document.getElementById("som-erro").play();
    avatarFala("Que pena! Essa você errou. Tente novamente.");
    document.getElementById("mensagem").className = "errada";
    document.getElementById("alternativas").innerHTML = "";
    document.getElementById("reiniciar").style.display = "inline-block";
  }
}

function usarAjudaBomba() {
  clearInterval(intervaloTempo);
  const correta = perguntas[indiceAtual].correta;
  const botoes = document.querySelectorAll("#alternativas button");
  const explosao = document.getElementById("explosao");

  botoes.forEach(btn => btn.disabled = true);

  document.getElementById("som-explosao").play();
  explosao.classList.remove("hidden");
  explosao.classList.add("explodir");

  setTimeout(() => {
    botoes[correta].classList.add("acerto");
    dinheiro = premios[indiceAtual];
    acertos++;
    document.getElementById("mensagem").innerText = "💥 A bomba revelou a resposta certa!";
    document.getElementById("mensagem").className = "correta";
    document.getElementById("pontuacao").innerText = `R$ ${dinheiro.toLocaleString("pt-BR")},00`;

    avatarFala("Explosão de conhecimento! Resposta revelada.");

    explosao.classList.add("hidden");
    explosao.classList.remove("explodir");

    if (indiceAtual >= perguntas.length - 1) {
  setTimeout(() => {
    window.location.href = "milhao.html";
  }, 1500);
  return;
}


    indiceAtual++;
    setTimeout(carregarPergunta, 1500);
  }, 1000);

  document.getElementById("ajuda-bomba").disabled = true;
}

function usarAjudaEliminacao() {
  const correta = perguntas[indiceAtual].correta;
  const botoes = document.querySelectorAll("#alternativas button");

  let eliminadas = 0;
  for (let i = 0; i < botoes.length; i++) {
    if (i !== correta && eliminadas < 2) {
      botoes[i].disabled = true;
      botoes[i].style.opacity = "0.5";
      eliminadas++;
    }
  }
  avatarFala("Duas alternativas foram eliminadas. Escolha com sabedoria!");
  document.getElementById("ajuda-eliminacao").disabled = true;
}

function reiniciarJogo() {
  indiceAtual = 0;
  dinheiro = 0;
  acertos = 0;

  document.getElementById("ajuda-bomba").disabled = true;
  document.getElementById("ajuda-eliminacao").disabled = true;
  document.getElementById("pontuacao").innerText = "R$ 0,00";
  document.getElementById("mensagem").innerText = "";
  document.getElementById("reiniciar").style.display = "none";
  document.querySelector(".container").style.display = "block";
  document.getElementById("tela-vitoria").style.display = "none";
  document.getElementById("musica-relax").pause();
  document.getElementById("musica-relax").currentTime = 0;

  clearInterval(intervaloTempo);
  tempoRestante = 30;
  atualizarBarraTempo();
  atualizarBarraProgresso();

  carregarPergunta();
}

function atualizarBarraProgresso() {
  const porcentagem = Math.floor((indiceAtual / perguntas.length) * 100);
  document.getElementById("barra-progresso").style.width = `${porcentagem}%`;
  document.getElementById("texto-progresso").innerText = `${indiceAtual} / ${perguntas.length}`;
}

function avatarFala(mensagem) {
  document.getElementById("avatar-fala").innerText = mensagem;
}

function iniciarTimer() {
  if (modoRelax) {
    document.getElementById("contador-tempo").innerText = "∞";
    document.getElementById("barra-tempo").style.width = "100%";
    return;
  }

  tempoRestante = 30;
  atualizarBarraTempo();

  intervaloTempo = setInterval(() => {
    tempoRestante--;
    atualizarBarraTempo();

    if (tempoRestante <= 0) {
      clearInterval(intervaloTempo);
      tempoEsgotado();
    }
  }, 1000);
}

function atualizarBarraTempo() {
  const porcentagem = (tempoRestante / 20) * 100;
  document.getElementById("barra-tempo").style.width = `${porcentagem}%`;
  document.getElementById("contador-tempo").innerText = `${tempoRestante}s`;
}

function tempoEsgotado() {
  const botoes = document.querySelectorAll("#alternativas button");
  botoes.forEach(btn => btn.disabled = true);

  document.getElementById("mensagem").innerText = "⏰ Tempo esgotado! Fim de jogo.";
  document.getElementById("mensagem").className = "errada";
  avatarFala("Você deixou o tempo acabar! Tente novamente.");
  document.getElementById("ajuda-bomba").disabled = true;
  document.getElementById("ajuda-eliminacao").disabled = true;
  document.getElementById("reiniciar").style.display = "inline-block";
}

function alternarModoRelax() {
  modoRelax = !modoRelax;

  const botao = document.getElementById("btn-relax");
  const timerContainer = document.getElementById("timer-container");
  const musicaRelax = document.getElementById("musica-relax");

  if (modoRelax) {
    botao.innerText = "⏱️ Desativar modo relax";
    avatarFala("Modo relax ativado. Respire fundo e jogue sem pressa.");
    timerContainer.style.display = "none";
    musicaRelax.volume = 0.5;
    musicaRelax.play();
  } else {
    botao.innerText = "🌙 Ativar modo relax";
    avatarFala("Modo relax desativado. O tempo voltou!");
    timerContainer.style.display = "block";
    musicaRelax.pause();
    musicaRelax.currentTime = 0;
  }
}
function voltarParaInicio() {
  window.location.href = "capa.html";
}

// Inicia o jogo
carregarPergunta();
