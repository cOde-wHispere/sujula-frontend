import { apiClient } from "../api/client";
import ENDPOINTS from "../api/endpoints";

import {
  getMockCart,
  addMockCartItem,
  updateMockCartItem,
  removeMockCartItem,
} from "./mock/cartMockData";

const USE_MOCK_API =
  process.env.REACT_APP_USE_MOCK_API === "true";

const cartService = {
  async getCart({
    currency = "USD",
  } = {}) {
    if (USE_MOCK_API) {
      return getMockCart({
        currency,
      });
    }

    const response = await apiClient.get(
      ENDPOINTS.cart.items,
      {
        params: {
          currency,
        },
      }
    );

    return response.data;
  },

  async addItem({
    productId,
    quantity = 1,
    currency = "USD",
  }) {
    if (USE_MOCK_API) {
      return addMockCartItem({
        productId,
        quantity,
        currency,
      });
    }

    const response = await apiClient.post(
      ENDPOINTS.cart.items,
      {
        productId,
        quantity,
      }
    );

    return response.data;
  },

  async updateItem({
    productId,
    quantity,
    currency = "USD",
  }) {
    if (USE_MOCK_API) {
      return updateMockCartItem({
        productId,
        quantity,
        currency,
      });
    }

    const response = await apiClient.patch(
      `${ENDPOINTS.cart.items}/${encodeURIComponent(
        productId
      )}`,
      {
        quantity,
      }
    );

    return response.data;
  },

  async removeItem({
    productId,
    currency = "USD",
  }) {
    if (USE_MOCK_API) {
      return removeMockCartItem({
        productId,
        currency,
      });
    }

    const response = await apiClient.delete(
      `${ENDPOINTS.cart.items}/${encodeURIComponent(
        productId
      )}`
    );

    return response.data;
  },
};

export default cartService;