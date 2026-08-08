import { apiClient } from "../api/client";
import ENDPOINTS from "../api/endpoints";

import {
  addMockCartItem,
} from "./mock/cartMockData";

const USE_MOCK_API =
  process.env.REACT_APP_USE_MOCK_API === "true";

const cartService = {
  async addItem({
    productId,
    quantity = 1,
  }) {
    if (USE_MOCK_API) {
      return addMockCartItem({
        productId,
        quantity,
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
};

export default cartService;