from fastapi import FastAPI

from app.api.v1.router import router
from app.core.config import settings
from app.db.session import engine
from app.db.base import Base

from app.models import User

app = FastAPI(title= settings.PROJECT_NAME)

@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(router, prefix="/api/v1")