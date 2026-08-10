# Sujula Frontend

## Overview

Sujula Frontend is a React marketplace application for the Sujula platform.

The current implementation focuses on the **marketplace landing page** and the frontend integration required to manage:

- Language
- Currency
- Delivery location
- Marketplace content
- Product discovery
- Cart interactions

The frontend follows the **Sujula Frontend Integration Guide** by centralizing request context and configuring a single Axios client with a request interceptor.

API requests automatically include the request-context headers required by the backend:

- `Accept-Language`
- `X-Currency`
- `X-Latitude`
- `X-Longitude`

---

# Current Implementation Status

The marketplace landing page is implemented and currently runs using **frontend mock data** while backend services are being developed.

The landing page UI is functional, but several navigation destinations and marketplace workflows are intentionally still placeholders.

### Status Summary

| Feature                  | Status     | Current Behaviour                                                                   |
|--------------------------|------------|-------------------------------------------------------------------------------------|
| Marketplace landing page | Implemented| Fully rendered                                                                      |
| Top navbar               | mplemented | Contact, currency and language controls                                             |
| Main navbar              | Partial    | Navigation destinations still being implemented                                     |
| Currency selector        | Development| GMD, USD, EUR and GBP selectors available; mock data currently populated for GMD/USD|
| Google Translate         | Implemented| Translates visible landing page                                                     |
| Delivery location display| Implemented| Delivery destination is displayed                                                   |
| Delivery location form   | Development| UI available; real geocoding is pending                                             |
| Category sidebar         | Partial    | Categories are displayed; category destinations are placeholders                    |
| Hero section             | Implemented| Landing-page content displayed                                                      |
| Categories section       | Partial    | Categories display correctly; category navigation is not yet implemented            |
| Promotions section       | Partial    | Promotional content displays; promotion navigation is pending                       |
| New arrivals             | Development| Mock products displayed                                                             |
| Bestsellers              | Development| Mock products displayed                                                             |
| Product cards            | Development| Product information and actions are present                                         |
| Search interface         | Partial    | Search navigation exists; results page is currently a placeholder                   |
| Explore                  | Placeholder| Currently opens the search-results placeholder                                      |
| Promotions navigation    | Pending    | Destination route is not yet implemented                                            |
| Start Shopping           | Pending    | Currently leads to an unimplemented route                                           |
| View Promotions          | Pending    | Currently leads to an unimplemented route                                           |
| Cart                     | Development| Cart navigation/service is present; full cart workflow is pending                   |
| Footer                   | Implemented| Marketplace footer displayed                                                        |
| Production API           | Pending    | Mock data currently enabled                                                         |
| Production geocoding     | Pending    | Will be implemented later                                                           |
| Authentication           | Pending    | Not yet implemented                                                                 |
| Checkout                 | Pending    | Not yet implemented                                                                 |

---

# Current Scope

The current implementation includes the marketplace landing page with:

- Top utility navbar
- Main navbar
- Marketplace logo
- Search interface
- Explore navigation
- Promotions navigation
- Cart button
- Delivery-location display
- Delivery-location interface
- Category sidebar
- Hero section
- Product categories
- Promotions
- New arrivals
- Bestsellers
- Product cards
- Add-to-cart interaction
- Footer
- Currency selector
- Language selector
- Google Translate integration

The following features are **outside the current implementation scope**:

- Authentication
- Checkout
- Order tracking
- Seller dashboards
- Wishlists
- User account management
- Full product detail pages
- Full cart/checkout workflow
- Production geocoding

---


## Known Limitations

The current landing-page implementation is intentionally limited to the marketplace landing page.

The following navigation and actions are currently placeholders or pending implementation:

- **Explore**
  - Navigates to the current Search Results placeholder.
  - The page currently displays: `Search results will appear here.`

- **Category buttons**
  - Category data is displayed on the landing page.
  - Full category browsing/navigation is not yet implemented.

- **Promotions**
  - The Promotions navigation button is currently not connected to a dedicated promotions page.

- **Start Shopping**
  - The button currently targets a route that is not yet implemented and therefore may display the `404 Page not found` page.

- **View Promotions**
  - The button currently targets a route that is not yet implemented and therefore may display the `404 Page not found` page.

- **Product detail pages**
  - Not yet implemented.

- **Full search functionality**
  - The search-results page is currently a placeholder.

- **Geocoding**
  - Delivery-address-to-coordinate geocoding will be implemented in a later phase.
  - The current implementation maintains delivery address, latitude, and longitude as request context.

### Delivery Location

The application treats the selected delivery location as the destination for marketplace delivery.

It does **not** use the user's current physical location as the delivery destination.

The current implementation supports storing:

```js
{
  deliveryAddress,
  deliveryLatitude,
  deliveryLongitude
}
These limitations are expected at this stage and will be addressed as the corresponding marketplace features are implemented.