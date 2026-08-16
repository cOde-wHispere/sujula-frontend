import { useEffect, useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import { useRequestContext } from "../../context/RequestContext";
import landingService from "../../services/landingService";

import ProductDetails from "../../components/products/ProductDetails/ProductDetails";

export default function ProductDetailsPage() {
  const { productId } = useParams();

  const {
    currency,
    deliveryLatitude,
    deliveryLongitude,
  } = useRequestContext();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setLoading(true);
      setError(null);
      setProduct(null);

      try {
        const result =
          await landingService.getProductById({
            productId,
            currency,
            latitude: deliveryLatitude,
            longitude: deliveryLongitude,
          });

        if (cancelled) {
          return;
        }

        if (!result) {
          setError("Product not found.");
          return;
        }

        setProduct(result);
      } catch (requestError) {
        console.error(
          "Unable to load product details.",
          requestError
        );

        if (!cancelled) {
          setError(
            "Unable to load product details."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [
    productId,
    currency,
    deliveryLatitude,
    deliveryLongitude,
  ]);

  if (loading) {
    return (
      <main className="page-container">
        <p>Loading product...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="page-container">
        <h1>Product Not Found</h1>

        <p>
          {error ||
            "The requested product could not be found."}
        </p>

        <Link
          to="/"
          className="button button-primary"
        >
          Back to Marketplace
        </Link>
      </main>
    );
  }

  return (
    <main className="page-container">
      <nav
        className="product-details-breadcrumbs"
        aria-label="Breadcrumb"
      >
        <Link to="/">
          Home
        </Link>

        <span aria-hidden="true">
          /
        </span>

        <span>
          {product.name}
        </span>
      </nav>

      <ProductDetails
        product={product}
      />
    </main>
  );
}