let vidas = 2;
let preguntas = 0;
const totalPreguntas = 5;
const mensajeDiv = document.getElementById("mensaje");
const tiposOperaciones = ["suma", "resta", "multiplicación", "división"];
const vidaMenos = "/static/assets/images/VidaMenos.png";

function generarNumero(max = 10) {
  return Math.floor(Math.random() * max) + 1;
}

function generarPregunta() {
  mensajeDiv.innerHTML = "";

  if (preguntas >= totalPreguntas) {
    mensajeDiv.innerHTML = '<div class="message success">¡Examen completado! ¡Excelente!</div>';
    setTimeout(() => window.location.href = "/mascota", 4000);
    return;
  }

  const tipo = tiposOperaciones[Math.floor(Math.random() * tiposOperaciones.length)];
  let a = generarNumero(10);
  let b = generarNumero(10);
  let respuesta;
  let preguntaTexto;

  document.getElementById("titulo").textContent = `Exámenes: ejercicios de ${tipo}`;

  switch (tipo) {
    case "suma":
      respuesta = a + b;
      preguntaTexto = `¿Cuánto es ${a} + ${b}?`;
      break;
    case "resta":
      if (b > a) [a, b] = [b, a];
      respuesta = a - b;
      preguntaTexto = `¿Cuánto es ${a} - ${b}?`;
      break;
    case "multiplicación":
      respuesta = a * b;
      preguntaTexto = `¿Cuánto es ${a} × ${b}?`;
      break;
    case "división":
      respuesta = a;
      preguntaTexto = `¿Cuánto es ${a * b} ÷ ${b}?`;
      break;
  }

  document.getElementById("pregunta").textContent = preguntaTexto;

  const opcionesDiv = document.getElementById("opciones");
  opcionesDiv.innerHTML = "";
  const opciones = new Set([respuesta]);

  while (opciones.size < 4) {
    const diferencia = Math.floor(Math.random() * 5) + 1;
    const opcion = Math.random() < 0.5 ? respuesta + diferencia : respuesta - diferencia;
    if (opcion >= 0) opciones.add(opcion);
  }

  Array.from(opciones).sort(() => Math.random() - 0.5).forEach((opcion) => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.onclick = () => verificarRespuesta(opcion, respuesta, btn);
    opcionesDiv.appendChild(btn);
  });
}

function verificarRespuesta(opcion, correcta, boton) {
  document.querySelectorAll(".options button").forEach((btn) => btn.disabled = true);

  if (opcion === correcta) {
    boton.style.backgroundColor = "#a8f5a8";
    mensajeDiv.innerHTML = '<div class="message success">¡Correcto!</div>';
    setTimeout(() => {
      preguntas++;
      generarPregunta();
    }, 1200);
    return;
  }

  boton.style.backgroundColor = "#f8b0b0";
  mensajeDiv.innerHTML = '<div class="message fail">Intenta otra vez.</div>';

  if (vidas > 0) {
    document.getElementById(`vida${vidas}`).src = vidaMenos;
    vidas--;
  }

  setTimeout(() => {
    if (vidas === 0) {
      mensajeDiv.innerHTML = '<div class="message fail">Se acabaron las vidas. ¡Vuelve a intentarlo!</div>';
      setTimeout(() => window.location.href = "/mascota", 3500);
    } else {
      preguntas++;
      generarPregunta();
    }
  }, 1500);
}

window.onload = generarPregunta;
