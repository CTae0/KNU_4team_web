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
    itemElem.innerHTML = `
        <div> [상품번호]: ${v.productId} </div>
        <div>${v.title}</div>
        <div>
            <img src="${v.imgUrl}"/>
        </div>
        <div>[가격]: ${v.price}</div>
        <div> [상세설명]: ${v.description}</div>
        <div>[재고]: ${v.stock}</div>
    `;
    itemElem.addEventListener("click", () => {
      window.location.href = `/product/detail?prdN=${v.productId}`;
    });
    productListWrapper.append(itemElem);
  });
};

renderProductList();
