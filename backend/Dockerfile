FROM python:3.8-slim

# uv 바이너리 복사
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

WORKDIR /app

# prophet(cmdstanpy) 빌드에 필요한 컴파일러 설치
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 컨테이너에서 venv 없이 시스템 Python에 직접 설치
ENV UV_SYSTEM_PYTHON=1

# 의존성 파일만 먼저 복사 (소스 변경 시 이 레이어는 캐시 재사용)
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-install-project

# CmdStan 설치 (Prophet 예측 모델용 — 빌드에 5~10분 소요)
RUN python -m cmdstanpy.install_cmdstan --progress

# 백엔드 소스 복사
COPY backend/ .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
