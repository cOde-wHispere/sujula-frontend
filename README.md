# Sujula Frontend

## Overview

Sujula Frontend is a React marketplace application for the Sujula platform.

The current implementation provides the marketplace landing page together with dedicated product discovery, search, category, and promotions experiences.

The frontend manages:

- Language
- Currency
- Delivery location
- Marketplace content
- Product discovery
- Product search
- Categories
- Promotions
- Cart interactions

The frontend follows the **Sujula Frontend Integration Guide** by centralizing request context and configuring a single Axios client with a request interceptor.

API requests automatically include the request-context headers required by the backend:

- `Accept-Language`
- `X-Currency`
- `X-Latitude`
- `X-Longitude`

---

# Current Implementation Status

The marketplace frontend currently runs using **frontend mock data** while backend services are being developed.

The core marketplace navigation and discovery flows are now implemented.

### Status Summary

| Feature                  | Status     | Current Behaviour                                                                   |
|--------------------------|------------|-------------------------------------------------------------------------------------|
| Marketplace landing page | Implemented| Fully rendered                                                                      |
| Top navbar               | Implemented| Contact, currency and language controls                                             |
| Main navbar              | Implemented| Home, Explore, Promotions and search navigation                                     |
| Currency selector        | Development| GMD, USD, EUR and GBP selectors available; mock data currently populated for GMD/USD|
| Google Translate         | Implemented| Translates visible landing page                                                     |
| Delivery location display| Implemented| Delivery destination is displayed                                                   |
| Delivery location form   | Development| UI available; real geocoding is pending                                             |
| Category sidebar         | Implemented| Categories are displayed and navigate to search/category                    |
| Hero section             | Implemented| Landing-page content displayed                                                      |
| Categories section       | Implemented| Dedicated category browsing page is available                                       |
| Promotions section       | Implemented| Promotional content is displayed                       |
| New arrivals             | Development| Mock products displayed                                                             |
| Bestsellers              | Development| Mock products displayed                                                             |
| Product cards            | Development| Product information and actions are present                                         |
| Search interface         | Implemented| Search query navigation is available                                                |
| Explore                  | Implemented| Dedicated `/explore` product discovery page                                         |
| Promotions navigation    | Implemented| Navigates to `/promotions`                                                          |
| Start Shopping           | Implemented| Navigates to `/explore`                                                             |
| View Promotions          | Implemented| Navigates to `/promotions`                                                          |
| Cart                     | Development| Cart navigation/service is present; full cart workflow is pending                   |
| Footer                   | Implemented| Marketplace footer displayed                                                        |
| Production API           | Pending    | Mock data currently enabled                                                         |
| Production geocoding     | Pending    | Will be implemented later                                                           |
| Authentication           | Pending    | Not yet implemented                                                                 |
| Checkout                 | Pending    | Not yet implemented                                                                 |

---

# Application Routes

The current frontend routing structure is:

| Route            | Page               | Purpose                                   |
|------------------|--------------------|-------------------------------------------|
| `/`              | `LandingPage`      | Marketplace homepage                      |
| `/search`        | `SearchResultsPage`| Product search results                    |
| `/categories`    | `CategoriesPage`   | Browse marketplace categories             |
| `/explore`       | `ExplorePage`      | Discover available marketplace products   |
| `/promotions`    | `PromotionsPage`   | Browse marketplace promotions             |
| `*`              | `NotFoundPage`     | Handles unknown routes                    |

The landing page navigation is connected to these routes.

For example:

```text
Start Shopping
      ↓
/explore
      ↓
ExplorePage