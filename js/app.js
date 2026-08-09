// Router simples baseado em hash + delegação de eventos. Sem framework, sem backend.

const routes = {
  home: () => renderHome(),
  produto: (params) => renderProduct(params.id),
  carrinho: () => renderCart(),
  "checkout-entrega": () => renderCheckoutEntrega(),
  "checkout-pagamento": () => renderCheckoutPagamento(),
  "checkout-resumo": () => renderCheckoutResumo(),
  confirmacao: () => renderConfirmation(),
};

function parseHash() {
  const hash = location.hash.replace(/^#\/?/, "");
  const [name, id] = hash.split("/");
  if (!name) return { name: "home", params: {} };
  if (name === "produto") return { name: "produto", params: { id } };
  return { name, params: {} };
}

function navigate(routeName, productId) {
  if (routeName === "produto") {
    location.hash = `#/produto/${productId}`;
  } else if (routeName === "home") {
    location.hash = "#/";
  } else {
    location.hash = `#/${routeName}`;
  }
}

function render() {
  const { name, params } = parseHash();
  state.route = { name, params };
  const fn = routes[name] || routes.home;
  document.getElementById("app").innerHTML = fn(params);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  render();
});

// ---------- Delegação de eventos ----------
document.addEventListener("click", (e) => {
  const gotoProduct = e.target.closest("[data-goto-product]");
  if (gotoProduct) {
    navigate("produto", gotoProduct.dataset.gotoProduct);
    return;
  }

  const goto = e.target.closest("[data-goto]");
  if (goto) {
    e.preventDefault();
    navigate(goto.dataset.goto);
    return;
  }

  const cat = e.target.closest("[data-cat]");
  if (cat) {
    state.activeCategory = cat.dataset.cat;
    const el = document.getElementById(`cat-${cssId(cat.dataset.cat)}`);
    render();
    requestAnimationFrame(() => {
      const target = document.getElementById(`cat-${cssId(cat.dataset.cat)}`);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return;
  }

  // ---- Produto ----
  const qtyBtn = e.target.closest("[data-qty]");
  if (qtyBtn) {
    const delta = Number(qtyBtn.dataset.qty);
    state.draft.qty = Math.max(1, state.draft.qty + delta);
    render();
    return;
  }

  const optionRow = e.target.closest("[data-toggle-option]");
  if (optionRow) {
    const { group, option, type, max } = optionRow.dataset;
    if (type === "single") {
      toggleSingleOption(group, option);
    } else {
      toggleMultiOption(group, option, Number(max));
    }
    render();
    return;
  }

  if (e.target.id === "add-to-cart-btn") {
    addDraftToCart();
    state.draft = null;
    renderToast("Item adicionado à sacola!");
    navigate("home");
    return;
  }

  // ---- Carrinho ----
  const removeItem = e.target.closest("[data-remove-item]");
  if (removeItem) {
    removeCartItem(removeItem.dataset.removeItem);
    render();
    return;
  }

  const cartQty = e.target.closest("[data-cart-qty]");
  if (cartQty) {
    const item = state.cart.find((i) => i.cartId === cartQty.dataset.cartQty);
    if (item) setCartQty(item.cartId, item.qty + Number(cartQty.dataset.delta));
    render();
    return;
  }

  if (e.target.id === "clear-cart") {
    clearCart();
    render();
    return;
  }

  // ---- Checkout: entrega ----
  const fulfillBtn = e.target.closest("[data-fulfillment]");
  if (fulfillBtn) {
    state.fulfillment = fulfillBtn.dataset.fulfillment;
    render();
    return;
  }

  if (e.target.id === "open-address-modal") {
    state.modal = { step: "city" };
    render();
    return;
  }

  if (e.target.id === "close-modal" || e.target.id === "modal-overlay") {
    state.modal = null;
    render();
    return;
  }

  const pickCity = e.target.closest("[data-pick-city]");
  if (pickCity) {
    state.modal = { step: "region", city: pickCity.dataset.pickCity };
    render();
    return;
  }

  if (e.target.closest("[data-modal-back]")) {
    state.modal = { step: "city" };
    render();
    return;
  }

  const pickRegion = e.target.closest("[data-pick-region]");
  if (pickRegion) {
    state.modal = { step: "form", city: state.modal.city, region: pickRegion.dataset.pickRegion };
    render();
    return;
  }

  if (e.target.id === "save-address") {
    const street = document.getElementById("addr-street").value.trim() || "Rua sem nome";
    const number = document.getElementById("addr-number").value.trim() || "s/n";
    state.address = {
      street,
      number,
      region: state.modal.region,
      city: state.modal.city,
      eta: "55-65 min",
      fee: 8.9,
    };
    state.modal = null;
    render();
    return;
  }

  if (e.target.id === "continue-pagamento" && !e.target.disabled) {
    navigate("checkout-pagamento");
    return;
  }

  // ---- Checkout: pagamento ----
  const pickPayment = e.target.closest("[data-pick-payment]");
  if (pickPayment) {
    state.paymentMethodId = pickPayment.dataset.pickPayment;
    render();
    return;
  }

  if (e.target.id === "continue-resumo" && !e.target.disabled) {
    navigate("checkout-resumo");
    return;
  }

  // ---- Checkout: resumo ----
  if (e.target.id === "finish-order") {
    state.lastOrderId = String(Math.floor(100000 + Math.random() * 900000));
    clearCart();
    state.address = null;
    state.paymentMethodId = null;
    navigate("confirmacao");
    return;
  }
});

document.addEventListener("input", (e) => {
  if (e.target.id === "obs-input" && state.draft) {
    state.draft.notes = e.target.value;
  }
});
