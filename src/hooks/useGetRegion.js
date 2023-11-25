import { useEffect, useState } from "react";

const useGetRegion = () => {
  const [region, setRegion] = useState({ loading: true, code: "US" });

  useEffect(() => {
    // Function to get the user's location using Geolocation API
    function getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
          enableHighAccuracy: true
        });
      } else {
        console.error("Geolocation is not supported by this browser");
      }
    }

    // Success callback for Geolocation API
    async function successCallback(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      await getCountryCode(latitude, longitude).then((res) =>
        setRegion({ loading: false, code: res })
      );
    }

    // Error callback for Geolocation API
    function errorCallback(error) {
      console.error("Error getting user's location:", error.message);

      setRegion({ loading: false, code: "US" });

      // Inform the user and suggest going to settings
      alert("Please enable location services in your device settings to see relevant results.");
    }

    // Function to get the country code using reverse geocoding
    async function getCountryCode(latitude, longitude) {
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`;

      const res = await fetch(apiUrl);
      const data = await res.json();
      const countryCode = data.results[0].components["ISO_3166-1_alpha-2"];
      return countryCode;
    }

    getUserLocation();
  }, []);

  return {
    region: region.code,
    loading: region.loading
  };
};

export default useGetRegion;
