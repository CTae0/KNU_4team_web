const ordererName = document.getElementById("orderer-name");
const ordererPhone = document.getElementById("orderer-phone");
const ordererEmail = document.getElementById("orderer-email");

const shippingName = document.getElementById("shipping-name");
const shippingAddress = document.getElementById("shipping-address");
const shippingPhone = document.getElementById("shipping-phone");

const orderButton = document.getElementById("payment-button");

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
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                  <img src="${product.imgUrl}" alt="${product.title}" style="width: 100px; height: auto; margin-right: 20px;" />
                  <div>
                    <h3>${product.title}</h3>
                    <p>가격: ${product.price} 원</p>
                    <p>구매 수량: ${cartItem.quantity} 개</p>
                    <p>총 가격: ${itemTotalPrice} 원</p>
                  </div>
                </div>
                <hr />
              `;
      cartItemsContainer.appendChild(itemElem);
    }
  });

  document.getElementById(
    "total-amount"
  ).textContent = `전체 총 가격: ${totalAmount} 원`;

  const orderConfirmationCheckbox =
    document.getElementById("order-confirmation");
  const paymentButton = document.getElementById("payment-button");

  orderConfirmationCheckbox.addEventListener("change", () => {
    paymentButton.disabled = !orderConfirmationCheckbox.checked;
  });
};

renderCartItems();

orderButton.addEventListener("click", async () => {
  const order = {
    ordererName: ordererName.value,
    ordererPhone: ordererPhone.value,
    ordererEmail: ordererEmail.value,
    shippingName: shippingName.value,
    shippingAddress: shippingAddress.value,
    shippingPhone: shippingPhone.value,
    productID: localStorage.getItem("cart"),
  };
  //  console.log(user);
  try {
    const orderResult = await fetch("/api/order", {
      method: "post",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (orderResult.ok) {
      console.log(order);
      window.location.href = "../";
      localStorage.removeItem("cart");
      alert("주문 성공");
    } else {
      alert("(!)주문 실패");
    }
  } catch (err) {
    console.error(err);
  }
});
