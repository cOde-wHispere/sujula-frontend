let MOCK_CART = {
  items: [],
};

const MOCK_PRODUCTS = [
  {
    id: "new-1",
    name: "Smartphone Pro",
    basePriceUSD: 1850,
    image: "",
  },
  {
    id: "new-2",
    name: "Wireless Headphones",
    basePriceUSD: 275,
    image: "",
  },
  {
    id: "new-3",
    name: "Laptop 14",
    basePriceUSD: 3250,
    image: "",
  },
  {
    id: "new-4",
    name: "Smart Watch",
    basePriceUSD: 395,
    image: "",
  },
  {
    id: "best-1",
    name: "Android Smartphone",
    basePriceUSD: 1250,
    image: "",
  },
  {
    id: "best-2",
    name: "Bluetooth Speaker",
    basePriceUSD: 185,
    image: "",
  },
  {
    id: "best-3",
    name: "Laptop Backpack",
    basePriceUSD: 125,
    image: "",
  },
  {
    id: "best-4",
    name: "Wireless Mouse",
    basePriceUSD: 65,
    image: "",
  },
];

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

function getSupportedCurrency(currency) {
  const normalizedCurrency =
    String(currency || "USD").toUpperCase();

  return MOCK_EXCHANGE_RATES[
    normalizedCurrency
  ]
    ? normalizedCurrency
    : "USD";
}

function getProductById(productId) {
  return MOCK_PRODUCTS.find(
    (product) => product.id === productId
  );
}

function buildCart(currency = "USD") {
  const supportedCurrency =
    getSupportedCurrency(currency);

  const exchangeRate =
    MOCK_EXCHANGE_RATES[supportedCurrency];

  const items = MOCK_CART.items
    .map((item) => {
      const product = getProductById(
        item.productId
      );

      if (!product) {
        return null;
      }

      const numericUnitPrice =
        product.basePriceUSD *
        exchangeRate;

      const numericSubtotal =
        numericUnitPrice * item.quantity;

      return {
        id: item.productId,
        productId: item.productId,
        name: product.name,
        image: product.image,
        quantity: item.quantity,

        unitPrice: formatPrice(
          product.basePriceUSD,
          supportedCurrency
        ),

        subtotal: formatPrice(
          product.basePriceUSD *
            item.quantity,
          supportedCurrency
        ),

        // Keep numeric values available for
        // future calculations/order processing.
        unitPriceAmount:
          numericUnitPrice,

        subtotalAmount:
          numericSubtotal,
      };
    })
    .filter(Boolean);

  const subtotal = items.reduce(
    (total, item) =>
      total + item.subtotalAmount,
    0
  );

  return {
    items: clone(items),

    itemCount: items.reduce(
      (count, item) =>
        count + item.quantity,
      0
    ),

    subtotal: formatPrice(
      subtotal / exchangeRate,
      supportedCurrency
    ),

    total: formatPrice(
      subtotal / exchangeRate,
      supportedCurrency
    ),

    currency: supportedCurrency,
  };
}

export async function getMockCart({
  currency = "USD",
} = {}) {
  await new Promise((resolve) => {
    setTimeout(resolve, 250);
  });

  console.info(
    "[MOCK API] Cart request",
    {
      currency,
    }
  );

  return buildCart(currency);
}

export async function addMockCartItem({
  productId,
  quantity = 1,
  currency = "USD",
}) {
  await new Promise((resolve) => {
    setTimeout(resolve, 250);
  });

  const normalizedProductId =
    String(productId || "").trim();

  const normalizedQuantity = Math.max(
    1,
    Math.floor(Number(quantity) || 1)
  );

  const product = getProductById(
    normalizedProductId
  );

  if (!product) {
    throw new Error(
      "Product could not be found."
    );
  }

  const existingItem =
    MOCK_CART.items.find(
      (item) =>
        item.productId ===
        normalizedProductId
    );

  if (existingItem) {
    existingItem.quantity +=
      normalizedQuantity;
  } else {
    MOCK_CART.items.push({
      productId: normalizedProductId,
      quantity: normalizedQuantity,
    });
  }

  console.info(
    "[MOCK API] Cart item added",
    {
      productId: normalizedProductId,
      quantity: normalizedQuantity,
    }
  );

  return buildCart(currency);
}

export async function updateMockCartItem({
  productId,
  quantity,
  currency = "USD",
}) {
  await new Promise((resolve) => {
    setTimeout(resolve, 250);
  });

  const normalizedProductId =
    String(productId || "").trim();

  const normalizedQuantity =
    Number(quantity);

  const item =
    MOCK_CART.items.find(
      (cartItem) =>
        cartItem.productId ===
        normalizedProductId
    );

  if (!item) {
    throw new Error(
      "Cart item could not be found."
    );
  }

  if (
    !Number.isFinite(
      normalizedQuantity
    ) ||
    normalizedQuantity <= 0
  ) {
    MOCK_CART.items =
      MOCK_CART.items.filter(
        (cartItem) =>
          cartItem.productId !==
          normalizedProductId
      );
  } else {
    item.quantity = Math.floor(
      normalizedQuantity
    );
  }

  console.info(
    "[MOCK API] Cart item updated",
    {
      productId: normalizedProductId,
      quantity: normalizedQuantity,
    }
  );

  return buildCart(currency);
}

export async function removeMockCartItem({
  productId,
  currency = "USD",
}) {
  await new Promise((resolve) => {
    setTimeout(resolve, 250);
  });

  const normalizedProductId =
    String(productId || "").trim();

  MOCK_CART.items =
    MOCK_CART.items.filter(
      (item) =>
        item.productId !==
        normalizedProductId
    );

  console.info(
    "[MOCK API] Cart item removed",
    {
      productId: normalizedProductId,
    }
  );

  return buildCart(currency);
}

export function clearMockCart() {
  MOCK_CART = {
    items: [],
  };
}