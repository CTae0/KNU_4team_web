const fetchProductList = async () => {
  try {
    const fetchResult = await fetch("/api/product/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (fetchResult.ok) {
      const result = await fetchResult.json();
      console.log("fetchResult 전송", result.data);
      return result.data;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

const updateCartItemQuantity = (productId, newQuantity) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const itemIndex = cart.findIndex((item) => item.productId === productId);
  if (itemIndex > -1) {
    cart[itemIndex].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const renderCartItems = async () => {
  const productList = await fetchProductList();
  if (!productList) {
    console.log("empty productList");
    return;
  }

  const cartItemsContainer = document.getElementById("cart-items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>장바구니가 비어 있습니다.</p>";
    return;
  }

  // 장바구니 항목 그룹화
  const groupedCartItems = cart.reduce((acc, item) => {
    if (!acc[item.productId]) {
      acc[item.productId] = { ...item };
    } else {
      acc[item.productId].quantity += item.quantity;
    }
    return acc;
  }, {});

  // 장바구니 항목 렌더링
  cartItemsContainer.innerHTML = ""; // Clear previous content
  Object.values(groupedCartItems).forEach((cartItem) => {
    const product = productList.find((p) => p.productId === cartItem.productId);

    if (product) {
      const itemElem = document.createElement("div");
      itemElem.innerHTML = `
          <div class="cart-item" style="display: flex; align-items: center; margin-bottom: 20px;">
            <img src="${product.imgUrl}" alt="${product.title}" style="width: 100px; height: auto; margin-right: 20px;" />
            <div>
              <div>상품명: ${product.title}</div>
              <div>가격: ${product.price} 원</div>
              <div>상세설명: ${product.description}</div>
              <div>
                선택한 수량: 
                <input type="number" class="quantity-input" data-product-id="${product.productId}" value="${cartItem.quantity}" min="1" max="${product.stock}" style="width: 60px;" />
              </div>
            </div>
          </div>
          <hr />
        `;
      cartItemsContainer.appendChild(itemElem);
    }
  });

  // 수량 조절 기능 이벤트 리스너
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", (event) => {
      const productId = parseInt(event.target.getAttribute("data-product-id"));
      const newQuantity = parseInt(event.target.value);

      if (newQuantity < 1) {
        alert("수량은 최소 1개 이상이어야 합니다.");
        event.target.value = 1;
        return;
      }

      const product = productList.find((p) => p.productId === productId);
      if (newQuantity > product.stock) {
        alert("재고 수량을 초과하였습니다.");
        event.target.value = product.stock;
        return;
      }

      // 장바구니 수량 업데이트
      updateCartItemQuantity(productId, newQuantity);
    });
  });
};

renderCartItems();
