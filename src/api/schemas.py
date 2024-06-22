from pydantic import BaseModel as PydanticBaseModel

class BaseModel(PydanticBaseModel):
	class Config:
		orm_mode = True

# Pydantic model for request data
class ItemCreate(BaseModel):
	name: str
	description: str
	
# Pydantic model for request data
class ItemUpdate(BaseModel):
	name: str
	description: str

# Pydantic model for response data
class ItemResponse(BaseModel):
	id: int
	name: str
	description: str


# Pydantic model for request data
class InstitutionCreate(BaseModel):
	id: int
	name: str
	email: str
	cnpj: str
	password: str
	
# Pydantic model for request data
class InstitutionUpdate(BaseModel):
	id: int
	name: str
	email: str
	cnpj: str
	password: str

# Pydantic model for response data
class InstitutionResponse(BaseModel):
	id: int
	name: str
	email: str
	cnpj: str
	password: str
	
class UserCreate(BaseModel):
	name: str
	email: str
	username: str
	password: str
	
# Pydantic model for request data
class UserUpdate(BaseModel):
	name: str
	email: str
	username: str
	password: str

# Pydantic model for response data
class UserResponse(BaseModel):
	id: int
	name: str
	email: str
	password: str
	username: str
	
class CommentCreate(BaseModel):
	userId: str
	comment: str
	postId: str
	timeStamp: str
	
# Pydantic model for request data
class CommentUpdate(BaseModel):
	userId: str
	comment: str
	postId: str
	timeStamp: str

# Pydantic model for response data
class CommentResponse(BaseModel):
	userId: str
	comment: str
	postId: str
	timeStamp: str
	
class PostCreate(BaseModel):
	userId: str
	text: str
	title: str
	institutionId: str
	timeStamp: str
	imgLink: str
	
# Pydantic model for request data
class PostUpdate(BaseModel):
	userId: str
	text: str
	title: str
	institutionId: str
	timeStamp: str
	imgLink: str

# Pydantic model for response data
class PostResponse(BaseModel):
	id: int
	userId: str
	text: str
	title: str
	institutionId: str
	timeStamp: str
	imgLink: str

class PostLikesCreate(BaseModel):
	userId: str
	postId: str
	timeStamp: str
	
# Pydantic model for request data
class PostLikesUpdate(BaseModel):
	userId: str
	postId: str
	timeStamp: str

# Pydantic model for response data
class PostLikesResponse(BaseModel):
	id: int
	userId: str
	postId: str
	timeStamp: str
	
class UserFavoritesCreate(BaseModel):
	userId: str
	InstitutionId: str
	
# Pydantic model for request data
class UserFavoritesUpdate(BaseModel):
	userId: str
	InstitutionId: str

# Pydantic model for response data
class UserFavoritesResponse(BaseModel):
	id: int
	userId: str		
	InstitutionId: str