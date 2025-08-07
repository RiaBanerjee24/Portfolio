import logging
from logging.handlers import RotatingFileHandler
import os
def get_logger():
    logging.basicConfig(level=logging.DEBUG)
    logger = logging.getLogger(__name__)
    return logger


def get_chat_logger():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    app_dir = os.path.abspath(os.path.join(base_dir, '..'))
    log_dir = os.path.join(app_dir, 'logs')
    os.makedirs(log_dir, exist_ok=True)
    log_file = os.path.join(log_dir, 'chat.log')

    logger = logging.getLogger('chat_logger')
    logger.setLevel(logging.INFO)

    if not logger.handlers:
        file_handler = RotatingFileHandler(
            log_file, maxBytes=20 * 1024 * 1024, backupCount=5, encoding='utf-8'
        )
        formatter = logging.Formatter('%(asctime)s [%(levelname)s] %(message)s')
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)

    return logger
