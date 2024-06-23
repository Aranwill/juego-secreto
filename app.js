var numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMax = 10;
let intentosMax = 5;

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

function verificarIntento() {
  let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

  if (numeroSecreto === numeroDeUsuario) {
    asignarTextoElemento(
      'p',
      `Acertaste el numero en ${intentos} ${intentos === 1 ? 'vez' : 'veces'}`
    );
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    // el usuario no acerto
    if (numeroDeUsuario > numeroSecreto && intentosMax >= 0) {
      asignarTextoElemento('p', 'El numero secreto es menor');
    } else {
      asignarTextoElemento('p', 'El numero secreto es mayor');
    }
    intentos++;
    limpiarCaja();
    if (intentosMax <= 0) {
      asignarTextoElemento('p', '¡Lo siento! Te has quedado sin intentos');
      document.getElementById('reiniciar').removeAttribute('disabled');
    }
    intentosMax--;
  }
  return;
}

function limpiarCaja() {
  document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
  let numeroGenerado = (numeroSecreto =
    Math.floor(Math.random() * numeroMax) + 1);

  console.log('num generado', numeroGenerado);
  console.log('lista num sorteados', listaNumerosSorteados);
  console.log('intentos max', intentosMax);
  // Si ya sortamos todos los numeros
  if (listaNumerosSorteados.length == numeroMax) {
    asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles');
  } else if (intentosMax <= 0) {
    asignarTextoElemento('p', '¡Lo siento! Te has quedado sin intentos');
    return;
  } else {
    // Si el numero generado esta incluido en la lista
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function condicionesIniciales() {
  asignarTextoElemento('h1', 'Juego del número secreto');
  asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMax}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
}

function reiniciarJuego() {
  //limpiar la caja
  limpiarCaja();
  intentosMax = 5;
  // indicar mensaje de intervalo de numeros
  // generar numero aleatorio
  // Inicializar el numero de intentos
  condicionesIniciales();
  // Deshabilitar el btón de nuevo juego
  document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();
