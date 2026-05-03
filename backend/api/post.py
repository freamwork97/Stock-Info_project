from fastapi import APIRouter
from typing import List

from schemas import PostCreate, PostUpdate, PostResponse
from core.post_queries import create_post, get_post, get_post_one, update_post, delete_post

router = APIRouter(tags=["post"])


def _format_post(post: tuple) -> dict:
    return {
        "id": post[0],
        "title": post[1],
        "author": post[2],
        "content": post[3],
        "created_at": post[5].isoformat(),
    }


@router.post("/post/save")
def create_post_handler(post: PostCreate):
    return create_post(post.title, post.author, post.content, post.password)


@router.get("/post", response_model=List[PostResponse])
def get_post_list():
    return [_format_post(p) for p in get_post()]


@router.get("/post/{id}", response_model=List[PostResponse])
def get_post_one_data(id: str):
    return [_format_post(p) for p in get_post_one(id)]


@router.put("/posts/{post_id}")
def update_post_handler(post_id: str, body: PostUpdate):
    update_post(post_id, body.content, body.password)
    return {"message": "게시글이 수정되었습니다."}


@router.delete("/posts/{post_id}")
def delete_post_handler(post_id: int, password: str):
    delete_post(post_id, password)
    return {"message": "게시글이 삭제되었습니다."}
