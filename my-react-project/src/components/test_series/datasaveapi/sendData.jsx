export const sendData = async (endpoint, data, additionalString='',method = 'POST') => {
    try {

      const url = `http://127.0.0.1:5000/${endpoint}${additionalString ? `/${additionalString}` : ''}`;
      
      console.log(data);
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers or authentication tokens as needed
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(`Error sending data to ${endpoint}:`, error);
      throw error; // Optionally handle or log the error here
    }
  };
  