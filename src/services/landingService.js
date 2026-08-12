import { apiClient } from "../api/client";
import ENDPOINTS from "../api/endpoints";

import {
  getMockLandingData,
  searchMockProducts,
} from "../data/mockLandingData";

// Keep mock mode enabled until the backend is available.
const USE_MOCK_DATA = true;

function normalizeListResponse(data) {
  return Array.isArray(data) ? data : [];
}

const landingService = {
  async getLandingData({
    currency = "USD",
    latitude = null,
    longitude = null,
  }) {
    const requestContext = {
      currency: String(currency).toUpperCase(),
      latitude,
      longitude,
    };

    // ----------------------------------------
    // FRONTEND DEVELOPMENT / MOCK MODE
    // ----------------------------------------
    if (USE_MOCK_DATA) {
      return getMockLandingData(
        requestContext
      );
    }

    // ----------------------------------------
    // BACKEND MODE
    // ----------------------------------------
    const [
      categoriesResponse,
      promotionsResponse,
      newArrivalsResponse,
      bestsellersResponse,
    ] = await Promise.all([
      apiClient.get(
        ENDPOINTS.landing.categories,
        {
          params: requestContext,
        }
      ),

      apiClient.get(
        ENDPOINTS.landing.promotions,
        {
          params: requestContext,
        }
      ),

      apiClient.get(
        ENDPOINTS.landing.newArrivals,
        {
          params: requestContext,
        }
      ),

      apiClient.get(
        ENDPOINTS.landing.bestsellers,
        {
          params: requestContext,
        }
      ),
    ]);

    return {
      categories: normalizeListResponse(
        categoriesResponse.data
      ),

      promotions: normalizeListResponse(
        promotionsResponse.data
      ),

      newArrivals: normalizeListResponse(
        newArrivalsResponse.data
      ),

      bestsellers: normalizeListResponse(
        bestsellersResponse.data
      ),
    };
  },

  async searchProducts({
    query,
    currency = "USD",
    latitude = null,
    longitude = null,
  }) {
    const normalizedQuery =
      String(query || "").trim();

    if (!normalizedQuery) {
      return [];
    }

    const requestContext = {
      q: normalizedQuery,
      currency: String(currency).toUpperCase(),
      latitude,
      longitude,
    };

    // ----------------------------------------
    // FRONTEND DEVELOPMENT / MOCK MODE
    // ----------------------------------------
    if (USE_MOCK_DATA) {
      return searchMockProducts({
        query: normalizedQuery,
        currency: requestContext.currency,
      });
    }

    // ----------------------------------------
    // BACKEND MODE
    // ----------------------------------------
    const response = await apiClient.get(
      ENDPOINTS.landing.search,
      {
        params: requestContext,
      }
    );

    return normalizeListResponse(
      response.data
    );
  },
};

export default landingService;