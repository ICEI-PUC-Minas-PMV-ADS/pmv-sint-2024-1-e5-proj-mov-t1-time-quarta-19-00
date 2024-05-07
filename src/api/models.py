from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# Database model
class Item(Base):
	__tablename__ = "items"
	id = Column(Integer, primary_key=True, index=True)
	name = Column(String, index=True)
	description = Column(String)


# Database model
class Institution(Base):
	__tablename__ = "institutions"
	id = Column(Integer, primary_key=True, index=True)
	name = Column(String, index=True)
	address = Column(String)
	latitude = Column(String)
	longitude = Column(String)
	responsibleUserId = Column(Integer) # Todo: consertar relacionamento
	created = Column(String)
	visitTime = Column(String)
	visitDates = Column(String)


# Database model
class User(Base):
	__tablename__ = "users"
	id = Column(Integer, primary_key=True, index=True)
	name = Column(String, index=True)
	email = Column(String)
	socialUid = Column(String)


# Database model
class Comment(Base):
	__tablename__ = "comments"
	id = Column(Integer, primary_key=True, index=True)
	userId = Column(Integer) # Todo: consertar relacionamento
	comment = Column(String)
	postId = Column(Integer) # Todo: consertar relacionamento
	timeStamp = Column(String)
	
# Database model
class Post(Base):
	__tablename__ = "posts"
	id = Column(Integer, primary_key=True, index=True)
	userId = Column(Integer) # Todo: consertar relacionamento
	institutionId = Column(Integer) # Todo: consertar relacionamento
	text = Column(String)
	timeStamp = Column(String)


# Database model
class PostLikes(Base):
	__tablename__ = "postLikes"
	id = Column(Integer, primary_key=True, index=True)
	userId = Column(Integer) # Todo: consertar relacionamento
	postId = Column(Integer) # Todo: consertar relacionamento
	timeStamp = Column(String)


# Database model
class UserFavorites(Base):
	__tablename__ = "userFavorites"
	id = Column(Integer, primary_key=True, index=True)
	userId = Column(Integer) # Todo: consertar relacionamento
	institutionId = Column(Integer) # Todo: consertar relacionamento


