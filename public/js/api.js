const API_URL = 'http://localhost:5000/productos';

// Método GET para obtener todos los productos
export async function getProducts() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }
  return await response.json();
}

// Método POST para crear un nuevo producto
export async function createProduct(product) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Error al crear el producto');
  }
  return await response.json();
}

// Método DELETE para eliminar un producto
export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el producto');
  }
}
