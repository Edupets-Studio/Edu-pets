let vidas = 2;
let preguntas = 0;
const totalPreguntas = 5;
const mensajeDiv = document.getElementById('mensaje');
const tiposOperaciones = ['suma', 'resta', 'multiplicación', 'división'];

function generarNumero(max = 10) {
  return Math.floor(Math.random() * max) + 1;
}

function generarPregunta() {
  mensajeDiv.innerHTML = "";
  
  if (preguntas >= totalPreguntas) {
    mensajeDiv.innerHTML = '<div class="message success">🎉 ¡Examen completado! ¡Excelente! 🎉</div>';
    setTimeout(() => window.location.href = 'mascota.html', 4000);
    return;
  }

  // Selecciona tipo de operación aleatoria
  const tipo = tiposOperaciones[Math.floor(Math.random() * tiposOperaciones.length)];
  const a = generarNumero(10);
  const b = generarNumero(10);
  let respuesta;
  let preguntaTexto;

  document.getElementById('titulo').textContent = `Examenes: ejercicios de ${tipo}`;

  switch(tipo) {
    case 'suma':
      respuesta = a + b;
      preguntaTexto = `¿Cuánto es ${a} + ${b}?`;
      break;
    case 'resta':
      respuesta = a - b;
      preguntaTexto = `¿Cuánto es ${a} - ${b}?`;
      break;
    case 'multiplicación':
      respuesta = a * b;
      preguntaTexto = `¿Cuánto es ${a} × ${b}?`;
      break;
    case 'división':
      respuesta = Math.floor(a / b);
      preguntaTexto = `¿Cuánto es ${a} ÷ ${b}? (sin decimales)`;
      break;
  }

  document.getElementById('pregunta').textContent = preguntaTexto;
  
  // Generar opciones de respuesta
  const opcionesDiv = document.getElementById('opciones');
  opcionesDiv.innerHTML = '';
  const opciones = new Set();
  opciones.add(respuesta);

  while (opciones.size < 4) {
    const diferencia = Math.floor(Math.random() * 5) + 1;
    const opcion = Math.random() < 0.5 ? respuesta + diferencia : respuesta - diferencia;
    if (opcion > 0) opciones.add(opcion);
  }

  Array.from(opciones).sort(() => Math.random() - 0.5).forEach(op => {
    const btn = document.createElement('button');
    btn.textContent = op;
    btn.onclick = () => verificarRespuesta(op, respuesta, btn);
    opcionesDiv.appendChild(btn);
  });
}

function verificarRespuesta(opcion, correcta, boton) {
  const botones = document.querySelectorAll('.options button');
  botones.forEach(b => b.disabled = true);

  if (opcion === correcta) {
    boton.style.backgroundColor = '#a8f5a8';
    mensajeDiv.innerHTML = '<div class="message success">✅ ¡Correcto! 👍</div>';
    setTimeout(() => {
      preguntas++;
      generarPregunta();
    }, 1200);
  } else {
    boton.style.backgroundColor = '#f8b0b0';
    mensajeDiv.innerHTML = '<div class="message fail">❌ Intenta otra vez.</div>';
    
    if (vidas > 0) {
      document.getElementById(`vida${vidas}`).src = 'imagenes/VidaMenos.png';
      vidas--;
    }

    setTimeout(() => {
      if (vidas === 0) {
        mensajeDiv.innerHTML = '<div class="message fail">😢 Se acabaron las vidas. ¡Vuelve a intentarlo!</div>';
        setTimeout(() => window.location.href = 'mascota.html', 3500);
      } else {
        preguntas++;
        generarPregunta();
      }
    }, 1500);
  }
}

window.onload = generarPregunta;