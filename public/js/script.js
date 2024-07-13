document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  const { nombre, precio, imagen } = extractFormData(document.querySelector('.formulario form'));

  formData.append('nombre', nombre);
  formData.append('precio', precio);
  formData.append('imagen', imagen.files[0]);

  try {
      const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData
      });
      const result = await response.json();
      console.log('File uploaded:', result.filePath);

      const newProductHTML = generateCardHTML({ nombre, precio, imagen: result.filePath });
      document.querySelector('.mis-productos').innerHTML += newProductHTML;
  } catch (error) {
      console.error('Error uploading file:', error);
  }
});

function extractFormData(form) {
  const nombreInput = form.querySelector('.producto-nombre');
  const precioInput = form.querySelector('.producto-precio');
  const imagenInput = form.querySelector('.producto-imagen');

  return {
      nombre: nombreInput.value,
      precio: precioInput.value,
      imagen: imagenInput
  };
}

function generateCardHTML(product) {
  return `
      <div class="card">
          <img src="${product.imagen}" alt="${product.nombre}" />
          <div class="card-container--info">
              <p>${product.nombre}</p>
              <div class="card-container--precio">
                  <p>$ ${product.precio}</p>
                  <img src="./img/boton-borrar.png" alt="Eliminar producto" />
              </div>
          </div>
      </div>
  `;
}
