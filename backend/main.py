from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import stock, market, news, financial, predict, post

app = FastAPI(title="Stock Info API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stock.router)
app.include_router(market.router)
app.include_router(news.router)
app.include_router(financial.router)
app.include_router(predict.router)
app.include_router(post.router)
