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

const productListWrapper = document.getElementById("product-detail");
const renderProductList = async () => {
  const productList = await fetchProductList();
  if (!productList || productList.length === 0) {
    console.log("empty productList");
    return;
  }
  const queryString = window.location.search;
  const productNumberMatch = queryString.match(/\d+/);
  const productNumber = productNumberMatch ? productNumberMatch[0] : "";
  console.log("productNumber: ", productNumber);
  const v = productList[productNumber];
  const itemElem = document.createElement("div");
  console.log(productList[0]);
  itemElem.innerHTML = `
    <div class="product-img">
        <img src="${v.imgUrl}" alt="${
    v.title
  }" style="max-width: 100%; height: auto;"/>
    </div>
    <div class="product-info">
        <div>[상품번호]: ${v.productId + 1} 번</div>
        <div>${v.title}</div>
        <div>[가격]: ${v.price}</div>
        <div>[상세설명]: ${v.description}</div>
        <div>[재고]: ${v.stock}</div>
    </div>
    <div class="button-container">
        <button class="button">장바구니</button>
        <button class="button checkout">결제</button>
    </div>
  `;
  productListWrapper.append(itemElem);
};

renderProductList();
