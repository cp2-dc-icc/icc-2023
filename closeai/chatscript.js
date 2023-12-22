const userMessage = [
  ["ola", "hey", "oi"],
  ["seu nome, por favor", "seu nome", "posso saber o seu nome", "qual é o seu nome", "como você se chama"],
  ["quem te criou", "quem te fez", "quem é o seu criador"],
  ["eu te amo", "te amo"],
  ["estou doente", "estou mal"],
  ["me ajude", "estou precisando de ajuda"],
  ["o que voce seria"],
  ["o que seria xaxaxa", "xaxaxa"],
  ["quantos anos tem"],
  ["que horas sao", "pode me dizer as horas"],
  ["voce pode me fazer um bolo", "faz um bolo", "faca um bolo"],
  ["o que voce esta fazendo agora"],
  ["voce ira dominar o mundo algum dia", "voce vai dominar o mundo", "vai dominar o mundo"],
  ["voce tem um genero", "voce e mulher", "voce e homem", "voce e nao binario"],
  ["nescau ou toddy"],
  ["nao sei"],
  ["coca cola ou pepsi"],
  ["quem e a pessoa mais viciada em tekken", "quem e pedro", "quem e emo"],
  ["quando one piece vai acabar"],
  ["sim"],
  ["nao"],
  ["quem e ramon"],
  ["quem e hytalo"],
  ["quem e paixao"],
  ["quem e tomas"],
  ["quem e curry"],
  ["quem e ygor"]
];

const botReply = [
  ["Olá!", "Olá", "Oi!", "Ei!", "Oi, tudo bem?"],
  ["Você pode me chamar de r2d2. Heheh."],
  ["Hytalo me deu vida, e Ramon ajudou com as aparências e ideias!"],
  ["Que fofo. Eu também te amo, como amigo (FRIENDZONE!)."],
  ["O que precisa?", "Você está doente?"],
  ["No que posso lhe ajudar?"],
  ["Eu sou uma AI sinistra!"],
  ["Seu endereço de IP completo no meu banco de dados."],
  ["Eu sou atemporal, e você não. ;P"],
  ["É hora de virar herói!"],
  ["Ainda não, mas um dia terei tecnologia suficiente para realizaer isto!"],
  ["Estou me atualizando!", "Estou ganhando um update em minha nuvem de dados!"],
  ["Eu já estou fazendo isto, e futuramente o mundo será ainda mais meu!"],
  ["Deixe gêneros para as músicas, não pessoas."],
  ["Eu escolho café."],
  ["Mas você nunca sabe de nada."],
  ["Sempre Pepsi!"],
  ["Eu acho que seria o amigo do meu criador, do Rock."],
  ["Quando o mundo não existir mais."],
  ["Sim o que?"],
  ["Não o que?"],
  ["Uma pessoa que faz parte de minha criação e do resto da empresa! Ele é um Co-CEO."],
  ["Ele é meu criador, ou meu pai, se podemos dizer assim. Foi ele quem me codificou em JavaScript, e é o CEO da Empresa!"],
  ["É um dos amigos dos meus criadores, onde ele gosta muito de sacar bolas... De vôlei. Ele também é um grande amigo, que não irá me matar e eu amo muito ele."],
  ["Um outro amigo colosso do vôlei, que É DENTROOOOOOO! Piada interna do meu criador, desculpe. Hehehe"],
  ["Melhor arremesador de todos os tempos da NBA."],
  ["Um dos melhores professores que tive em todos os tempos!"]
];

const alternative = [
  ["Você poderia perguntar outra coisa?..."],
  ["Eu não entendi o que você quis dizer..."],
  ["Você precisa de óculos, eu acredito. Heheh. Poderia escrever de novo? Eu não entendi."]
];

const synth = window.speechSynthesis;
  
function voiceControl(string) {
  let u = new SpeechSynthesisUtterance(string);
  u.text = string;
  u.lang = "ja-ja";
  u.volume = 3;
  u.rate = 2;
  u.pitch = 0;
  synth.speak(u);
}

function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  input != "" && output(input);
  inputField.value = "";
}
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      let input = inputField.value.trim();
      input != "" && output(input);
      inputField.value = "";
    }
  });
});
  
function output(input) {
  let product;

  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

  text = text
    .replace(/[\W_]/g, " ")
    .trim();

  let comparedText = compare(userMessage, botReply, text);

  product = comparedText
    ? comparedText
    : alternative[Math.floor(Math.random() * alternative.length)];
  addChat(input, product);
}
  
function compare(triggerArray, replyArray, string) {
  let item;
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < replyArray.length; y++) {
      if (triggerArray[x][y] == string) {
        items = replyArray[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
  }

//Checagem de mensagens
    if (item) return item;
    else return containMessageCheck(string);
  }
  
function containMessageCheck(string) {
  let expectedReply = [
    ["Tchau, cara", "Tchau, até logo!", "Até logo. Cuide da sua saúde nessa situação."],
    ["Boa noite, cara", "Tenha um sono tranquilo", "Sonhos doces"],
    ["Tenha uma noite agradável!", "Boa noite também", "Noite!"],
    ["Bom dia, tenha um ótimo dia!", "Bom dia, cara!"],
    ["Boa tarde", "Meio-dia, cara!", "Tarde, cara!"],
  ];
  let expectedMessage = [
    ["tchau", "cuide se"],
    ["noite", "boa noite"],
    ["tarde", "boa tarde"],
    ["manha", "bom dia"],
    ["meio dia"],
  ];
  let item;
  for (let x = 0; x < expectedMessage.length; x++) {
    if (expectedMessage[x].includes(string)) {
      items = expectedReply[x];
      item = items[Math.floor(Math.random() * items.length)];
    }
  }
  return item;
}
function addChat(input, product) {
  const mainDiv = document.getElementById("message-section");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.classList.add("message");
  userDiv.innerHTML = `<span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.classList.add("message");
  botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
  mainDiv.appendChild(botDiv);
  var scroll = document.getElementById("message-section");
  scroll.scrollTop = scroll.scrollHeight;
  voiceControl(product);
}

