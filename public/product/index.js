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

const productListWrapper = document.getElementById("product-list-wrapper");

const renderProductList = async () => {
  const productList = await fetchProductList();
  if (!productList || productList.length === 0) {
    console.log("empty productList");
    return;
  }
  console.log("productList: ", productList);
  productList.forEach((v) => {
    const itemElem = document.createElement("div");
    itemElem.classList.add("product-item"); // 추가된 클래스

    // 가격을 세 자리마다 쉼표 추가
    const formattedPrice = Number(v.price).toLocaleString();

    itemElem.innerHTML = `
        <div class="product-image">
            <img src="${v.imgUrl}" alt="${v.title}"/>
        </div>
        <div class="product-info">
            <div class="product-id">${v.productId + 1}</div>
            <h2 class="product-title">${v.title}</h2>
            <p class="product-description">${v.description}</p>
            <div class="price">${formattedPrice}원</div>
            <div class="product-stock">재고: ${v.stock}</div>
        </div>
    `;
    itemElem.addEventListener("click", () => {
      window.location.href = `/product/detail?prdN=${v.productId}`;
    });
    productListWrapper.append(itemElem);
  });
};

renderProductList();
