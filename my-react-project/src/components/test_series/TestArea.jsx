import React, { useState, useEffect } from 'react';
import TestSeriesCard from './TestSeriesCard';
import { fetchData } from './datafetchapi/fetchData';
import { Link } from 'react-router-dom';

function TestArea({ limited }) {
  const [testSeriesData, setTestSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDataAsync = async (endpoint) => {
      try {
        const data = await fetchData(endpoint);
        setTestSeriesData(data);
        setLoading(false);
      } catch (error) {
        // Handle or log the error
      }
    };

    fetchDataAsync('get_test_card_data');
  }, []);

  const testToShow = limited ? testSeriesData.slice(0, 3) : testSeriesData;

  return (
    <div>
      <div className="text-3xl font-bold text-center mt-4">Test Sets & Practices </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          testToShow.map((series, index) => (
            <TestSeriesCard
              key={index}
              title={series.title}
              link={series.link}
              // duration={series.duration}
              // instructions={series.instructions}
            />
          ))
        )}
      </div>
    </div>


  );
}

export default TestArea;
