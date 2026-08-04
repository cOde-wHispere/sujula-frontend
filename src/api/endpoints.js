export const API_ENDPOINTS = {
  USERS: "/api/users",

  USER_PREFERENCES: (userId) =>
    `/api/users/${userId}/preferences`,
};