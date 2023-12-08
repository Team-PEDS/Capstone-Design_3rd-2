// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import backgrounImg from './img/BackgrounImg.png';
import logoImg from './img/logo.png';
import Timer from './Component/Timer.js';
import FlaseTrue from './Component/FalseTrue.js';
import Chart from './Component/Chart.js';
import { Oval } from 'react-loader-spinner';

function App() {
  const ServerIP = process.env.REACT_APP_FLASK_IP;
  const [result, setResult] = useState('');
  const charts1 = 'charts1';
  const charts2 = 'charts2';
  const charts3 = 'charts3';
  const charts4 = 'charts4';
  const [loading, setLoading] = useState(true);
  const [resultVisible, setResultVisible] = useState(true);
  

  const [isChatVisible, setChatVisible] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [assistantReplies, setAssistantReplies] = useState([]);

  const handleToggleChat = () => {
    setChatVisible(!isChatVisible);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(`http://${ServerIP}/chatgpt`, {
        purpose: userInput,
      });

      const assistantReply = response.data.result;

      // 새로운 대화를 상태에 추가
      setAssistantReplies([...assistantReplies, { role: 'user', content: userInput }, { role: 'assistant', content: assistantReply }]);
      
      // 사용자 입력 초기화
      setUserInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
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
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 5000);

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
                    <Timer />
                  </div>
                </LeftBox1>
              </div>
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
              <button onClick={handleToggleChat}>
                {isChatVisible ? '🔍' : '💬'}
              </button>

              {isChatVisible ? (
                <ChatBox>
                  <ChatContent>
                    {/* 이전 채팅 내용 표시 */}
                    {assistantReplies.map((reply, index) => (
                      <div key={index} style={{ color: reply.role === 'user' ? 'blue' : 'white' }}>
                        {reply.content}
                      </div>
                    ))}
                  </ChatContent>
                  <ChatInput>
                    <input type="text" value={userInput} onChange={handleUserInput} />
                    <button onClick={handleSendMessage} >Send</button>
                  </ChatInput>
                </ChatBox>
              ) : null}
              {!isChatVisible && (
                <LeftInner2Chart>
                  {/* 결과 리포트 */}
                  <h2 style={{ margin: '0px', color: 'white' }}>Result Report</h2>
                  <div>
                    <h3 style={{ color: 'white' }}>{result}</h3>
                  </div>
                </LeftInner2Chart>
              )}
            </LeftBoxInner2>
          </LeftBox>
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
`;

const LeftBox = styled.div`
  width:700px;
  height:800px;
  border: 2px solid black;
`;

const LeftBoxInner1 = styled.div`
  width:700px;
  height:300px;
`;

const LeftBoxInner2 = styled.div`
  width:700px;
  height:492px;
`;

const RightBox = styled.div`
  width: 900px;
  height: 810px;
`;

const RightBox2 = styled.div`
  width: 500px;
  height: 403px;
  border: 2px solid #132229;
  background-color:#08131A;
`;

const RightBoxInner1 = styled.div`
  width:788px;
  height:403px;
  border: 2px solid #132229;
  background-color:#08131A;
`;

const BackgroundImage = styled.div`
  background-image: url(${backgrounImg});
  background-size: cover;
  width: 100%;
  height: 100%;
`;

const LogoImage = styled.img`
  width: 99%;
  height: 130px;

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
  height: 216px;
  border: 2px solid #132229;
  background-color:#08131A;
`;


// 추가된 CSS
const ChatBox = styled.div`
  position: fixed;
  height: 197px;
  width: 676px;
  border: 2px solid #132229;
  background-color: #08131A;
  color: white;
  padding: 10px;
`;

const ChatContent = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const ChatInput = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  input {
    flex-grow: 1;
    margin-right: 5px;
  }

  button {
    cursor: pointer;
  }
`;

export default App;
