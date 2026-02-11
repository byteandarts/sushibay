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
    const lang = localStorage.getItem('lang') || 'en';
    const displayName =
      lang === 'ar' && item.name_ar ? item.name_ar : item.name;
    this.showNotification(
      lang === 'ar'
        ? `${displayName} أُضيف للسلة`
        : `${displayName} added to cart`,
    );
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

  getVAT() {
    return this.getTotal() * 0.14;
  },

  getTotalWithVAT() {
    return this.getTotal() + this.getVAT();
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
    if (!cartItems) return;

    if (this.items.length === 0) {
      const lang = localStorage.getItem('lang') || 'en';
      const emptyMsg = lang === 'ar' ? 'السلة فارغة' : 'Your cart is empty';
      cartItems.innerHTML = `<div class="cart-empty"><span class="material-symbols-outlined" style="font-size:3rem;margin-bottom:1rem;display:block;">shopping_cart</span>${emptyMsg}</div>`;
    } else {
      const lang = localStorage.getItem('lang') || 'en';
      cartItems.innerHTML = this.items
        .map((item) => {
          const displayName =
            lang === 'ar' && item.name_ar ? item.name_ar : item.name;
          return `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${displayName}</div>
                        <div class="cart-item-price">${item.price} L.E</div>
                        <div style="font-size:0.65rem;color:rgba(255,255,255,0.3);margin-top:2px;">${item.brand}</div>
                    </div>
                    <div class="cart-item-qty">
                        <button class="cart-qty-btn" onclick="Cart.updateQty('${item.id}', -1)">−</button>
                        <span style="min-width:1.5rem;text-align:center;">${item.qty}</span>
                        <button class="cart-qty-btn" onclick="Cart.updateQty('${item.id}', 1)">+</button>
                    </div>
                </div>
            `;
        })
        .join('');
    }

    // Update cart total with VAT breakdown
    const cartTotalContainer = document.querySelector(
      '.cart-footer .cart-total',
    );
    if (cartTotalContainer) {
      const lang = localStorage.getItem('lang') || 'en';
      const subtotal = this.getTotal();
      const vat = this.getVAT();
      const total = this.getTotalWithVAT();

      const subtotalLabel = lang === 'ar' ? 'المجموع الفرعي' : 'Subtotal';
      const vatLabel =
        lang === 'ar' ? 'ضريبة القيمة المضافة (14%)' : 'VAT (14%)';
      const totalLabel = lang === 'ar' ? 'الإجمالي' : 'Total';

      cartTotalContainer.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;color:rgba(255,255,255,0.6);margin-bottom:0.35rem;gap:1rem;">
          <span style="white-space:nowrap;">${subtotalLabel}</span>
          <span style="white-space:nowrap;text-align:right;">${subtotal.toLocaleString()} L.E</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;color:rgba(255,255,255,0.6);margin-bottom:0.75rem;gap:1rem;">
          <span style="white-space:nowrap;">${vatLabel}</span>
          <span style="white-space:nowrap;text-align:right;">${vat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} L.E</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;padding-top:0.5rem;border-top:1px solid rgba(255,255,255,0.1);">
          <span style="font-size:0.85rem;color:rgba(255,255,255,0.5);white-space:nowrap;">${totalLabel}</span>
          <span style="font-family:'Noto Serif',serif;font-size:1.25rem;font-weight:700;color:var(--sushi-gold);white-space:nowrap;">${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} L.E</span>
        </div>
      `;
    }
  },

  showNotification(msg) {
    const notif = document.createElement('div');
    // Detect if we're on a cafe page by checking for nav-cafe or section-cafe class
    const isCafe =
      document.querySelector('.nav-cafe') ||
      document.querySelector('.section-cafe') ||
      document.querySelector('.cafe-menu');
    const bgColor = isCafe ? '#6B3A2A' : '#1c424a';
    notif.style.cssText = `position:fixed;bottom:2rem;right:2rem;z-index:999;background:${bgColor};color:#fff;padding:1rem 1.5rem;border-radius:4px;font-size:0.85rem;animation:slideUp 0.3s ease;box-shadow:0 10px 30px rgba(0,0,0,0.4);`;
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

// ===== Parse price helper =====
function parsePrice(priceStr) {
  return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
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
        const price = parsePrice(item.price);
        const itemId = (brand + '-' + item.name_en)
          .replace(/[^a-zA-Z0-9]/g, '-')
          .toLowerCase();
        const escapedNameEn = item.name_en.replace(/'/g, "\\'");
        const escapedNameAr = item.name_ar.replace(/'/g, "\\'");
        listHTML += `
          <div class="menu-list-item" data-category="${cat.category}"${hideStyle}>
            <div class="menu-item-info">
              <div class="menu-item-type">${item.type || cat.category}</div>
              <div class="menu-item-name">${item.name_en}</div>
              <div class="menu-item-name-ar">${item.name_ar}</div>
            </div>
            <div class="menu-item-price">${item.price}</div>
            <button class="menu-item-card-add" onclick="event.stopPropagation();Cart.add({id:'${itemId}',name:'${escapedNameEn}',name_ar:'${escapedNameAr}',price:${price},brand:'${brand}'})">+</button>
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

// ===== Load Menu Page (Full with images) =====
async function loadMenuPage(
  jsonFile,
  containerId,
  tabsContainerId,
  isCafe = false,
) {
  try {
    const resp = await fetch(jsonFile);
    const data = await resp.json();
    const container = document.getElementById(containerId);
    const tabsContainer = document.getElementById(tabsContainerId);
    if (!container) return;

    const categories = data.menu.map((c) => c.category);

    // Build sticky category tabs
    if (tabsContainer) {
      let tabsHTML = '';
      categories.forEach((cat) => {
        const slug = slugify(cat);
        tabsHTML += `<a href="#${slug}" class="menu-tab" data-slug="${slug}">${cat}</a>`;
      });
      tabsContainer.innerHTML = tabsHTML;
    }

    // Build full menu with image cards
    let contentHTML = '';
    const placeholderSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 280' fill='none'%3E%3Crect width='400' height='280' fill='%23${isCafe ? '231810' : '1e2629'}'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%23555' font-size='14' font-family='sans-serif'%3EPhoto Coming Soon%3C/text%3E%3C/svg%3E`;
    const lang = localStorage.getItem('lang') || 'en';
    const addLabel = lang === 'ar' ? 'أضف' : 'Add';
    const itemsLabel = lang === 'ar' ? 'عنصر' : 'items';

    data.menu.forEach((cat) => {
      const slug = slugify(cat.category);
      contentHTML += `
        <div class="menu-page-category" id="${slug}">
          <div class="menu-page-category-header">
            <h2 class="menu-page-category-title font-display">${cat.category}</h2>
            <span class="menu-page-category-count">${cat.items.length} ${itemsLabel}</span>
          </div>
          <div class="menu-page-grid">
      `;

      cat.items.forEach((item) => {
        const folderName = isCafe ? 'cafe' : 'sushi';
        const imgSrc = item.image
          ? `images/menu/${folderName}/${item.image}`
          : placeholderSvg;
        const brandName = isCafe ? 'Café Supreme' : 'Sushi Bay';
        const price = parsePrice(item.price);
        const itemId = (brandName + '-' + item.name_en)
          .replace(/[^a-zA-Z0-9]/g, '-')
          .toLowerCase();
        const escapedNameEn = item.name_en.replace(/'/g, "\\'");
        const escapedNameAr = item.name_ar.replace(/'/g, "\\'");

        contentHTML += `
          <div class="menu-item-card">
            <div class="menu-item-card-img">
              <img src="${imgSrc}" alt="${item.name_en}" loading="lazy">
            </div>
            <div class="menu-item-card-body">
              <div class="menu-item-card-type">${item.type || cat.category}</div>
              <div class="menu-item-card-name">${item.name_en}</div>
              <div class="menu-item-card-name-ar">${item.name_ar}</div>
              <div class="menu-item-card-footer">
                <span class="menu-item-card-price">${item.price}</span>
                <button class="menu-item-card-add" onclick="Cart.add({id:'${itemId}',name:'${escapedNameEn}',name_ar:'${escapedNameAr}',price:${price},brand:'${brandName}'})">
                  <span class="material-symbols-outlined" style="font-size:0.85rem;">add_shopping_cart</span>
                  ${addLabel}
                </button>
              </div>
            </div>
          </div>
        `;
      });

      contentHTML += '</div></div>';
    });

    container.innerHTML = contentHTML;

    // Highlight active tab on scroll
    initCategoryScrollSpy(categories);

    // Handle hash navigation
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  } catch (err) {
    console.error('Failed to load menu page:', err);
  }
}

// ===== Slug helper =====
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ===== Category ScrollSpy =====
function initCategoryScrollSpy(categories) {
  const tabs = document.querySelectorAll('.menu-category-nav-inner .menu-tab');
  const sections = categories
    .map((cat) => document.getElementById(slugify(cat)))
    .filter(Boolean);

  if (!tabs.length || !sections.length) return;

  let ticking = false;

  function updateActiveTab() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      // Find which section is most visible
      let maxVisibility = 0;
      let activeSection = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const navHeight = 120;
        const viewportHeight = window.innerHeight;

        // Calculate visibility
        const visibleTop = Math.max(navHeight, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibility = visibleHeight / (rect.height || 1);

        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          activeSection = section;
        }
      });

      if (activeSection) {
        const slug = activeSection.id;
        tabs.forEach((tab) => {
          tab.classList.toggle('active', tab.dataset.slug === slug);
        });
        // Scroll active tab into view
        const activeTab = document.querySelector(
          `.menu-category-nav-inner .menu-tab[data-slug="${slug}"]`,
        );
        if (activeTab) {
          activeTab.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
          });
        }
      }

      ticking = false;
    });
  }

  // Update on scroll
  window.addEventListener('scroll', updateActiveTab, { passive: true });
  // Initial update
  updateActiveTab();
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
