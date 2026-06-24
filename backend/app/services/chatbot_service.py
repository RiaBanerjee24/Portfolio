import os

from flask import current_app
from langchain.chains import RetrievalQA
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)
from langchain_community.vectorstores import FAISS
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

from app.config import Config

SYSTEM_PROMPT = """
You are a helpful AI assistant that answers questions about a candidate's resume.
Only use information from the provided context. If unsure, say you don't know.
Be concise, factual, and job-relevant.
"""

PROMPT = ChatPromptTemplate.from_messages(
    [
        SystemMessagePromptTemplate.from_template(SYSTEM_PROMPT),
        HumanMessagePromptTemplate.from_template(
            "Use the following context to answer the question.\n\nContext: {context}\n\nQuestion: {question}"
        ),
    ]
)


class ChatbotService:
    def __init__(self):
        self.qa_chain = None

    def _load_resume_chunks(self, chunk_size=500):
        resume_path = os.path.join(current_app.root_path, "docs", "resume.txt")
        with open(resume_path, "r", encoding="utf-8") as f:
            text = f.read()
        return [text[i : i + chunk_size] for i in range(0, len(text), chunk_size)]

    def _build_chain(self):
        chunks = self._load_resume_chunks()
        embedding = OpenAIEmbeddings(openai_api_key=Config.OPENAI_API_KEY)
        vectorstore = FAISS.from_texts(chunks, embedding)
        llm = ChatOpenAI(
            model="gpt-3.5-turbo", temperature=0, openai_api_key=Config.OPENAI_API_KEY
        )
        return RetrievalQA.from_chain_type(
            llm=llm,
            retriever=vectorstore.as_retriever(),
            return_source_documents=False,
            chain_type_kwargs={"prompt": PROMPT},
        )

    def get_answer(self, question: str) -> str:
        if self.qa_chain is None:
            self.qa_chain = self._build_chain()
        return self.qa_chain.run(question)
