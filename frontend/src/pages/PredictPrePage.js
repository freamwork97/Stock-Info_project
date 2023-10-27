import React from 'react';
import InputButton from '../components/InputButton';

function PredictPrePage() {

  return (
    <div className="container p-5">
      <div className='w-25 mx-auto'>
        <InputButton IB={InputButton} toPage={'test'}/>
      </div>
    </div>
  );
}
export default PredictPrePage;
