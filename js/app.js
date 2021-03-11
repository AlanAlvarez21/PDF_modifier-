const { degrees, PDFDocument, rgb, StandardFonts, grayscale } = PDFLib

let arrayB1 = false;
let arrayB2 = false;

// DROP ZONE 
let arrayBuffer1 = []

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

/**
 * Updates the thumbnail on a drop zone element.
 */
function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("application/pdf")) {
    var input = file.target;
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    arrayB2 = true;

    reader.onload = () => {
      arrayBuffer1 = reader.result;
      console.log(arrayBuffer1.byteLength);
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;

    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}

// Boton simple de upload 
let arrayBuffer = []
var openFile = function(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
      arrayBuffer = reader.result;
      console.log(arrayBuffer.byteLength);
      arrayB1 = true;
    };
    reader.readAsArrayBuffer(input.files[0]);
  };

    async function modificarPdf1firmante() { 
    let existingPdfBytes

    // asigna el buffer 1 o 2 dependiendo cual retorne true a los bites del pdf para evitar que pueda guardar una variable undefined 
      if (arrayB1 == true){
        existingPdfBytes = arrayBuffer
      }
      else { (arrayB2 == true)
        existingPdfBytes = arrayBuffer1
              }        
      // const existingPdfBytes1 = arrayBuffer1
      //const fontBytes = arrayBuffer1
      //existingPdfBytes = arrayBuffer1//await fetch(url).then(res => res.arrayBuffer())
      //existingPdfBytes = arrayBuffer//await fetch(url).then(res => res.)
      // Register the `fontkit` instance
      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      //const pdfDoc = await PDFDocument.load(existingPdfBytes1)
      //pdfDoc.registerFontkit(fontkit)
      //const customFont = await pdfDoc.embedFont(fontBytes)
      const europa = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const pages = pdfDoc.getPages() //asigna el tamaño del documento mediante el metodo getPages()
      let lastPage = []
      let penultiPage = []
      const length = pages.length    //total de paginas     
      let penultimate = length - 1  //penultima pagina    
      
      const firstPage = pages[0]  // Get the first page of the document
      
      for (i = 0; i < pages.length; i++) { //get the last page of the array 
          lastPage = pages[i]
          console.log(lastPage)
       }

       for (i = 0; i < pages.length; i++) { //get the penultimate page of the array 
        penultiPage = pages[i-1]
          console.log(penultiPage)
       }
      // Get the width and height of the first page
      const { width, height } = lastPage.getSize()


      for (i = 0; i < (pages.length - 1); i++) { 

                 //     pages[i].drawRectangle({
                 //     x: 1,
                 //     y: 38.5,
                 //     width: width,
                 //     height: 8,
                 //     borderWidth: 0.1,
                 //     borderColor: rgb(1, 1, 1),
                 //     color: rgb(1, 1, 1),
                 //   })
                      pages[i].drawText(`Página ${i + 1} de ${length}`, { 
                      x: 535 ,
                      y: 40 ,
                      size: 7,
                      font: europa,
                      color: rgb(.5, .5, .5),
                    })     
       }

      lastPage.drawRectangle({ // Elimina el número de paginas en el formulario de 1 firmante 
        x: 28,
        y: 390,
        width: 250,
        height: 20,
        borderWidth: 0.5,
        borderColor: rgb(1, 1, 1),
        color: rgb(1, 1, 1),
       
      })

      lastPage.drawRectangle({
        x: 510,
        y: 40,
        width: 63,
        height: 10,
        borderWidth: 0.5,
        borderColor: rgb(1, 1, 1),
        color: rgb(1, 1, 1),
       
      })
      // Escribe Termino de Reporte en la ultima pagina
      lastPage.drawText('Termino del Reporte', {
        x: (width/2)-45,
        y: 40,
        size: 8,
        font: europa,
        color: rgb(.5, .5, .5),
      })

      // Escribe la secuencia de hojas en la penultima pagina 
      // Escribe la secuencia de hojas en la ultima pagina 
      lastPage.drawText(`Página ${length} de ${length}`, { 
        x: 520,
        y: 40 ,
        size: 7,
        font: europa,
        color: rgb(.5, .5, .5),
      })

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save()

			// Trigger the browser to download the PDF document
      download(pdfBytes, "pdf1FirmanteModificado.pdf", "application/pdf");

     const a = (pages[length - 1]); //imprime longitud del documento creado/modificado
     console.log(a);
     setTimeout(reload_page, 500);     

    }
    async function modificarPdf2firmantes() { 
      let existingPdfBytes
  
      // asigna el buffer 1 o 2 dependiendo cual retorne true a los bites del pdf para evitar que pueda guardar una variable undefined 
        if (arrayB1 == true){
          existingPdfBytes = arrayBuffer
        }
        else { (arrayB2 == true)
          existingPdfBytes = arrayBuffer1
                }        
        
        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        const europa = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const pages = pdfDoc.getPages() //asigna el tamaño del documento mediante el metodo getPages()
        let lastPage = []
        let penultiPage = []
        const length = pages.length    //total de paginas     
        let penultimate = length - 1  //penultima pagina    
  
       
        
        const firstPage = pages[0]  // Get the first page of the document
        
        for (i = 0; i < pages.length; i++) { //get the last page of the array 
            lastPage = pages[i]
            console.log(lastPage)
         }
  
         for (i = 0; i < pages.length; i++) { //get the penultimate page of the array 
          penultiPage = pages[i-1]
            console.log(penultiPage)
         }
        const { width, height } = lastPage.getSize()       // Get the width and height of the first page
  
  
  
        for (i = 0; i < (pages.length - 2); i++) { //get the last page of the array 

      // pages[i].drawRectangle({
       //   x: 1,
       //   y: 38.5,
       //   width: width,
       //   height: 8,
       //   borderWidth: 0.1,
       //   borderColor: rgb(1, 1, 1),
       //   color: rgb(1, 1, 1),
       // })
          pages[i].drawText(`Página ${i + 1} de ${length}`, { 
          x: 535 ,
          y: 40 ,
          size: 7,
          font: europa,
          color: rgb(.5, .5, .5),
        })   
         }
         penultiPage.drawRectangle({ // Elimina el número de paginas en el formulario de 2 firmantes
          x: 28,
          y: 415,
          width: 250,
          height: 20,
          borderWidth: 0.5,
          borderColor: rgb(1, 1, 1),
          color: rgb(1, 1, 1),
         
        })
  
        lastPage.drawRectangle({
          x: 510,
          y: 40,
          width: 63,
          height: 10,
          borderWidth: 0.5,
          borderColor: rgb(1, 1, 1),
          color: rgb(1, 1, 1),
         
        })
        penultiPage.drawRectangle({
          x: 510,
          y: 40,
          width: 63,
          height: 10,
          borderWidth: 0.5,
          borderColor: rgb(1, 1, 1),
          color: rgb(1, 1, 1),
         
        })
        // Escribe Termino de Reporte en la ultima pagina
        lastPage.drawText('Termino del Reporte', {
          x: (width/2)-45,
          y: 40,
          size: 8,
          font: europa,
          color: rgb(.5, .5, .5),
        })
  
        // Escribe la secuencia de hojas en la penultima pagina 
        penultiPage.drawText(`Página ${penultimate} de ${length}`, { 
          x: 520,
          y: 40,
          size: 7,
          font: europa,
          color: rgb(.5, .5, .5),
        })
        // Escribe la secuencia de hojas en la ultima pagina 
        lastPage.drawText(`Página ${length} de ${length}`, { 
          x: 520,
          y: 40 ,
          size: 7,
          font: europa,
          color: rgb(.5, .5, .5),
        })
  
        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()
  
        // Trigger the browser to download the PDF document
        download(pdfBytes, "pdf2FirmanteModificado.pdf", "application/pdf");
  
       const a = (pages[length - 1]); //imprime longitud del documento creado/modificado
       console.log(a);
       setTimeout(reload_page, 500);     
  
      }
  
  
  


function reload_page() {
  location.reload();
}

