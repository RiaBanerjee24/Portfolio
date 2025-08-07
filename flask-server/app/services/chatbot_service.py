# app/services/chatbot_service.py

import os
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.prompts import (
    ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
)
from app.utils.logger import get_chat_logger  # adjust this if needed
from app.config import Config
from flask import current_app
logger = get_chat_logger()

load_dotenv()


system_prompt = """
You are a helpful AI assistant that answers questions about a candidate's resume.
Only use information from the provided context. If unsure, say you don't know.
Be concise, factual, and job-relevant.
"""

prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template(system_prompt),
    HumanMessagePromptTemplate.from_template(
        "Use the following context to answer the question.\n\nContext: {context}\n\nQuestion: {question}"
    )
])

class ChatbotService:
    def __init__(self):
        self.qa_chain = None  # defer building until needed

    def load_resume_chunks(self, chunk_size=500):
        resume_path = os.path.join(current_app.root_path, 'docs', 'resume.txt')
        with open(resume_path, "r", encoding="utf-8") as f:
            text = f.read()
        return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

    def build_chatbot(self):
        chunks = self.load_resume_chunks()
        embedding = OpenAIEmbeddings(openai_api_key=Config.OPENAI_API_KEY)
        vectorstore = FAISS.from_texts(chunks, embedding)
        retriever = vectorstore.as_retriever()

        llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0, openai_api_key=Config.OPENAI_API_KEY)

        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            retriever=retriever,
            return_source_documents=False,
            chain_type_kwargs={"prompt": prompt}
        )
        return qa_chain

    def get_answer(self, question: str) -> str:
        # lazy-load QA chain on first request
        if self.qa_chain is None:
            self.qa_chain = self.build_chatbot()
        return self.qa_chain.run(question)