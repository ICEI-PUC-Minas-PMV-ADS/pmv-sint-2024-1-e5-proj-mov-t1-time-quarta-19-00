from sqlalchemy import Column, ForeignKey, Integer, String
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
	address = Column(String)
	latitude = Column(String)
	longitude = Column(String)
	responsibleUserId = Column(Integer, ForeignKey('users.id')) # Adiciona relacionamento
	created = Column(String)
	visitTime = Column(String)
	visitDates = Column(String)


# Database user model
class User(Base):
	__tablename__ = "users"
	id = Column(Integer, primary_key=True, index=True)
	name = Column(String, index=True)
	email = Column(String)
	socialUid = Column(String)


# Database comment  model
class Comment(Base):
	__tablename__ = "comments"
	id = Column(Integer, primary_key=True, index=True)
	userId = userId = Column(Integer, ForeignKey('users.id')) # Adiciona relacionamento
	comment = Column(String)
	postId = Column(Integer, ForeignKey('posts.id')) # Adiciona relacionamento
	timeStamp = Column(String)
	
# Database posts model
class Post(Base):
	__tablename__ = "posts"
	id = Column(Integer, primary_key=True, index=True)
	userId = userId = Column(Integer, ForeignKey('users.id')) # Adiciona relacionamento
	institutionId = institutionId = Column(Integer, ForeignKey('institutions.id')) # Adiciona relacionamento
	text = Column(String)
	timeStamp = Column(String)


# Database PostLikes model
class PostLikes(Base):
	__tablename__ = "postLikes"
	id = Column(Integer, primary_key=True, index=True)
	userId = userId = Column(Integer, ForeignKey('users.id')) # Adiciona relacionamento
	postId = postId = Column(Integer, ForeignKey('posts.id')) # Adiciona relacionamento
	timeStamp = Column(String)


# Database UserFavorites model
class UserFavorites(Base):
	__tablename__ = "userFavorites"
	id = Column(Integer, primary_key=True, index=True)
	userId = userId = Column(Integer, ForeignKey('users.id')) # Adiciona relacionamento
	institutionId = institutionId = Column(Integer, ForeignKey('institutions.id')) # Adiciona relacionamento


