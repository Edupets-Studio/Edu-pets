const tareas = [
  { tipo: "suma", texto: "Realiza una suma para aumentar la felicidad", orbe: "felicidad" },
  { tipo: "resta", texto: "Haz una resta para mejorar el sueño", orbe: "sueno" },
  { tipo: "multiplicacion", texto: "Completa una multiplicación para ganar comida", orbe: "comida" },
  { tipo: "division", texto: "Resuelve una división para subir la felicidad", orbe: "felicidad" },
];

function nivelesIniciales() {
  const niveles = JSON.parse(localStorage.getItem("niveles")) || {};
  return {
    comida: niveles.comida ?? 100,
    sueno: niveles.sueno ?? niveles["sueño"] ?? 100,
    felicidad: niveles.felicidad ?? 100,
  };
}

function generarTarea() {
  const tareaGuardada = localStorage.getItem("tareaActual");
  const tareaBox = document.getElementById("tarea-actual");

  if (tareaGuardada) {
    const tarea = JSON.parse(tareaGuardada);
    tareaBox.textContent = `Tarea: ${tarea.texto}`;
  } else {
    const tarea = tareas[Math.floor(Math.random() * tareas.length)];
    localStorage.setItem("tareaActual", JSON.stringify(tarea));
    tareaBox.textContent = `Tarea: ${tarea.texto}`;
  }

  tareaBox.classList.add("mostrar");
}

function actualizarOrbes() {
  const niveles = nivelesIniciales();
  localStorage.setItem("niveles", JSON.stringify(niveles));

  Object.entries(niveles).forEach(([orbe, valor]) => {
    const porcentaje = Math.round(valor);
    const texto = document.getElementById(`${orbe}-texto`);
    const elemento = document.getElementById(orbe);
    if (!texto || !elemento) return;

    texto.textContent = `${porcentaje}%`;
    elemento.style.filter = `brightness(${0.5 + porcentaje / 150})`;
  });
}

function degradarOrbes() {
  const niveles = nivelesIniciales();
  Object.keys(niveles).forEach((orbe) => {
    niveles[orbe] = Math.max(0, niveles[orbe] - 0.03);
  });
  localStorage.setItem("niveles", JSON.stringify(niveles));
  actualizarOrbes();
}

const panelIzq = document.getElementById("panel-izquierda");
const panelDer = document.getElementById("panel-derecha");
document.getElementById("toggle-izquierda").addEventListener("click", () => {
  panelIzq.classList.toggle("activa");
  panelDer.classList.remove("activa");
});

document.getElementById("toggle-derecha").addEventListener("click", () => {
  panelDer.classList.toggle("activa");
  panelIzq.classList.remove("activa");
});

const barraEdicion = document.getElementById("barra-edicion");
const nombreMascota = document.getElementById("nombreMascota");
const editarBtn = document.getElementById("editar-nombre");

editarBtn.addEventListener("click", () => {
  barraEdicion.classList.add("activa");
});

function guardarNombre() {
  const nuevo = document.getElementById("nuevo-nombre").value.trim();
  if (nuevo) {
    nombreMascota.textContent = nuevo;
    localStorage.setItem("nombreMascota", nuevo);
  }
  barraEdicion.classList.remove("activa");
}

function cancelarEdicion() {
  barraEdicion.classList.remove("activa");
}

function cargarNombre() {
  const guardado = localStorage.getItem("nombreMascota");
  if (guardado) nombreMascota.textContent = guardado;
}

window.addEventListener("load", () => {
  generarTarea();
  actualizarOrbes();
  cargarNombre();
  setInterval(degradarOrbes, 300);
  document.getElementById("pantalla-carga").classList.add("oculto");
});
