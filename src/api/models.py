from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# Database item model
class Item(Base):
	__tablename__ = "items"
	id = Column(Integer, primary_key=True, index=True)
	name = Column(String, index=True)
	description = Column(String)


# Database institutions model
class Institution(Base):
	__tablename__ = "institutions"
	id = Column(Integer, primary_key=True, index=True)
	name = Column(String, index=True)
	email = Column(String)
	cnpj = Column(String)
	password = Column(String)


# Database user model
class User(Base):
	__tablename__ = "users"
	id = Column(Integer, primary_key=True, index=True)
	name = Column(String, index=True)
	username = Column(String)
	whatsapp = Column(String)
	email = Column(String)
	password = Column(String)
	posts = relationship("Post", back_populates="user")
	comments = relationship("Comment", back_populates="user")
	likes = relationship("PostLikes", back_populates="user")
	

	isInstitution = Column(Boolean, default=False)
	cnpj = Column(String, default="")
	
# Database posts model
class Post(Base):
	__tablename__ = "posts"
	id = Column(Integer, primary_key=True, index=True)
	userId = userId = Column(Integer, ForeignKey('users.id')) # Adiciona relacionamento
	institutionId = institutionId = Column(Integer, ForeignKey('institutions.id')) # Adiciona relacionamento
	text = Column(String)
	title = Column(String)
	timeStamp = Column(String)
	imgLink = Column(String)

	user = relationship("User", back_populates="posts")
	comments = relationship("Comment", back_populates="post")
	likes = relationship("PostLikes", back_populates="post")


# Database comment  model
class Comment(Base):
	__tablename__ = "comments"
	id = Column(Integer, primary_key=True, index=True)
	userId = userId = Column(Integer, ForeignKey('users.id')) # Adiciona relacionamento
	comment = Column(String)
	postId = Column(Integer, ForeignKey('posts.id')) # Adiciona relacionamento
	timeStamp = Column(String)

	user = relationship(User, back_populates="comments")
	post = relationship(Post, back_populates="comments")

# Database PostLikes model
class PostLikes(Base):
	__tablename__ = "postLikes"
	id = Column(Integer, primary_key=True, index=True)
	userId = userId = Column(Integer, ForeignKey('users.id')) # Adiciona relacionamento
	postId = postId = Column(Integer, ForeignKey('posts.id')) # Adiciona relacionamento
	timeStamp = Column(String)
	
	post = relationship(Post, back_populates="likes")
	user = relationship(User, back_populates="likes")


# Database UserFavorites model
class UserFavorites(Base):
	__tablename__ = "userFavorites"
	id = Column(Integer, primary_key=True, index=True)
	userId = userId = Column(Integer, ForeignKey('users.id')) # Adiciona relacionamento
	institutionId = institutionId = Column(Integer, ForeignKey('institutions.id')) # Adiciona relacionamento