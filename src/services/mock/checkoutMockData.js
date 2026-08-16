const MOCK_CHECKOUT_STATE = {
  identity: {
    fullName: "",
    phone: "",
  },

  delivery: {
    deliveryAddress: "",
    deliveryLatitude: null,
    deliveryLongitude: null,
  },

  payment: {
    paymentMethod: "",
  },
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 300);
  });
}

export async function validateMockIdentity({
  fullName,
  phone,
}) {
  await delay();

  const normalizedName =
    String(fullName || "").trim();

  const normalizedPhone =
    String(phone || "").trim();

  if (!normalizedName) {
    throw new Error(
      "Please enter your full name."
    );
  }

  if (!normalizedPhone) {
    throw new Error(
      "Please enter your phone number."
    );
  }

  return {
    valid: true,
    identity: {
      fullName: normalizedName,
      phone: normalizedPhone,
    },
  };
}

export async function validateMockDelivery({
  deliveryAddress,
  deliveryLatitude = null,
  deliveryLongitude = null,
}) {
  await delay();

  const normalizedAddress =
    String(deliveryAddress || "").trim();

  if (!normalizedAddress) {
    throw new Error(
      "Please enter a delivery address."
    );
  }

  return {
    valid: true,
    delivery: {
      deliveryAddress: normalizedAddress,
      deliveryLatitude,
      deliveryLongitude,
    },
  };
}

export async function validateMockPayment({
  paymentMethod,
}) {
  await delay();

  const normalizedPaymentMethod =
    String(paymentMethod || "").trim();

  if (!normalizedPaymentMethod) {
    throw new Error(
      "Please select a payment method."
    );
  }

  return {
    valid: true,
    payment: {
      paymentMethod:
        normalizedPaymentMethod,
    },
  };
}

export async function getMockCheckoutReview({
  identity,
  delivery,
  payment,
}) {
  await delay();

  return {
    identity: clone(
      identity || MOCK_CHECKOUT_STATE.identity
    ),

    delivery: clone(
      delivery || MOCK_CHECKOUT_STATE.delivery
    ),

    payment: clone(
      payment || MOCK_CHECKOUT_STATE.payment
    ),
  };
}