from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List  # Import the List type
from schemas import ItemCreate, ItemUpdate, ItemResponse, InstitutionCreate, InstitutionUpdate, InstitutionResponse, UserCreate, UserResponse, UserUpdate, CommentCreate, CommentResponse, CommentUpdate, PostCreate, PostResponse, PostUpdate, PostLikesCreate, PostLikesResponse, PostLikesUpdate, UserFavoritesCreate, UserFavoritesResponse, UserFavoritesUpdate, UserCompleteResponse
from models import Item, Institution, User, Comment, Post, PostLikes, UserFavorites
from database import get_db
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router
from backupBd import router as backup_router
import datetime

# FastAPI app instance
app = FastAPI()

app.include_router(auth_router)
app.include_router(backup_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API endpoint to create an item
@app.post("/items/", response_model=ItemResponse)
async def create_item(item: ItemCreate, db: Session = Depends(get_db)):
	db_item = Item(**item.dict())
	db.add(db_item)
	db.commit()
	db.refresh(db_item)
	return db_item

# API endpoint to update an item by ID
@app.put("/items/{item_id}", response_model=ItemResponse)
async def update_item(item_id: int, item: ItemUpdate, db: Session = Depends(get_db)):
    updated_item = db.query(Item).filter(Item.id == item_id)
    updated_item.first()
    if updated_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    updated_item.update(item.dict(), synchronize_session=False)
    db.commit()
    return updated_item.first()  # Refresh and return updated item

# API endpoint to read an item by ID
@app.get("/items/{item_id}", response_model=ItemResponse)
async def read_item(item_id: int, db: Session = Depends(get_db)):
	db_item = db.query(Item).filter(Item.id == item_id).first()
	if db_item is None:
		raise HTTPException(status_code=404, detail="Item not found")
	return db_item

# API endpoint to retrieve all items
@app.get("/items/", response_model=List[ItemResponse])
async def read_items(db: Session = Depends(get_db)):
    items = db.query(Item).all()
    return items

@app.delete("/items/{item_id}", status_code=204)
async def delete_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(Item).filter(Item.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return 

# CRUD DE INSTITUIÇÕES

# API endpoint to create an Institution
@app.post("/institutions/", response_model=InstitutionResponse)
async def create_Institution(institution: InstitutionCreate, db: Session = Depends(get_db)):
	db_Institution = Institution(**institution.dict())
	db.add(db_Institution)
	db.commit()
	db.refresh(db_Institution)
	return db_Institution

# API endpoint to update an Institution by ID
@app.put("/institutions/{Institution_id}", response_model=InstitutionResponse)
async def update_Institution(Institution_id: int, institution: InstitutionUpdate, db: Session = Depends(get_db)):
    updated_Institution = db.query(Institution).filter(institution.id == Institution_id)
    updated_Institution.first()
    if updated_Institution is None:
        raise HTTPException(status_code=404, detail="Institution not found")
    updated_Institution.update(institution.dict(), synchronize_session=False)
    db.commit()
    return updated_Institution.first()  # Refresh and return updated Institution

# API endpoint to read an Institution by ID
@app.get("/institutions/{Institution_id}", response_model=InstitutionResponse)
async def read_Institution(Institution_id: int, db: Session = Depends(get_db)):
	db_Institution = db.query(Institution).filter(Institution.id == Institution_id).first()
	if db_Institution is None:
		raise HTTPException(status_code=404, detail="Institution not found")
	return db_Institution

# API endpoint to retrieve all Institutions
@app.get("/institutions/", response_model=List[InstitutionResponse])
async def read_Institutions(db: Session = Depends(get_db)):
    Institutions = db.query(Institution).all()
    return Institutions

@app.delete("/institutions/{Institution_id}", status_code=204)
async def delete_Institution(Institution_id: int, db: Session = Depends(get_db)):
    db_Institution = db.query(Institution).filter(Institution.id == Institution_id).first()
    if db_Institution is None:
        raise HTTPException(status_code=404, detail="Institution not found")
    db.delete(db_Institution)
    db.commit()
    return 

# CRUD DE USUÁRIOS

# API endpoint to create an user
@app.post("/users/", response_model=UserResponse)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(**user.dict()) 
    print(db_user.isInstitution)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# API endpoint to update an user by ID
@app.put("/users/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    updated_user = db.query(User).filter(User.id == user_id)
    updated_user.first()
    if updated_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    updated_user.update(user.dict(), synchronize_session=False)
    db.commit()
    return updated_user.first()  # Refresh and return updated user

# API endpoint to read an user by ID
@app.get("/users/{user_id}", response_model=UserCompleteResponse)
async def read_user(user_id: int, db: Session = Depends(get_db)):
	db_user = db.query(User).filter(User.id == user_id).first()
	if db_user is None:
		raise HTTPException(status_code=404, detail="User not found")
	return db_user

# API endpoint to retrieve all users
@app.get("/users/", response_model=List[UserResponse])
async def read_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@app.delete("/users/{user_id}", status_code=204)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return 


# API endpoint to create an comment
@app.post("/comments/", response_model=CommentResponse)
async def create_comment(comment: CommentCreate, db: Session = Depends(get_db)):
    db_comment = Comment(**comment.dict())
    db_comment.timeStamp = datetime.datetime.now()
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

# API endpoint to update an comment by ID
@app.put("/comments/{comment_id}", response_model=CommentResponse)
async def update_comment(comment_id: int, comment: CommentUpdate, db: Session = Depends(get_db)):
    updated_comment = db.query(Comment).filter(Comment.id == comment_id)
    updated_comment.first()
    if updated_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    updated_comment.update(comment.dict(), synchronize_session=False)
    db.commit()
    return updated_comment.first()  # Refresh and return updated comment

# API endpoint to read an comment by ID
@app.get("/comments/{comment_id}", response_model=CommentResponse)
async def read_comment(comment_id: int, db: Session = Depends(get_db)):
	db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
	if db_comment is None:
		raise HTTPException(status_code=404, detail="Comment not found")
	return db_comment

# API endpoint to retrieve all comments
@app.get("/comments/", response_model=List[CommentResponse])
async def read_comments(db: Session = Depends(get_db)):
    comments = db.query(Comment).all()
    return comments

@app.delete("/comments/{comment_id}", status_code=204)
async def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    db.delete(db_comment)
    db.commit()
    return 

# API endpoint to create a post
@app.post("/posts/", response_model=PostResponse)
async def create_post(post: PostCreate, db: Session = Depends(get_db)):
    db_post = Post(**post.dict())
    db_post.institutionId = 0
    db_post.timeStamp = datetime.datetime.now()
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


# API endpoint to update a post by ID
@app.put("/posts/{post_id}", response_model=PostResponse)
async def update_post(post_id: int, post: PostUpdate, db: Session = Depends(get_db)):
    updated_post = db.query(Post).filter(Post.id == post_id).first()
    if updated_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    for key, value in post.dict().items():
        setattr(updated_post, key, value)
    db.commit()
    return updated_post


# API endpoint to read a post by ID
@app.get("/posts/{post_id}", response_model=PostResponse)
async def read_post(post_id: int, db: Session = Depends(get_db)):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post


# API endpoint to retrieve all posts
@app.get("/posts/", response_model=List[PostResponse])
async def read_posts(db: Session = Depends(get_db)):
    posts = db.query(Post).all()
    return posts


# API endpoint to delete a post by ID
@app.delete("/posts/{post_id}", status_code=204)
async def delete_post(post_id: int, db: Session = Depends(get_db)):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(db_post)
    db.commit()
    return


# API endpoint to create an postLike
@app.post("/postLikes/", response_model=PostLikesResponse)
async def create_postLike(postLike: PostLikesCreate, db: Session = Depends(get_db)):
    db_postLike = PostLikes(**postLike.dict())
    db_postLike.timeStamp = datetime.datetime.now()
    db.add(db_postLike)
    db.commit()
    db.refresh(db_postLike)
    return db_postLike

# API endpoint to update an postLike by ID
@app.put("/postLikes/{postLike_id}", response_model=PostLikesResponse)
async def update_postLike(postLike_id: int, postLike: PostLikesUpdate, db: Session = Depends(get_db)):
    updated_postLike = db.query(PostLikes).filter(PostLikes.id == postLike_id)
    updated_postLike.first()
    if updated_postLike is None:
        raise HTTPException(status_code=404, detail="PostLikes not found")
    updated_postLike.update(postLike.dict(), synchronize_session=False)
    db.commit()
    return updated_postLike.first()  # Refresh and return updated postLike

# API endpoint to read an postLike by ID
@app.get("/postLikes/{postLike_id}", response_model=PostLikesResponse)
async def read_postLike(postLike_id: int, db: Session = Depends(get_db)):
	db_postLike = db.query(PostLikes).filter(PostLikes.id == postLike_id).first()
	if db_postLike is None:
		raise HTTPException(status_code=404, detail="PostLikes not found")
	return db_postLike

# API endpoint to retrieve all postLikes
@app.get("/postLikes/", response_model=List[PostLikesResponse])
async def read_postLikes(db: Session = Depends(get_db)):
    postLikes = db.query(PostLikes).all()
    return postLikes

@app.delete("/postLikes/{postLike_id}", status_code=204)
async def delete_postLike(postLike_id: int, db: Session = Depends(get_db)):
    db_postLike = db.query(PostLikes).filter(PostLikes.id == postLike_id).first()
    if db_postLike is None:
        raise HTTPException(status_code=404, detail="PostLikes not found")
    db.delete(db_postLike)
    db.commit()
    return 


# API endpoint to create an userFavorites
@app.post("/userFavorites/", response_model=UserFavoritesResponse)
async def create_userFavorites(userFavorites: UserFavoritesCreate, db: Session = Depends(get_db)):
	db_userFavorites = UserFavorites(**userFavorites.dict())
	db.add(db_userFavorites)
	db.commit()
	db.refresh(db_userFavorites)
	return db_userFavorites

# API endpoint to update an userFavorites by ID
@app.put("/userFavorites/{userFavorites_id}", response_model=UserFavoritesResponse)
async def update_userFavorites(userFavorites_id: int, userFavorites: UserFavoritesUpdate, db: Session = Depends(get_db)):
    updated_userFavorites = db.query(UserFavorites).filter(UserFavorites.id == userFavorites_id)
    updated_userFavorites.first()
    if updated_userFavorites is None:
        raise HTTPException(status_code=404, detail="UserFavorites not found")
    updated_userFavorites.update(userFavorites.dict(), synchronize_session=False)
    db.commit()
    return updated_userFavorites.first()  # Refresh and return updated userFavorites

# API endpoint to read an userFavorites by ID
@app.get("/userFavorites/{userFavorites_id}", response_model=UserFavoritesResponse)
async def read_userFavorites(userFavorites_id: int, db: Session = Depends(get_db)):
	db_userFavorites = db.query(UserFavorites).filter(UserFavorites.id == userFavorites_id).first()
	if db_userFavorites is None:
		raise HTTPException(status_code=404, detail="UserFavorites not found")
	return db_userFavorites

# API endpoint to retrieve all userFavorites
@app.get("/userFavorites/", response_model=List[UserFavoritesResponse])
async def read_userFavorites(db: Session = Depends(get_db)):
    userFavorites = db.query(UserFavorites).all()
    return userFavorites

@app.delete("/userFavorites/{userFavorites_id}", status_code=204)
async def delete_userFavorites(userFavorites_id: int, db: Session = Depends(get_db)):
    db_userFavorites = db.query(UserFavorites).filter(UserFavorites.id == userFavorites_id).first()
    if db_userFavorites is None:
        raise HTTPException(status_code=404, detail="UserFavorites not found")
    db.delete(db_userFavorites)
    db.commit()
    return 


if __name__ == "__main__":
	import uvicorn

	# Run the FastAPI application using Uvicorn
	uvicorn.run(app, host="127.0.0.1", port=3380)
