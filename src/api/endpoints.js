const ENDPOINTS = {
  landing: {
    categories: "/api/categories",
    promotions: "/api/promotions",
    newArrivals:
      "/api/products/new-arrivals",
    bestsellers:
      "/api/products/bestsellers",
    search: "/api/products/search",
    products: "/api/products",
  },

  cart: {
    items: "/api/cart/items",
  },

  checkout: {
    orders: "/api/orders",
  },
};

export default ENDPOINTS;