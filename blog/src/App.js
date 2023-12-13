import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './Page/Main';
import ResultPage from './Page/ResultPage';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Main />} /> */}
          <Route path="//*" element={<ResultPage/>} />
          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는 경우 처리 */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
