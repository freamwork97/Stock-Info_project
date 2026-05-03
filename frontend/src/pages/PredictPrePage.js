import React from 'react';
import SearchInput from '../components/SearchInput';

function PredictPrePage() {
  return (
    <div className="page fade-in">
      <div className="hero">
        <div className="eyebrow">Prophet 시계열 예측</div>
        <h1 className="hero-title mt-3">
          <span className="accent">AI 기반</span> 주가 예측
        </h1>
        <p className="hero-sub">Facebook Prophet 모델로 향후 주가 추세를 예측합니다.</p>
        <SearchInput variant="hero" toPage="predict" placeholder="예측을 원하는 종목명을 검색하세요" />
      </div>

      <div className="card card-pad-lg mt-6" style={{ maxWidth: 720, margin: '32px auto', borderLeft: '4px solid var(--brand)' }}>
        <div className="flex items-start gap-md">
          <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 10, background: 'var(--brand-soft)', color: 'var(--brand-strong)', display: 'grid', placeItems: 'center' }}>
            ⚠
          </div>
          <div>
            <h3 className="h-3">투자에 앞서</h3>
            <p className="body-md mt-2" style={{ lineHeight: 1.65 }}>
              본 페이지는 <strong>재미와 학습 목적</strong>으로 제작된 페이지입니다.<br />
              예측 결과는 정확하지 않을 수 있으며, 모든 투자 결정의 책임은 본인에게 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictPrePage;
