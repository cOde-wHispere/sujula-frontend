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

## Current Scope

The current implementation includes the marketplace landing page with:

- Top utility navbar
- Main navbar
- Marketplace logo
- Search
- Explore navigation
- Promotions navigation
- Cart button
- Delivery-location display
- Delivery-location modal
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

The following features are **outside the current scope**:

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

## Features

### Marketplace Landing Page

The landing page provides:

- Hero marketplace section
- Product category browsing
- Promotional content
- New-arrival products
- Bestseller products
- Product search
- Add-to-cart actions
- Responsive marketplace navigation

### Request Context

The application maintains global request context containing:

```js
{
  currency,
  language,
  deliveryAddress,
  deliveryLatitude,
  deliveryLongitude
}