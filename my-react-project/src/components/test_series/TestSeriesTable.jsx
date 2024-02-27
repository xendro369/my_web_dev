import React, { useState, useEffect } from 'react';
import { fetchData } from './datafetchapi/fetchData';
import { Link, useLocation } from 'react-router-dom';

const TestSeriesTable = () => {
  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const lastSegment = pathArray[pathArray.length - 1];
  const [sortOrder, setSortOrder] = useState(null);
  
  console.log(lastSegment);

  const [infotableData, setinfotableData] = useState({ table_info: {}, test_series_table: [] });

  useEffect(() => {
    const fetchInfoTestSeriesTable = async (endpoint) => {
      console.log('TestSeriesTable component mounted');
      try {
        const data = await fetchData(endpoint, lastSegment);
        setinfotableData(data);
      } catch (error) {
        // Handle or log the error
      }
    };
  
    fetchInfoTestSeriesTable('common_table_instruction');

    if (infotableData.test_series_table.length > 0) {
      // const initialSortOrder = infotableData.test_series_table[0].ScorePercentage < 0 ? 'asc' : 'desc';
      setSortOrder('↕');
    }
    
  }, [lastSegment]); // Empty dependency array to run the effect only once on mount 
  

  const sortedTestSeriesTable = [...infotableData.test_series_table].sort((a, b) => {
    const scoreA = a.ScorePercentage;
    const scoreB = b.ScorePercentage;
    const row1 = a.id;
    const row2 = b.id;
  
    if (sortOrder === 'asc') {
      return scoreA - scoreB;
    } else if (sortOrder === 'desc') {
      return scoreB - scoreA;
    } else {
      // Default sorting by row.id
      return row1 - row2;
    }
  });
  
  const handleSort = () => {
    // Toggle between 'asc', 'desc', and '↕' when clicking on the ScorePercentage column
    setSortOrder((prevSortOrder) => {
      if (prevSortOrder === 'asc') {
        return 'desc';
      } else if (prevSortOrder === 'desc') {
        return '↕'; // Clicking the third time resets to the default sorting by row.id
      } else {
        return 'asc';
      }
    });
  };

// Assuming Tailwind is installed and configured correctly
return (
  <>
    <div className="mb-4 flex items-center">
      <Link to="/" className="text-blue-500 hover:underline">
        Home
      </Link>
      <span className="mx-2">/</span>
      <Link to="/testseries" className="text-blue-500 hover:underline">
        Test Series
      </Link>
      <span className="mx-2">/</span>
      <div>{lastSegment}</div>      
    </div>
  <div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">Table Information {lastSegment}</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border p-4 rounded-md">
        <h3 className="text-lg font-medium mb-2">Instructions</h3>
        <p className="text-gray-700">{infotableData.table_info.common_instructions}</p>
      </div>
      <div className="border p-4 rounded-md">
        <h3 className="text-lg font-medium mb-2">Duration</h3>
        <p className="text-gray-700">{infotableData.table_info.common_duration}</p>
      </div>
    </div>

    <table className="table-auto w-full border border-gray-200 mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left bg-gray-200">S.No</th>
            <th className="px-4 py-2 text-left bg-gray-200">Test Name</th>
            <th className="px-4 py-2 text-left bg-gray-200">Link</th>
            <th className="px-4 py-2 text-left bg-gray-200" onClick={handleSort} style={{ cursor: 'pointer' }}>
              Score % {sortOrder === 'asc' ? '▼' : sortOrder === 'desc' ? '▲' : '↕'}
            </th>
            <th className="px-4 py-2 text-left bg-gray-200">View Analytics</th>
          </tr>
        </thead>
      <tbody>
        {sortedTestSeriesTable.map((row, index) => (
          <tr key={row.id} className={`transition duration-300 hover:shadow-md ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
            <td className="px-4 py-2">{row.id}</td>
            <td className="px-4 py-2">{row.test_name}</td>
            <td className="px-4 py-2">
              <Link to={`/genpaper/${row.link}`} className="text-blue-500 hover:underline">Attempt</Link>
            </td>
            <td className="px-4 py-2">{row.ScorePercentage}</td>
            <td className="px-4 py-2">
              <Link to={`/view/${row.viewAnalytics}`} className="text-blue-500 hover:underline">View</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  </div></>
);
};

export default TestSeriesTable;
