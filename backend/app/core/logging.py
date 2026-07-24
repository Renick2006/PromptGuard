from pathlib import Path

from loguru import logger

# Create logs directory if it doesn't exist
LOG_DIR = Path("logs")
LOG_DIR.mkdir(exist_ok=True)

# Remove default logger
logger.remove()

# Console logger
logger.add(
    sink=lambda msg: print(msg, end=""),
    level="INFO",
    colorize=True,
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | "
           "<level>{level}</level> | "
           "<cyan>{name}</cyan>:<cyan>{function}</cyan> - "
           "<level>{message}</level>",
)

# File logger
logger.add(
    LOG_DIR / "promptguard.log",
    rotation="10 MB",
    retention="30 days",
    compression="zip",
    level="DEBUG",
    enqueue=True,
)

__all__ = ["logger"]