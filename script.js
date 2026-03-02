const phoneNumber = '51988113023';

const products = [
  {
    id: 1,
    name: 'Pollitos Hy-Line Brown (1 semana)',
    category: 'Pollitos',
    price: 8.5,
    unit: 'por unidad',
    description: 'Lotes para inicio de crianza con manejo inicial recomendado.',
  },
  {
    id: 2,
    name: 'Pollitos Hy-Line Brown (2 semanas)',
    category: 'Pollitos',
    price: 11,
    unit: 'por unidad',
    description: 'Mayor fortaleza inicial para transición a etapa de crecimiento.',
  },
  {
    id: 3,
    name: 'Huevos frescos en cesta x30',
    category: 'Huevos',
    price: 19.9,
    unit: 'por cesta',
    description: 'Clasificados y listos para venta diaria en tienda o reparto.',
  },
  {
    id: 4,
    name: 'Huevos frescos en cesta x60',
    category: 'Huevos',
    price: 37.5,
    unit: 'por cesta',
    description: 'Presentación comercial para mayoristas y puntos de abasto.',
  },
];

const cart = [];

const productList = document.getElementById('productList');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const clearCartButton = document.getElementById('clearCart');
const whatsappButton = document.getElementById('whatsappOrder');

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
        <div class="product-meta">
          <p class="price">${formatCurrency(product.price)} <small>${product.unit}</small></p>
          <button class="btn btn-dark" data-id="${product.id}" type="button">Agregar</button>
        </div>
      </article>
    `
    )
    .join('');

  document.querySelectorAll('[data-id]').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.id)));
  });
}

function addToCart(productId) {
  const found = cart.find((item) => item.id === productId);
  if (found) {
    found.qty += 1;
    renderCart();
    return;
  }

  const product = products.find((item) => item.id === productId);
  if (!product) return;

  cart.push({ ...product, qty: 1 });
  renderCart();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getWhatsappMessage() {
  if (cart.length === 0) {
    return 'Hola, quiero información sobre pollitos y huevos Hy-Line Brown.';
  }

  const lines = cart.map(
    (item) => `- ${item.name} x${item.qty} = ${formatCurrency(item.qty * item.price)}`
  );

  return `Hola, deseo confirmar este pedido:%0A${lines.join('%0A')}%0ATotal: ${formatCurrency(getCartTotal())}`;
}

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<li>Tu pedido está vacío.</li>';
    cartTotal.textContent = formatCurrency(0);
    whatsappButton.href = `https://wa.me/${phoneNumber}?text=${getWhatsappMessage()}`;
    return;
  }

  cartItems.innerHTML = cart
    .map((item) => `<li>${item.name} x${item.qty} — ${formatCurrency(item.price * item.qty)}</li>`)
    .join('');

  cartTotal.textContent = formatCurrency(getCartTotal());
  whatsappButton.href = `https://wa.me/${phoneNumber}?text=${getWhatsappMessage()}`;
}

clearCartButton.addEventListener('click', () => {
  cart.length = 0;
  renderCart();
});

renderProducts();
renderCart();
