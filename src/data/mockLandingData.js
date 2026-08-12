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
      basePriceUSD: 1850,
    },
    {
      id: "new-2",
      name: "Wireless Headphones",
      basePriceUSD: 275,
    },
    {
      id: "new-3",
      name: "Laptop 14",
      basePriceUSD: 3250,
    },
    {
      id: "new-4",
      name: "Smart Watch",
      basePriceUSD: 395,
    },
  ],

  bestsellers: [
    {
      id: "best-1",
      name: "Android Smartphone",
      basePriceUSD: 1250,
    },
    {
      id: "best-2",
      name: "Bluetooth Speaker",
      basePriceUSD: 185,
    },
    {
      id: "best-3",
      name: "Laptop Backpack",
      basePriceUSD: 125,
    },
    {
      id: "best-4",
      name: "Wireless Mouse",
      basePriceUSD: 65,
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

function formatProducts(products, currency) {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: formatPrice(
      product.basePriceUSD,
      currency
    ),
  }));
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

  const allProducts = [
    ...MOCK_CATALOG.newArrivals,
    ...MOCK_CATALOG.bestsellers,
  ];

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