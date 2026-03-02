const products = [
  {
    id: 1,
    name: 'Pollitos Hy-Line Brown (1 semana)',
    category: 'Pollitos',
    price: 8.5,
    description: 'Lote seleccionado para inicio de crianza.',
  },
  {
    id: 2,
    name: 'Pollitos Hy-Line Brown (2 semanas)',
    category: 'Pollitos',
    price: 11.0,
    description: 'Mayor adaptación y desarrollo inicial.',
  },
  {
    id: 3,
    name: 'Huevos frescos en cesta x30',
    category: 'Huevos',
    price: 19.9,
    description: 'Huevos limpios y clasificados para venta diaria.',
  },
  {
    id: 4,
    name: 'Huevos frescos en cesta x60',
    category: 'Huevos',
    price: 37.5,
    description: 'Formato ideal para tiendas y emprendimientos.',
  },
];

const cart = [];

const productList = document.getElementById('productList');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const clearCartButton = document.getElementById('clearCart');

document.getElementById('year').textContent = new Date().getFullYear();

function formatCurrency(value) {
  return value.toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
  });
}

function renderProducts() {
  productList.innerHTML = products
    .map(
      (product) => `
      <article class="product-card">
        <span class="tag">${product.category}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">${formatCurrency(product.price)}</p>
        <button class="btn" data-id="${product.id}">Agregar al pedido</button>
      </article>
    `
    )
    .join('');

  document.querySelectorAll('[data-id]').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.id)));
  });
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) {
    return;
  }

  cart.push(product);
  renderCart();
}

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<li>Tu pedido está vacío.</li>';
    cartTotal.textContent = formatCurrency(0);
    return;
  }

  cartItems.innerHTML = cart
    .map((item) => `<li>${item.name} - ${formatCurrency(item.price)}</li>`)
    .join('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = formatCurrency(total);
}

clearCartButton.addEventListener('click', () => {
  cart.length = 0;
  renderCart();
});

renderProducts();
renderCart();
