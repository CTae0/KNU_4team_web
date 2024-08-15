const fetchProductList = async () => {
  try {
    const fetchResult = await fetch("/api/product/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (fetchResult.ok) {
      const result = await fetchResult.json();
      return result.data;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
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

  const groupedCartItems = cart.reduce((acc, item) => {
    if (!acc[item.productId]) {
      acc[item.productId] = { ...item };
    } else {
      acc[item.productId].quantity += item.quantity;
    }
    return acc;
  }, {});

  cartItemsContainer.innerHTML = "";
  let totalAmount = 0;

  Object.values(groupedCartItems).forEach((cartItem) => {
    const product = productList.find((p) => p.productId === cartItem.productId);

    if (product) {
      const itemElem = document.createElement("div");
      itemElem.classList.add("cart-item");
      const itemTotalPrice = product.price * cartItem.quantity;
      totalAmount += itemTotalPrice;

      itemElem.innerHTML = `
            <div>
              <h3>상품명: ${product.title}</h3>
              <img src="${product.imgUrl}" alt="${product.title}" style="width: 100px; height: auto; margin-right: 20px;" />
              <p>가격: ${product.price} 원</p>
              <p>상세설명: ${product.description}</p>
              <p>구매 수량: ${cartItem.quantity} 개</p>
              <p>총 가격: ${itemTotalPrice} 원</p>
            </div>
            <hr />
          `;
      cartItemsContainer.appendChild(itemElem);
    }
  });

  document.getElementById(
    "total-amount"
  ).textContent = `전체 총 가격: ${totalAmount} 원`;
};

renderCartItems();
