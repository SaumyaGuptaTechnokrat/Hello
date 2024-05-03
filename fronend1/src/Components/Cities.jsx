import React, { useState, useEffect } from 'react';

const CitiesTable = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.cou_name_en&sort=name');
        const data = await response.json();
        setCities(data.records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Cities Table</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Population</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {cities && cities.map(city => (
            <tr key={city.recordid}>
              <td>{city.fields.name}</td>
              <td>{city.fields.country_name}</td>
              <td>{city.fields.population}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CitiesTable;
