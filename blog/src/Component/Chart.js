import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Chart = (props) => {
  const chart = props.dataParents;
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "False",
        data: [],
      },
      {
        name: "True",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "radar",
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      title: {
        text: "Radar Chart - Multi Series",
      },
      stroke: {
        width: 2,
      },
      fill: {
        opacity: 0.1,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: [],
      },
    },
  });
  const ServerIP = process.env.REACT_APP_FLASK_IP;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${ServerIP}/${chart}`);
        const dataLength = response.data[0].length;
        const chartData = response.data;
        
        const halfIndex = Math.floor(dataLength / 2);
        console.log("잘나오나?1",chartData[0].slice(halfIndex));
        console.log("잘나오나?2",chartData[0].slice(0,halfIndex));
        setChartData((prevChartData) => ({
          ...prevChartData,
          series: [
            {
              name: "False",
              data: chartData[0].slice(0, chartData[0].length / 2),
            },
            {
              name: "True",
              data: chartData[0].slice(chartData[0].length / 2),
            },
          ],
          
          options: {
            ...prevChartData.options,
            xaxis: {
              categories:(chartData[1]), // 또는 [...response.data[1]] 형태로도 사용 가능
            },
          },
        }));
        
      } catch (error) {
        console.error("에러발생!!:", error);
        if (error.response) {
          // 서버가 에러 응답을 반환한 경우
          console.error("에러 응답 데이터:", error.response.data);
          console.error("에러 응답 상태 코드:", error.response.status);
          console.error("에러 응답 헤더:", error.response.headers);
        } else if (error.request) {
          // 요청이 이루어졌지만 응답을 받지 못한 경우
          console.error("에러 요청 데이터:", error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생한 경우
          console.error("에러 메시지:", error.message);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radar"
        height={400}
      />
    </div>
  );
};

export default Chart;
