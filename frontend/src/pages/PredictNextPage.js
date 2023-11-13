import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStockData } from '../components/fetchStockData';
import InputButton from '../components/InputButton';
import { PredictChart } from '../components/drawChart';

function PredictNextPage() {
  const { searchTerm } = useParams();
  const [companyInfo, setCompanyInfo] = useState({});
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchStockData(searchTerm, setCompanyInfo);

    fetch(`http://localhost:8000/predict_stock/${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const transformedChartData = {
          labels: data.날짜,
          datasets: [
            {
              label: '예측종가',
              data: data.예측종가,
            },
            {
              label: '예측고가',
              data: data.예측고가,
            },
            {
              label: '예측저가',
              data: data.예측저가,
            },
          ],
        };

        setChartData(transformedChartData);
      })
      .catch((error) => {
        console.error('Error fetching prediction data:', error);
      });
  }, [searchTerm]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col">
          <h2>
            <a href={'/predict'} className="fs-3 me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-chevron-compact-left mb-2"
                viewBox="0 0 16 16"
                color="gray"
              >
                <path
                  fillRule="evenodd"
                  d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"
                />
              </svg>
            </a>
            {companyInfo.company}({companyInfo.code})
          </h2>
        </div>
        <div className="col-3">
          <div className="w-100">
            <InputButton IB={InputButton} toPage={'predict'} />
          </div>
        </div>
        <PredictChart chartData={chartData} chartOptions={chartOptions} />
      </div>
    </div>
  );
}

export default PredictNextPage;
