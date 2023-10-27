import React from 'react';
import InputButton from '../components/InputButton';

function PredictPrePage() {

  return (
    <div className="container p-5">
      <div className='w-25 mx-auto'>
        <div className="mb-3">
          <InputButton IB={InputButton} toPage={'test'}/>
        </div>
      </div>
      <div className='w-75 mx-auto fs-1'>
      <p className='mt-4 m-3'>예측을 원하는 종목명을 검색하세요.</p>
        <div className="alert alert-warning" role="alert">
          투자는 본인의 선택입니다.<br /> 
          재미삼아 만들어본 페이지입니다.<br />
          예측 결과는 정확하지 않습니다.
        </div>
      </div>
    </div>

  );
}
export default PredictPrePage;
