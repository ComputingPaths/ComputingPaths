import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const Content = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vQPxfDC-DdscHUL8Zj8ObqyoyaB92ffcMtoWnFMbM1oZeCFG6Jwxba23ysjZ2JJEKpPdNwaKTj3PdH5/pub?output=csv', {
      download: true,
      header: true,
      complete: (results) => {
        console.log(results);
        setData(results.data);
      },
    });
  }, []);

  console.log(data && data.length);
  console.log(typeof data[0]);
  if (data && data.length) {
    const dasd = data[0];
    console.log(dasd.meow2);
  }

  return (
    <div>
      {
        (data && data.length) ? data.map((rating) => <h1>{rating.meow}</h1>) : null
      }
    </div>
  );
};

export default Content;
