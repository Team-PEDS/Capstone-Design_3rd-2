import React from "react";
import ReactApexChart from 'react-apexcharts'; // 수정: 올바른 패키지명으로 변경




class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'True',
        data: [44, 55,55,60,53]
      }, {
        name: 'False',
        data: [13, 23,13,20,31]
      },
      
    ],

      options: {
        chart: {
          type: 'bar',
          height: 500,
          stacked: true,
          stackType: '100%'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        xaxis: {
          categories: ['LEFT Rotate','RIGHT Rotate','Blur','Lower Brightness','Average result'],
          labels: {
            style: {
              colors: ['white','white','white','white','white',], // 각 레이블에 대한 색상을 배열로 지정
              fontSize:10
            },
            rotate: 0
          }
        
        },
        grid: { 
            
            show: false 
        },
        

        fill: {
          opacity: 1,
          row: {
            colors: ['red','blue']
          },
        },
        legend: {
          position: 'right',
          offsetX: 0,
          offsetY: 50
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={230} />
      </div>
    );
  }
}

export default ApexChart; // 수정: FlaseTrue에서 ApexChart로 변경
