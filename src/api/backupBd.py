from fastapi import FastAPI, APIRouter
from fastapi.responses import FileResponse

file_path = "main.db"
app = FastAPI()

router = APIRouter()

@router.get("/download")
def main():
    return FileResponse(path=file_path, filename=file_path, media_type='text/mp4')