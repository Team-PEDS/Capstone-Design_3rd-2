import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import backgrounImg from '../img/BackgrounImg.png'; 
import {useState, useEffect} from 'react';
import logo from '../img/logo2.png';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';

const Main = () =>{
  function Loading() {
    return (
      <Oval
      color="#ff0000"
      height={100}
      width={100}
      />
    )
  }
    const [Data, setData] = useState(false);
    const [Data2,setData2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    if (Data && Data2) {
      setIsLoading(true);

      const timeout = setTimeout(() => {
        history('/ResultPage');
        setIsLoading(false);
        Loading();
      }, 2000);


      return () => clearTimeout(timeout);
    }
  }, [Data, Data2, history]);


    return(
        <BackgroundImage>
            <TitleDiv>
                <InputDiv>
                    <DataDiv>
                        <div style={{height:"100px"}}></div>
                        <img style={{width:"300px",height:'140px',marginLeft:"220px"}} src={logo}></img>
                        <div style={{height:"120px"}}></div>
                        <InputDD>
                            <DataInput>
                            <StyledLabel htmlFor="modelUpload">
                                <p style={{ fontSize: "30px", color: "white", marginTop: "20px", textAlign: "center" }}>모델 업로드</p>
                                <StyledInput type="file" id="modelUpload" onChange={() => setData(true)} />
                            </StyledLabel>
                            </DataInput>
                            <DataInput>
                            <StyledLabel htmlFor="datasetUpload">
                                <p style={{ fontSize: "30px", color: "white", marginTop: "20px", textAlign: "center" }}>데이터셋 업로드</p>
                                <StyledInput type="file" id="datasetUpload" onChange={() => setData2(true)} />
                            </StyledLabel>
                            </DataInput>
                        </InputDD>
                    </DataDiv>
                </InputDiv>
            </TitleDiv>
           

        </BackgroundImage>
    );
    
}
export default Main;

const BackgroundImage = styled.div`
  background-image: url(${backgrounImg});
  width: 1520px;
  height: 861px;
  position: absolute;
`;

const TitleDiv = styled.div`
    width: 1450px;
    height: 750px;
    border : 3px solid #70D0FF;
    margin: 50px auto;
    

`;
const InputDiv = styled.div`
    width: 1450px;
    height: 750px;
    background-color: rgba(0, 0, 0, 0.4);
`;

const DataDiv = styled.div`
    width: 790px;
    height : 100%;

    margin-left:330px;
`;
const DataInput = styled.div`
    width: 600px;
    height: 75px;
    border :2px solid #70D0FF;
    background-color: rgba(0, 0, 0, 0.2);
   
`;
const InputDD = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
    height: 260px;
`;
const StyledInput = styled.input`
  display: none; /* 원래 input을 숨깁니다. */
`;
const StyledLabel = styled.label`
  display: block;
  width: 100%;
  height: 100%;
`;