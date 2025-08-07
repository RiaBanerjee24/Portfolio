import os
class Config:
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_PORT = os.getenv('MAIL_PORT')
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS')
    MAIL_USE_SSL = os.getenv('MAIL_USE_SSL')
    MAIL_USERNAME = os.getenv('EMAILTO')
    MAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.getenv('EMAILFROM')
    RECAPTCHA_SECRET_KEY = os.getenv('RECAPTCHA_SECRET_KEY')
    GOOGLE_RECAPTCHA_URL = os.getenv('GOOGLE_RECAPTCHA_URL')
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")