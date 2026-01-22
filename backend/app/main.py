from fastapi import FastAPI

from app.api.v1.router import router
from app.core.config import settings

app = FastAPI(title= settings.PROJECT_NAME)

app.include_router(router, prefix="/api/v1")