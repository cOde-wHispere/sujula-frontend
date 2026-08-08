const mockCart = [];

export async function addMockCartItem({
  productId,
  quantity = 1,
}) {
  await new Promise((resolve) => {
    setTimeout(resolve, 250);
  });

  const existing = mockCart.find(
    (item) => item.productId === productId
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    mockCart.push({
      productId,
      quantity,
    });
  }

  return {
    success: true,
    items: [...mockCart],
  };
}

export function getMockCart() {
  return [...mockCart];
}