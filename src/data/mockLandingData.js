const MOCK_CATALOG = {
  categories: [
    {
      id: "electronics",
      name: "Electronics",
      description:
        "Phones, accessories, gadgets and electronics.",
    },
    {
      id: "fashion",
      name: "Fashion",
      description:
        "Clothing, shoes, bags and accessories.",
    },
    {
      id: "home-kitchen",
      name: "Home and Kitchen",
      description:
        "Products for your home and kitchen.",
    },
    {
      id: "beauty",
      name: "Beauty",
      description:
        "Beauty, skincare and personal care.",
    },
    {
      id: "groceries",
      name: "Groceries",
      description:
        "Everyday groceries and household essentials.",
    },
    {
      id: "phones",
      name: "Phones",
      description:
        "Smartphones and mobile accessories.",
    },
    {
      id: "computers",
      name: "Computers",
      description:
        "Laptops, computers and accessories.",
    },
  ],

  promotions: [
    {
      id: "promo-1",
      title: "Weekend Marketplace Deals",
      description:
        "Save on selected products this weekend.",
    },
    {
      id: "promo-2",
      title: "New Customer Offers",
      description:
        "Discover special offers from selected sellers.",
    },
  ],

  newArrivals: [
    {
      id: "new-1",
      name: "Smartphone Pro",
      description:
        "A powerful smartphone designed for everyday productivity, communication and entertainment.",
      category: "Phones",
      basePriceUSD: 1850,
      image: "",
      seller: "Sujula Marketplace Seller",
      stock: 15,
      sku: "SUJ-NEW-001",
    },
    {
      id: "new-2",
      name: "Wireless Headphones",
      description:
        "Comfortable wireless headphones with clear audio for music, calls and entertainment.",
      category: "Electronics",
      basePriceUSD: 275,
      image: "",
      seller: "Sujula Marketplace Seller",
      stock: 24,
      sku: "SUJ-NEW-002",
    },
    {
      id: "new-3",
      name: "Laptop 14",
      description:
        "A compact 14-inch laptop suitable for work, study, browsing and everyday computing.",
      category: "Computers",
      basePriceUSD: 3250,
      image: "",
      seller: "Sujula Marketplace Seller",
      stock: 8,
      sku: "SUJ-NEW-003",
    },
    {
      id: "new-4",
      name: "Smart Watch",
      description:
        "A modern smartwatch for notifications, activity tracking and everyday convenience.",
      category: "Electronics",
      basePriceUSD: 395,
      image: "",
      seller: "Sujula Marketplace Seller",
      stock: 18,
      sku: "SUJ-NEW-004",
    },
  ],

  bestsellers: [
    {
      id: "best-1",
      name: "Android Smartphone",
      description:
        "A reliable Android smartphone offering everyday performance, communication and entertainment features.",
      category: "Phones",
      basePriceUSD: 1250,
      image: "",
      seller: "Sujula Marketplace Seller",
      stock: 20,
      sku: "SUJ-BEST-001",
    },
    {
      id: "best-2",
      name: "Bluetooth Speaker",
      description:
        "Portable Bluetooth speaker designed for convenient wireless audio at home or on the go.",
      category: "Electronics",
      basePriceUSD: 185,
      image: "",
      seller: "Sujula Marketplace Seller",
      stock: 30,
      sku: "SUJ-BEST-002",
    },
    {
      id: "best-3",
      name: "Laptop Backpack",
      description:
        "Durable backpack designed to safely carry laptops and everyday work or study accessories.",
      category: "Fashion",
      basePriceUSD: 125,
      image: "",
      seller: "Sujula Marketplace Seller",
      stock: 16,
      sku: "SUJ-BEST-003",
    },
    {
      id: "best-4",
      name: "Wireless Mouse",
      description:
        "Compact wireless mouse suitable for laptops, desktops and everyday productivity.",
      category: "Computers",
      basePriceUSD: 65,
      image: "",
      seller: "Sujula Marketplace Seller",
      stock: 40,
      sku: "SUJ-BEST-004",
    },
  ],
};

const MOCK_EXCHANGE_RATES = {
  USD: 1,
  GMD: 73,
  EUR: 0.86,
  GBP: 0.75,
};

const CURRENCY_LOCALES = {
  USD: "en-US",
  GMD: "en-GM",
  EUR: "de-DE",
  GBP: "en-GB",
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function formatPrice(amountUSD, currency) {
  const exchangeRate =
    MOCK_EXCHANGE_RATES[currency] ||
    MOCK_EXCHANGE_RATES.USD;

  const convertedAmount =
    amountUSD * exchangeRate;

  return new Intl.NumberFormat(
    CURRENCY_LOCALES[currency] || "en-US",
    {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }
  ).format(convertedAmount);
}

function formatProduct(product, currency) {
  if (!product) {
    return null;
  }

  return {
    ...clone(product),
    price: formatPrice(
      product.basePriceUSD,
      currency
    ),
  };
}

function formatProducts(products, currency) {
  return products.map((product) =>
    formatProduct(product, currency)
  );
}

function getAllProducts() {
  return [
    ...MOCK_CATALOG.newArrivals,
    ...MOCK_CATALOG.bestsellers,
  ];
}

export async function getMockLandingData({
  currency = "USD",
  latitude = null,
  longitude = null,
}) {
  await new Promise((resolve) => {
    setTimeout(resolve, 300);
  });

  console.info(
    "[MOCK API] Landing request",
    {
      currency,
      latitude,
      longitude,
    }
  );

  const supportedCurrency =
    MOCK_EXCHANGE_RATES[currency]
      ? currency
      : "USD";

  return {
    categories: clone(
      MOCK_CATALOG.categories
    ),

    promotions: clone(
      MOCK_CATALOG.promotions
    ),

    newArrivals: formatProducts(
      MOCK_CATALOG.newArrivals,
      supportedCurrency
    ),

    bestsellers: formatProducts(
      MOCK_CATALOG.bestsellers,
      supportedCurrency
    ),
  };
}

export async function searchMockProducts({
  query = "",
  currency = "USD",
}) {
  await new Promise((resolve) => {
    setTimeout(resolve, 300);
  });

  const normalizedQuery =
    String(query).trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  const allProducts = getAllProducts();

  const matchingProducts =
    allProducts.filter((product) =>
      product.name
        .toLowerCase()
        .includes(normalizedQuery)
    );

  const supportedCurrency =
    MOCK_EXCHANGE_RATES[currency]
      ? currency
      : "USD";

  console.info(
    "[MOCK API] Product search",
    {
      query: normalizedQuery,
      currency: supportedCurrency,
    }
  );

  return formatProducts(
    matchingProducts,
    supportedCurrency
  );
}

export async function getMockProductById({
  productId,
  currency = "USD",
}) {
  await new Promise((resolve) => {
    setTimeout(resolve, 300);
  });

  const normalizedProductId =
    String(productId || "").trim();

  if (!normalizedProductId) {
    return null;
  }

  const product = getAllProducts().find(
    (item) => item.id === normalizedProductId
  );

  const supportedCurrency =
    MOCK_EXCHANGE_RATES[currency]
      ? currency
      : "USD";

  console.info(
    "[MOCK API] Product details request",
    {
      productId: normalizedProductId,
      currency: supportedCurrency,
    }
  );

  return formatProduct(
    product,
    supportedCurrency
  );
}