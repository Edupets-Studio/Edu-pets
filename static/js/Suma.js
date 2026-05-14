let vidas = 3;
let preguntas = 0;
const totalPreguntas = 10;
const mensajeDiv = document.getElementById("mensaje");
const vidaMenos = "/static/assets/images/VidaMenos.png";

function aumentarOrbeSiCoincide(tipoEjercicio) {
  const tarea = JSON.parse(localStorage.getItem("tareaActual"));
  if (!tarea || tarea.tipo !== tipoEjercicio) return;

  const niveles = JSON.parse(localStorage.getItem("niveles")) || { comida: 100, sueno: 100, felicidad: 100 };
  niveles[tarea.orbe] = Math.min(100, niveles[tarea.orbe] + 20);
  localStorage.setItem("niveles", JSON.stringify(niveles));
  localStorage.removeItem("tareaActual");
}

function generarNumeroFacil() {
  return Math.floor(Math.random() * 10) + 1;
}

function generarPregunta() {
  mensajeDiv.innerHTML = "";
  if (preguntas >= totalPreguntas) {
    mensajeDiv.innerHTML = '<div class="message success">¡Excelente trabajo! Terminaste todas las sumas.</div>';
    aumentarOrbeSiCoincide("suma");
    setTimeout(() => window.location.href = "/mascota", 4000);
    return;
  }

  const a = generarNumeroFacil();
  const b = generarNumeroFacil();
  const respuesta = a + b;
  document.getElementById("titulo").textContent = `Suma: ejercicios con ${a}`;
  document.getElementById("pregunta").textContent = `¿Cuánto es ${a} + ${b}?`;

  const opcionesDiv = document.getElementById("opciones");
  opcionesDiv.innerHTML = "";
  const opciones = new Set([respuesta]);

  while (opciones.size < 3) {
    const diferencia = Math.floor(Math.random() * 4) + 1;
    const opcion = Math.random() < 0.5 ? respuesta + diferencia : respuesta - diferencia;
    if (opcion > 0) opciones.add(opcion);
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
    mensajeDiv.innerHTML = '<div class="message success">¡Muy bien!</div>';
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

function confirmarSalida() {
  document.getElementById("confirm-exit").style.display = "block";
}

window.onload = generarPregunta;
