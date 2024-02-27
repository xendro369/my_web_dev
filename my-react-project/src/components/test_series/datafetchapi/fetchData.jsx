export const fetchData = async (endpoint, additionalString = '') => {
  try {
    // Construct the URL by appending the additionalString to the endpoint
    const url = `http://127.0.0.1:5000/${endpoint}${additionalString ? `/${additionalString}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error; // Optionally handle or log the error here
  }
};
