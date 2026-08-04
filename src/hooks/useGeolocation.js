import { useEffect } from "react";
import { useRequestContext } from "../context/RequestContext";

export function useGeolocation() {
  const { setLocation } = useRequestContext();

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({
          lat: coords.latitude,
          lon: coords.longitude,
        });
      },
      () => {
        // Keep the stored or default location.
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, [setLocation]);
}