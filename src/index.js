import html2canvas from "../html2canvas.esm.js";



const captureBtn = document.querySelector(".capture-btn");
const cerrarBtn  = document.querySelector(".close-modal-btn")
const descargarBtn  = document.querySelector(".save-snapshot-btn")

const modal = document.querySelector(".modal");
const canvasContainer = modal.querySelector(".placeholder-canvas");
const selectArea = document.querySelector(".select-area");

const toggleModal = () => {
    if (modal.classList.contains("active")) {
      canvasContainer.innerHTML = "";
      return modal.classList.remove("active");
    }
    modal.classList.add("active");
  };
  
  let canvas=null;
  const takeSnapShot = async () => {
    const area =
      selectArea.value === "fullscreen"
        ? document.body
        : document.querySelector(`#${selectArea.value}`);
    canvas = await html2canvas(area, { allowTaint: true, });
    canvasContainer.appendChild(canvas);
  };

  captureBtn.addEventListener("click", async () => {
    console.log("Click en boton capturar")
    await takeSnapShot();
    toggleModal();
  });

  cerrarBtn.addEventListener("click", (ev)=>{
    toggleModal()
  })

  descargarBtn.addEventListener("click", (ev) => {
    console.log("Click en Guardar")
    // Crear un elemento <a>
    let enlace = document.createElement('a');
    // Descargar a un fichero:
    enlace.download = "imagen.png";
    // Convertir la imagen a Base64 y ponerlo en el enlace
    enlace.href = canvas.toDataURL();
    // Hacer click en el enlace abre el dialogo de descarga
    enlace.click();
});