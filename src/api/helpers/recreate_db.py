import sys
import os

# Adiciona o diretório src ao caminho de pesquisa do Python
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from sqlalchemy import create_engine
from api.models import Base  # Importação ajustada

# Certifique-se de usar a mesma URL do banco de dados usada em seu aplicativo
DATABASE_URL = "sqlite:///./main.db"  # Atualize este caminho conforme necessário

engine = create_engine(DATABASE_URL)

# Drop all tables
Base.metadata.drop_all(bind=engine)

# Create all tables
Base.metadata.create_all(bind=engine)

print("Database recreated successfully.")
