import { apiClient } from "../api/client";
import ENDPOINTS from "../api/endpoints";

const USE_MOCK_API =
  process.env.REACT_APP_USE_MOCK_API === "true";

function normalizeCheckoutResponse(data) {
  if (!data || typeof data !== "object") {
    return null;
  }

  return data;
}

const checkoutService = {
  async createOrder({
    identity,
    delivery,
    payment,
    items,
    currency = "USD",
  }) {
    const payload = {
      identity,
      delivery,
      payment,
      items,
      currency: String(currency).toUpperCase(),
    };

    if (USE_MOCK_API) {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      const orderId = `MOCK-${Date.now()}`;

      console.info(
        "[MOCK API] Order creation",
        {
          orderId,
          payload,
        }
      );

      return {
        id: orderId,
        orderId,
        status: "created",
        ...payload,
      };
    }

    const response =
      await apiClient.post(
        ENDPOINTS.checkout.orders,
        payload
      );

    return normalizeCheckoutResponse(
      response.data
    );
  },
};

export default checkoutService;