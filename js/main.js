// ===== Cart System =====
const Cart = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),

  add(item) {
    const existing = this.items.find((i) => i.id === item.id);
    if (existing) {
      existing.qty++;
    } else {
      this.items.push({ ...item, qty: 1 });
    }
    this.save();
    this.render();
    this.showNotification(`${item.name} added to cart`);
  },

  remove(id) {
    this.items = this.items.filter((i) => i.id !== id);
    this.save();
    this.render();
  },

  updateQty(id, delta) {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) this.remove(id);
      else {
        this.save();
        this.render();
      }
    }
  },

  getTotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  getCount() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  },

  clear() {
    this.items = [];
    this.save();
    this.render();
  },

  render() {
    // Update cart badge
    document.querySelectorAll('.cart-count').forEach((el) => {
      const count = this.getCount();
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });

    // Update cart sidebar
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems) return;

    if (this.items.length === 0) {
      cartItems.innerHTML =
        '<div class="cart-empty"><span class="material-symbols-outlined" style="font-size:3rem;margin-bottom:1rem;display:block;">shopping_cart</span>Your cart is empty</div>';
    } else {
      cartItems.innerHTML = this.items
        .map(
          (item) => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price} L.E</div>
                        <div style="font-size:0.65rem;color:rgba(255,255,255,0.3);margin-top:2px;">${item.brand}</div>
                    </div>
                    <div class="cart-item-qty">
                        <button class="cart-qty-btn" onclick="Cart.updateQty('${item.id}', -1)">−</button>
                        <span style="min-width:1.5rem;text-align:center;">${item.qty}</span>
                        <button class="cart-qty-btn" onclick="Cart.updateQty('${item.id}', 1)">+</button>
                    </div>
                </div>
            `,
        )
        .join('');
    }

    if (cartTotal) {
      cartTotal.textContent = this.getTotal().toLocaleString() + ' L.E';
    }
  },

  showNotification(msg) {
    const notif = document.createElement('div');
    notif.style.cssText =
      'position:fixed;bottom:2rem;right:2rem;z-index:999;background:#1c424a;color:#fff;padding:1rem 1.5rem;border-radius:4px;font-size:0.85rem;animation:slideUp 0.3s ease;box-shadow:0 10px 30px rgba(0,0,0,0.4);';
    notif.textContent = msg;
    document.body.appendChild(notif);
    setTimeout(() => {
      notif.style.opacity = '0';
      notif.style.transition = 'opacity 0.3s';
    }, 2000);
    setTimeout(() => notif.remove(), 2300);
  },
};

// ===== Cart Sidebar Toggle =====
function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  if (sidebar && overlay) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  }
}

// ===== Mobile Nav =====
function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  if (nav) nav.classList.toggle('active');
}

// ===== Menu Filtering =====
function filterMenu(category, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Update tabs
  const section = container.closest('.section') || container.closest('section');
  const tabs = section ? section.querySelectorAll('.menu-tab') : [];
  tabs.forEach((t) =>
    t.classList.toggle('active', t.dataset.category === category),
  );

  // Show/hide items
  const items = container.querySelectorAll('.menu-list-item');
  items.forEach((item) => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });

  // Hide hint if category selected
  const hint = container.querySelector('.menu-category-hint');
  if (hint) {
    hint.style.display = category === 'all' ? '' : 'none';
  }
}

// ===== Load Menu from JSON =====
async function loadMenu(jsonFile, containerId, brand, isCafe = false) {
  try {
    const resp = await fetch(jsonFile);
    const data = await resp.json();
    const container = document.getElementById(containerId);
    const section =
      container?.closest('.section') || container?.closest('section');
    const tabsContainer = section?.querySelector('.menu-tabs');
    if (!container) return;

    const categories = data.menu.map((c) => c.category);

    // Build tabs (no "All" tab - user must select a category)
    if (tabsContainer) {
      let tabsHTML = '';
      categories.forEach((cat, i) => {
        const activeClass = i === 0 ? ' active' : '';
        tabsHTML += `<button class="menu-tab${activeClass}" data-category="${cat}" onclick="filterMenu('${cat}', '${containerId}')">${cat}</button>`;
      });
      tabsContainer.innerHTML = tabsHTML;
    }

    // Build compact list items
    let listHTML = '<div class="menu-list">';
    const firstCategory = categories[0];

    data.menu.forEach((cat) => {
      cat.items.forEach((item) => {
        const isFirst = cat.category === firstCategory;
        const hideStyle = isFirst ? '' : ' style="display:none;"';
        listHTML += `
          <div class="menu-list-item" data-category="${cat.category}"${hideStyle}>
            <div class="menu-item-info">
              <div class="menu-item-type">${item.type || cat.category}</div>
              <div class="menu-item-name">${item.name_en}</div>
              <div class="menu-item-name-ar">${item.name_ar}</div>
            </div>
            <div class="menu-item-price">${item.price}</div>
          </div>
        `;
      });
    });
    listHTML += '</div>';
    container.innerHTML = listHTML;
  } catch (err) {
    console.error('Failed to load menu:', err);
  }
}

// ===== Intersection Observer for fade-in =====
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  Cart.render();
  initScrollAnimations();
});

// Slide-up animation CSS
const style = document.createElement('style');
style.textContent =
  '@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }';
document.head.appendChild(style);
