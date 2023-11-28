import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    // 타이머 시작
    const intervalId = setInterval(() => {
      // 현재 시간을 1초씩 증가
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    // 컴포넌트가 unmount되면 타이머를 정리(cleanup)
    return () => clearInterval(intervalId);
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행

  // 초, 분, 시 계산
  const seconds = ('0' + (time % 60)).slice(-2);
  const minutes = ('0' + Math.floor(time / 60) % 60).slice(-2);
  const hours = ('0' + Math.floor(time / 3600)).slice(-2);

  return (
    <div>
      <p style={{fontSize:'60px',color:'white',margin:'0px',paddingTop:'15px'}}>{`${hours}:${minutes}:${seconds}`}</p>
    </div>
  );
};

export default Timer;
