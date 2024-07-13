import { createProduct } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.formulario form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newProduct = extractFormData(form);

    try {
      await createProduct(newProduct);
      window.location.reload();
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  });
});

function extractFormData(form) {
  const nombreInput = form.querySelector('.producto-nombre');
  const precioInput = form.querySelector('.producto-precio');
  const imagenInput = form.querySelector('.producto-imagen');

  return {
    nombre: nombreInput.value,
    precio: parseFloat(precioInput.value),
    imagen: imagenInput.value,
  };
}
