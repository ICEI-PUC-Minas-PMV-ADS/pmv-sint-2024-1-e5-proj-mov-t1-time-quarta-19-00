import hashlib

def encryptPass(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()