from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings.ollama import OllamaEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain.chains import RetrievalQA
import streamlit as st
import os

def process_text(text, filename):
    # 1. Split text
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1200, chunk_overlap=200)
    texts = text_splitter.split_text(text)

    # 2. Embed with Ollama
    embeddings = OllamaEmbeddings(base_url='http://localhost:11434', model="llama3")

    # 3. Prepare documents with metadata
    metadatas = [{"source": f"{i}-{filename}"} for i in range(len(texts))]
    docs = [Document(page_content=t, metadata=m) for t, m in zip(texts, metadatas)]

    # 4. Create FAISS vectorstore
    st.session_state.vectorstore = FAISS.from_documents(docs, embeddings)

    # 5. Save FAISS vectorstore locally for reuse
    os.makedirs("vectorDb", exist_ok=True)
    st.session_state.vectorstore.save_local("vectorDb")

    # 6. Setup retriever + QA chain
    st.session_state.retriever = st.session_state.vectorstore.as_retriever()
    st.session_state.qa_chain = RetrievalQA.from_chain_type(
        llm=st.session_state.llm,
        chain_type='stuff',
        retriever=st.session_state.retriever,
        verbose=True,
        chain_type_kwargs={
            "verbose": True,
            "prompt": st.session_state.prompt,
            "memory": st.session_state.memory,
        }
    )
