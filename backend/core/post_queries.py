from fastapi import HTTPException
from sqlalchemy import text
from core.db import get_connection


def create_post(title: str, author: str, content: str, password: str):
    with get_connection() as conn:
        conn.execute(
            text("INSERT INTO posts (title, author, content, password) VALUES (:t, :a, :c, :p)"),
            {"t": title, "a": author, "c": content, "p": password},
        )
        conn.commit()


def get_post() -> list:
    with get_connection() as conn:
        return conn.execute(text("SELECT * FROM posts ORDER BY id DESC")).fetchall()


def get_post_one(id) -> list:
    with get_connection() as conn:
        return conn.execute(
            text("SELECT * FROM posts WHERE id = :id"), {"id": id}
        ).fetchall()


def update_post(id, content: str, password: str):
    with get_connection() as conn:
        row = conn.execute(
            text("SELECT id FROM posts WHERE id = :id AND password = :pw"),
            {"id": id, "pw": password},
        ).fetchone()
        if not row:
            raise HTTPException(status_code=401, detail="비밀번호가 올바르지 않습니다.")
        conn.execute(
            text("UPDATE posts SET content = :c WHERE id = :id"),
            {"c": content, "id": id},
        )
        conn.commit()


def delete_post(id, password: str):
    with get_connection() as conn:
        row = conn.execute(
            text("SELECT id FROM posts WHERE id = :id AND password = :pw"),
            {"id": id, "pw": password},
        ).fetchone()
        if not row:
            raise HTTPException(status_code=401, detail="비밀번호가 올바르지 않습니다.")
        conn.execute(text("DELETE FROM posts WHERE id = :id"), {"id": id})
        conn.commit()
