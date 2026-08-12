import { useEffect, useState } from "react";

import landingService from "../../services/landingService";
import { useRequestContext } from "../../context/RequestContext";

import PromotionsHeader from "../../components/promotions/PromotionsHeader";
import PromotionsGrid from "../../components/promotions/PromotionsGrid";
import PromotionEmptyState from "../../components/promotions/PromotionEmptyState";

export default function PromotionsPage() {
  const {
    currency,
    deliveryLatitude,
    deliveryLongitude,
  } = useRequestContext();

  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadPromotions() {
      setLoading(true);
      setError("");

      try {
        const landingData =
          await landingService.getLandingData({
            currency,
            latitude: deliveryLatitude,
            longitude: deliveryLongitude,
          });

        if (!mounted) {
          return;
        }

        setPromotions(
          Array.isArray(landingData?.promotions)
            ? landingData.promotions
            : []
        );
      } catch (requestError) {
        console.error(
          "Unable to load promotions.",
          requestError
        );

        if (!mounted) {
          return;
        }

        setError(
          "Unable to load promotions right now."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadPromotions();

    return () => {
      mounted = false;
    };
  }, [
    currency,
    deliveryLatitude,
    deliveryLongitude,
  ]);

  return (
    <main className="page promotions-page">
      <PromotionsHeader />

      {loading && (
        <p role="status">
          Loading promotions...
        </p>
      )}

      {!loading && error && (
        <p role="alert">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        promotions.length === 0 && (
          <PromotionEmptyState />
        )}

      {!loading &&
        !error &&
        promotions.length > 0 && (
          <PromotionsGrid
            promotions={promotions}
          />
        )}
    </main>
  );
}