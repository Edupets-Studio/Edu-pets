const tareas = [
    { tipo: "suma", texto: "Realiza una suma para aumentar la felicidad", orbe: "felicidad" },
    { tipo: "resta", texto: "Haz una resta para mejorar el sueño", orbe: "sueño" },
    { tipo: "multiplicacion", texto: "Completa una multiplicación para ganar comida", orbe: "comida" },
    { tipo: "division", texto: "Resuelve una división para subir la felicidad", orbe: "felicidad" }
  ];

  function generarTarea() {
    const tareaGuardada = localStorage.getItem("tareaActual");
    const tareaBox = document.getElementById("tarea-actual");
    if (tareaGuardada) {
      const tarea = JSON.parse(tareaGuardada);
      tareaBox.textContent = "🧩 " + tarea.texto;
    } else {
      const tarea = tareas[Math.floor(Math.random() * tareas.length)];
      localStorage.setItem("tareaActual", JSON.stringify(tarea));
      tareaBox.textContent = "🧩 " + tarea.texto;
    }
    tareaBox.classList.add("mostrar");
  }

  function actualizarOrbes() {
    const niveles = JSON.parse(localStorage.getItem("niveles")) || { comida: 100, sueño: 100, felicidad: 100 };
    for (let orbe in niveles) {
      const porcentaje = Math.round(niveles[orbe]);
      document.getElementById(`${orbe}-texto`).textContent = porcentaje + "%";
      const orbeElemento = document.getElementById(orbe);
      orbeElemento.style.filter = `brightness(${0.5 + porcentaje / 150})`;
    }
  }

  function degradarOrbes() {
    const niveles = JSON.parse(localStorage.getItem("niveles")) || { comida: 100, sueño: 100, felicidad: 100 };
    for (let orbe in niveles) {
      niveles[orbe] = Math.max(0, niveles[orbe] - 0.03);
    }
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
  const loader = document.getElementById("pantalla-carga");
  loader.classList.add("oculto");
});

  window.onload = () => {
    generarTarea();
    actualizarOrbes();
    cargarNombre();
    setInterval(degradarOrbes, 300);
  };