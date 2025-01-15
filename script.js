// Inicializar saldo e cooldown com valores armazenados
let saldo = localStorage.getItem('saldo') ? parseInt(localStorage.getItem('saldo')) : 0;
let cooldown = localStorage.getItem('cooldown') ? parseInt(localStorage.getItem('cooldown')) : 0;

const saldoElemento = document.getElementById('saldo');
const resgatarButton = document.getElementById('resgatar-button');
const cooldownMsg = document.getElementById('cooldown-msg');

// Atualizar saldo no texto
saldoElemento.textContent = `Saldo: ${saldo} moedas`;

// Função para verificar cooldown
function checkCooldown() {
  const now = Date.now();
  if (cooldown > now) {
    const timeRemaining = cooldown - now;
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    resgatarButton.disabled = true;
    cooldownMsg.textContent = `Você já resgatou hoje! Tente novamente em ${hours}h e ${minutes}m.`;
    cooldownMsg.classList.remove('cooldown-hidden');
  } else {
    resgatarButton.disabled = false;
    cooldownMsg.classList.add('cooldown-hidden');
  }
}

// Ação de clique no botão
resgatarButton.addEventListener('click', () => {
  const now = Date.now();
  const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
  cooldown = now + cooldownPeriod;

  saldo += 550; // Adiciona moedas ao saldo
  localStorage.setItem('saldo', saldo); // Salva saldo no localStorage
  localStorage.setItem('cooldown', cooldown); // Salva cooldown no localStorage

  saldoElemento.textContent = `Saldo: ${saldo} moedas`; // Atualiza texto do saldo
  alert('Você resgatou 550 moedas!');
  checkCooldown();
});

// Verifica cooldown ao carregar a página
checkCooldown();

// Atualiza o tempo restante a cada minuto para manter o usuário informado
setInterval(checkCooldown, 60000); // Atualização a cada 60 segundos
