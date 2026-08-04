import { apiClient } from "../api/client";
import { API_ENDPOINTS } from "../api/endpoints";

export async function updatePreferences(userId, payload) {
  const response = await apiClient.patch(
    API_ENDPOINTS.USER_PREFERENCES(userId),
    payload
  );

  return response.data;
}