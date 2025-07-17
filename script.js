const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const actualizarBtn = document.getElementById("actualizarBtn");
const toggleButton = document.getElementById("toggleButton");
const volverBtn = document.getElementById("volverBtn");
const opcionesInput = document.getElementById("opcionesInput");

const pantallaOpciones = document.getElementById("pantallaOpciones");
const pantallaRuleta = document.getElementById("pantallaRuleta");

let opciones = [];
let anguloActual = 0;
let velocidad = 0;
let girando = false;

function dibujarRuleta() {
  const total = opciones.length;
  const anguloPorOpcion = (2 * Math.PI) / total;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < total; i++) {
    const inicio = anguloActual + i * anguloPorOpcion;
    const fin = inicio + anguloPorOpcion;

    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, inicio, fin);
    ctx.fillStyle = `hsl(${i * 360 / total}, 70%, 60%)`;
    ctx.fill();

    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(inicio + anguloPorOpcion / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText(opciones[i], 130, 5);
    ctx.restore();
  }
}

function animarRuleta() {
  if (!girando) return;
  anguloActual += velocidad;
  dibujarRuleta();
  requestAnimationFrame(animarRuleta);
}

actualizarBtn.addEventListener("click", () => {
  const texto = opcionesInput.value.trim();
  opciones = texto.split(",").map(op => op.trim()).filter(op => op);
  if (opciones.length > 0) {
    pantallaOpciones.style.display = "none";
    pantallaRuleta.style.display = "block";
    anguloActual = 0;
    dibujarRuleta();
  }
});

toggleButton.addEventListener("click", () => {
  if (!girando) {
    velocidad = 0.25 + Math.random() * 0.1;
    girando = true;
    toggleButton.textContent = "Detener";
    animarRuleta();
  } else {
    girando = false;
    toggleButton.textContent = "Iniciar";

    const total = opciones.length;
    const anguloPorOpcion = (2 * Math.PI) / total;
    let anguloCentral = (Math.PI * 1.5 - anguloActual) % (2 * Math.PI);
    if (anguloCentral < 0) anguloCentral += 2 * Math.PI;
    const indiceGanador = Math.floor(anguloCentral / anguloPorOpcion);
    alert("🎉 ¡Ganó: " + opciones[indiceGanador] + "!");
  }
});

volverBtn.addEventListener("click", () => {
  pantallaOpciones.style.display = "block";
  pantallaRuleta.style.display = "none";
});