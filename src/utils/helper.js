const { apiEndpoints } = require("globals/constants");

export const getCountryCode = async () => {
  try {
    const res = await fetch(apiEndpoints.user.getCountryCode);

    if (res.ok && res.status === 200) {
      const data = await res.json();
      return data.country_code;
    } else {
      return "US";
    }
  } catch {
    return "US";
  }
};
