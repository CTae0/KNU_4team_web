document.addEventListener("DOMContentLoaded", () => {
  // 상품 데이터 배열 (샘플 데이터)
  const products = [
    {
      id: 1,
      name: "쌀",
      description: "신선한 쌀입니다.",
      stock: 20,
      price: "₩50,000",
      image: "https://via.placeholder.com/250x150?text=Rice",
    },
    {
      id: 2,
      name: "고구마",
      description: "달콤한 고구마입니다.",
      stock: 15,
      price: "₩30,000",
      image: "https://via.placeholder.com/250x150?text=Sweet+Potato",
    },
    {
      id: 3,
      name: "감자",
      description: "다양하게 조리할 수 있는 감자입니다.",
      stock: 10,
      price: "₩20,000",
      image: "https://via.placeholder.com/250x150?text=Potato",
    },
    {
      id: 4,
      name: "옥수수",
      description: "달콤한 옥수수입니다.",
      stock: 25,
      price: "₩40,000",
      image: "https://via.placeholder.com/250x150?text=Corn",
    },
    {
      id: 5,
      name: "당근",
      description: "신선한 당근입니다.",
      stock: 30,
      price: "₩25,000",
      image: "https://via.placeholder.com/250x150?text=Carrot",
    },
  ];

  const productListContainer = document.querySelector(
    ".product-list-container"
  );

  // 상품 데이터로부터 HTML을 생성하여 리스트에 추가
  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    productItem.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p class="price">${product.price}</p>
                <p class="stock">In Stock: ${product.stock}</p>
                <a href="product-detail.html?productId=${product.id}">View Details</a>
            </div>
        `;

    productListContainer.appendChild(productItem);
  });
});
