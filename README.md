# Sujula Frontend

## Overview

This project is the React frontend foundation for Sujula's Language, Currency, and Delivery Location integration.

It ensures that every request sent to the Sujula backend automatically includes:

* `Accept-Language`
* `X-Currency`
* `X-Latitude`
* `X-Longitude`

The implementation follows the **Frontend Integration Guide** by centralizing request context and configuring a single Axios client with a request interceptor.

---

## Features

* React application bootstrapped with Create React App
* Environment-based configuration
* Global Request Context
* Browser geolocation with fallback to default coordinates
* Language and currency preference management
* Persistent preferences using `localStorage`
* Centralized Axios client
* Automatic request headers for all API calls
* Simple routing structure

---

## Project Structure

```text
src/
├── api/
├── components/
├── context/
├── hooks/
├── pages/
├── routes/
├── services/
├── styles/
├── App.jsx
└── index.js
```

---

## Environment Variables

Create a `.env` file (or copy `.env.example`) and configure:

```env
REACT_APP_API_BASE_URL=https://api.sujula.com
REACT_APP_DEFAULT_LANGUAGE=en
REACT_APP_DEFAULT_CURRENCY=GMD
REACT_APP_DEFAULT_LATITUDE=13.4549
REACT_APP_DEFAULT_LONGITUDE=-16.5790
```

---

## Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application runs at:

```text
http://localhost:3000
```

---

## Verification

The implementation supports the following checks:

* Request headers include:

  * `Accept-Language`
  * `X-Currency`
  * `X-Latitude`
  * `X-Longitude`
* Preferences persist after page refresh.
* Browser geolocation updates the stored delivery location.
* Default location is used if geolocation permission is denied.

---

## Current Scope

This repository implements the frontend integration foundation.

Authentication and user preference synchronization (`PATCH /api/users/{id}/preferences`) will be integrated once the authentication module is available.

---

## License

This project is intended for the Sujula platform.
