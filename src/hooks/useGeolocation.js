import { useEffect } from "react";
import { useRequestContext } from "../context/RequestContext";

export function useGeolocation() {
  const {
    deliveryAddress,
    setDeliveryLocation,
  } = useRequestContext();

  useEffect(() => {
    if (deliveryAddress) {
      return;
    }

    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDeliveryLocation({
          address: "Current Location",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },

      () => {
        // Keep default location from context
      },

      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, [deliveryAddress, setDeliveryLocation]);
}