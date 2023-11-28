import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import styled from 'styled-components';
import backgrounImg from './img/BackgrounImg.png'
import logoImg from './img/logo.png'
import Timer from './Component/Timer.js';
import FlaseTrue from './Component/FlaseTrue.js';
import Chart from './Component/Chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from "react-dom"; // 수정: react-dom을 import
import { Oval } from 'react-loader-spinner';

function App() {
  const ServerIP = process.env.REACT_APP_FLASK_IP;
  const [result, setResult] = useState('');
  const charts1 = 'charts1';
  const charts2 = 'charts2';
  const charts3 = 'charts3';
  const charts4 = 'charts4';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 시연 목적으로 지연을 시뮬레이션합니다.
        // 실제 코드에서는 axios 호출로 대체해야 합니다.
        await new Promise(resolve => setTimeout(resolve, 3000));
        // 시뮬레이션된 지연 후에 로딩을 false로 설정합니다.
        setLoading(false);

        const response = await axios.get(`http://${ServerIP}/users`);
        setResult(response.data.members[0].name);
      } catch (error) {
        console.error('데이터를 가져오는 도중 오류 발생:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [ServerIP]);

  useEffect(() => {
    // 5초 후에 로딩 상태를 false로 설정하는 부분
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // 컴포넌트가 언마운트되면 타이머를 정리합니다.
    return () => clearTimeout(timeoutId);
  }, []);



  return (
    <BackgroundImage>
      <div>

        <MainBox>
          <LeftBox>
            <LeftBoxInner1>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                <LeftBox1>
                  <LogoImage src={logoImg} alt="Logo" />
                </LeftBox1>
                <LeftBox1>
                  <div style={{ backgroundColor: '#08131A', height: '130px', border: '2px solid #132229' }}>
                    <h3 style={{ color: 'gray', fontSize: '25px', marginTop: '0px', marginBottom: '0px' }}>Time required for testing</h3>
                    {/* 타이머 컴포넌트 삽입 */}
                    <Timer />
                  </div>
                </LeftBox1>

              </div>
              {/* 사이 공간 띄우는 div */}
              <div style={{ height: '10px' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <LeftBox1>
                  <div style={{ backgroundColor: '#08131A', height: '130px', border: '2px solid #132229 ' }}>
                    <h3 style={{ color: 'gray', fontSize: '25px', marginTop: '0px', marginBottom: '0px' }}>Model Type</h3>
                    <p style={{ fontSize: '60px', color: 'white', margin: '0px', paddingTop: '15px' }}>PyTorch</p>
                  </div>
                </LeftBox1>
                <LeftBox1>
                  <div style={{ backgroundColor: '#08131A', height: '130px', border: '2px solid #132229 ' }}>
                    <h3 style={{ color: 'gray', fontSize: '25px', marginTop: '0px', marginBottom: '0px' }}>Model name</h3>
                    <p style={{ fontSize: '60px', color: 'white', margin: '0px', paddingTop: '15px' }}>People.pt</p>
                  </div>
                </LeftBox1>

              </div>
            </LeftBoxInner1>
            <LeftBoxInner2>
              <LeftInnerChart>
                <p style={{ fontSize: '20px', margin: '0', textAlign: 'center', color: 'white' }}>Test Total results</p>
                <FlaseTrue style={{ backgroundColor: 'red' }} />
              </LeftInnerChart>
              <div style={{ height: '10px' }}></div>
              <LeftInner2Chart>
                {/* 결과 리포트 */}
                <h2 style={{ margin: '0px', color: 'white' }}>Result Report</h2>
                <div>
                  <h3 style={{ color: 'white' }}>{result}</h3>
                </div>
              </LeftInner2Chart>
            </LeftBoxInner2>
          </LeftBox>
          {/* 노란색 박스 */}
          <RightBox>
            <RightBoxInner1>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <RightBox2>
                  {loading ? (
                    <div style={{margin:'0 auto'}}>
                      <Oval color="#ff0000" height={100} width={100} />
                    </div>
                  ) : (
                    <div>
                      <Chart dataParents={charts1} />
                    </div>
                  )}
                </RightBox2>
                <RightBox2>
                  <div>
                    <Chart dataParents={charts2} />
                  </div>
                </RightBox2>
              </div>
            </RightBoxInner1>
            <RightBoxInner1>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <RightBox2>
                  <div>
                    <Chart dataParents={charts3} />
                  </div>
                </RightBox2>
                <RightBox2>

                  <div>
                    <Chart dataParents={charts4} />
                  </div>
                </RightBox2>
              </div>

            </RightBoxInner1>
          </RightBox>
        </MainBox>

      </div>
    </BackgroundImage>
  );
}

export default App;

const MainBox = styled.div`
  width:1500px;
  height:840px;
  display : flex;
  margin: 0 auto;
  padding-top: 20px;
`;

const LeftBox1 = styled.div`
  width:340px;
  height:140px;
  backgroundColor:#071015;
  position: relative;
`
const LeftBox = styled.div`
  width:700px;
  height:800px;
  border: 2px solid black;
 
`
const LeftBoxInner1 = styled.div`
  width:700px;
  height:300px;
 
`
// 왼쪽 밑에 박스
const LeftBoxInner2 = styled.div`
  width:700px;
  height:492px;
 
`
const RightBox = styled.div`
  width: 900px;
  height: 810px;
`
const RightBox2 = styled.div`
  width: 500px;
  height: 403px;
  border: 2px solid #132229;
  background-color:#08131A;
`
const RightBoxInner1 = styled.div`
  width:788px;
  height:403px;
  border: 2px solid #132229;
  background-color:#08131A;
 
`
const BackgroundImage = styled.div`
  background-image: url(${backgrounImg});
  background-size: cover;
  width: 100%;
  height: 100%;
`;
const LogoImage = styled.img`
  width: 99%;
  height: 130px;
  object-fit: cover; 
  position: absolute; 

`;
const LeftInnerChart = styled.div`
  width: auto;
  height: 260px;
  border: 2px solid #132229;
  background-color:#08131A;
`;
const LeftInner2Chart = styled.div`
  width: auto;
  height: 235px;
  border: 2px solid #132229;
  background-color:#08131A;
`;
const ResultDiv = styled.div`

`;