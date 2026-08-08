import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useRequestContext } from "../../context/RequestContext";
import landingService from "../../services/landingService";

import TopNavbar from "../../components/landing/TopNavbar";
import MainNavbar from "../../components/landing/MainNavbar";
import DeliveryLocationBar from "../../components/landing/DeliveryLocationBar";
import Sidebar from "../../components/landing/Sidebar";
import HeroSection from "../../components/landing/HeroSection";
import CategoriesSection from "../../components/landing/CategoriesSection";
import PromotionsSection from "../../components/landing/PromotionsSection";
import NewArrivalsSection from "../../components/landing/NewArrivalsSection";
import BestsellersSection from "../../components/landing/BestsellersSection";
import Footer from "../../components/landing/Footer";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorMessage from "../../components/ui/ErrorMessage";

export default function LandingPage() {
  const {
    currency,
    deliveryLatitude,
    deliveryLongitude,
  } = useRequestContext();

  const [landingData, setLandingData] = useState({
    categories: [],
    promotions: [],
    newArrivals: [],
    bestsellers: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLandingData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data =
        await landingService.getLandingData({
          currency,
          latitude: deliveryLatitude,
          longitude: deliveryLongitude,
        });

      setLandingData({
        categories: Array.isArray(data?.categories)
          ? data.categories
          : [],

        promotions: Array.isArray(data?.promotions)
          ? data.promotions
          : [],

        newArrivals: Array.isArray(data?.newArrivals)
          ? data.newArrivals
          : [],

        bestsellers: Array.isArray(data?.bestsellers)
          ? data.bestsellers
          : [],
      });
    } catch (err) {
      console.error(
        "Unable to load marketplace.",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load marketplace."
      );
    } finally {
      setLoading(false);
    }
  }, [
    currency,
    deliveryLatitude,
    deliveryLongitude,
  ]);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!active) {
        return;
      }

      await loadLandingData();
    }

    load();

    return () => {
      active = false;
    };
  }, [loadLandingData]);

  if (loading) {
    return (
      <div className="page-loading" role="status">
        <LoadingSpinner />
        <p>Loading marketplace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={loadLandingData}
      />
    );
  }

  return (
    <div className="landing-page">
      <TopNavbar />

      <MainNavbar />

      <DeliveryLocationBar />

      <div className="landing-layout">
        <Sidebar
          categories={landingData.categories}
        />

        <main>
          <HeroSection />

          <CategoriesSection
            categories={landingData.categories}
          />

          <PromotionsSection
            promotions={landingData.promotions}
          />

          <NewArrivalsSection
            products={landingData.newArrivals}
          />

          <BestsellersSection
            products={landingData.bestsellers}
          />
        </main>
      </div>

      <Footer />
    </div>
  );
}