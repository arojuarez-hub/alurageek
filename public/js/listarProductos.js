import { getProducts, deleteProduct } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const productContainer = document.querySelector('.mis-productos');

  try {
    const products = await getProducts();
    products.forEach(product => {
      const productCard = createProductCard(product);
      productContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
});

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = generateCardHTML(product);
  setupDeleteButton(card, product.id);
  return card;
}

function generateCardHTML(product) {
  return `
    <img src="${product.imagen}" alt="${product.nombre}" />
    <div class="card-container--info">
      <p>${product.nombre}</p>
      <div class="card-container--precio">
        <p>$ ${product.precio}.00</p>
        <img src="./img/boton-borrar.png" alt="Borrar" data-id="${product.id}" class="delete-button" />
      </div>
    </div>
  `;
}

function setupDeleteButton(card, productId) {
  card.querySelector('.delete-button').addEventListener('click', async (event) => {
    try {
      await deleteProduct(productId);
      card.remove();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  });
}
