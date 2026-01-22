from sqlalchemy import String, Integer, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key= True, index= True)
    email: Mapped[str] = mapped_column(String, unique= True, index= True, nullable= False)
    hashed_password: Mapped[str] = mapped_column(String, nullable= False)
    is_active: Mapped[bool] = mapped_column(Boolean, default= True)
    tasks = relationship("Task", back_populates="owner", cascade="all, delete")