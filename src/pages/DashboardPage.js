import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import domtoimage from 'dom-to-image';

const DashboardPage = () => {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState({ xAxis: '', yAxis: '' });
  const [graphType, setGraphType] = useState('');
  const [topRows, setTopRows] = useState([]);
  const [bottomRows, setBottomRows] = useState([]);
  const [data, setData] = useState([]);
  const [graphColor, setGraphColor] = useState('rgba(54, 162, 235, 0.2)');
  const [chartInstance, setChartInstance] = useState(null);
  const [chartError, setChartError] = useState(null);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const { columns, topRows, bottomRows } = response.data;
      setColumns(columns);
      setTopRows(topRows);
      setBottomRows(bottomRows);
      setData([...topRows, ...bottomRows]);
      console.log('File upload successful:', response.data);
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  const handleGenerateGraph = () => {
    if (!graphType) {
      console.error('Please select a Graph Type');
      setChartError('Please select a Graph Type');
      return;
    }

    if (!selectedColumns.xAxis || !selectedColumns.yAxis) {
      console.error('Please select both X-Axis and Y-Axis');
      setChartError('Please select both X-Axis and Y-Axis');
      return;
    }

    const ctx = document.getElementById('myChart');
    if (ctx) {
      try {
        const newChartInstance = new Chart(ctx, {
          type: graphType,
          data: {
            labels: data.map(item => item[selectedColumns.xAxis]),
            datasets: [{
              label: 'Dataset',
              data: data.map(item => item[selectedColumns.yAxis]),
              backgroundColor: graphColor,
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Graph'
              }
            }
          }
        });

        setChartInstance(newChartInstance);
        setChartError(null);
      } catch (error) {
        console.error('Error generating chart:', error);
        setChartError(`Error generating chart: ${error.message}`);
      }
    }
  };

  const handleDownloadGraph = () => {
    if (chartInstance) {
      domtoimage.toBlob(document.getElementById('myChart'))
        .then(function (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'chart.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch(function (error) {
          console.error('Error downloading graph:', error);
        });
    }
  };

  return (
    <div className="p-6 bg-purple-100 min-h-screen">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-purple-600">JayTics Dashboard</h2>
      </div>

      <div className="mb-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>
      {file && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Select Graph Type</label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={graphType}
              onChange={(e) => {
                setGraphType(e.target.value);
                setSelectedColumns({ xAxis: '', yAxis: '' }); // Reset axis selections when graph type changes
              }}
            >
              <option value="">Select Graph Type</option>
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
              <option value="scatter">Scatter Plot</option>
              <option value="radar">Radar Chart</option>
              <option value="polarArea">Polar Area Chart</option>
              <option value="doughnut">Doughnut Chart</option>
              <option value="bubble">Bubble Chart</option>
              <option value="area">Area Chart</option>
              <option value="mixed">Mixed Chart</option>
              <option value="horizontalBar">Horizontal Bar Chart</option>
              <option value="barStacked">Stacked Bar Chart</option>
              <option value="barStacked100">100% Stacked Bar Chart</option>
              <option value="areaStacked">Stacked Area Chart</option>
              <option value="lineStacked">Stacked Line Chart</option>
              <option value="lineStacked100">100% Stacked Line Chart</option>
              <option value="scatterLine">Scatter Line Chart</option>
              <option value="scatterLineStacked">Stacked Scatter Line Chart</option>
              <option value="scatterLineStacked100">100% Stacked Scatter Line Chart</option>
            </select>
          </div>
          
          {graphType && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Select X-Axis</label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={selectedColumns.xAxis}
                  onChange={(e) => setSelectedColumns({ ...selectedColumns, xAxis: e.target.value })}
                >
                  <option value="">Select X-Axis</option>
                  {columns.map((column, index) => (
                    <option key={index} value={column}>{column}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Select Y-Axis</label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={selectedColumns.yAxis}
                  onChange={(e) => setSelectedColumns({ ...selectedColumns, yAxis: e.target.value })}
                >
                  <option value="">Select Y-Axis</option>
                  {columns.map((column, index) => (
                    <option key={index} value={column}>{column}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Select Graph Color</label>
            <input
              type="color"
              className="w-full px-3 py-2 border rounded"
              value={graphColor}
              onChange={(e) => setGraphColor(e.target.value)}
            />
          </div>
          <button className="w-full bg-purple-500 text-white py-2 rounded mb-4" onClick={handleGenerateGraph}>Generate Graph</button>
          {chartError && (
            <div className="mb-4 text-red-500">{chartError}</div>
          )}
          <div className="mb-4">
            <canvas id="myChart" width="400" height="400"></canvas>
          </div>
          <button className="w-full bg-purple-500 text-white py-2 rounded" onClick={handleDownloadGraph}>Download Graph as PNG</button>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Top 5 Rows</h3>
            <table className="w-full bg-white rounded shadow-md">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th key={index} className="border px-4 py-2">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="border px-4 py-2">{row[column]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Bottom 5 Rows</h3>
            <table className="w-full bg-white rounded shadow-md">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th key={index} className="border px-4 py-2">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bottomRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="border px-4 py-2">{row[column]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
