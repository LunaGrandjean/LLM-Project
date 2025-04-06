import streamlit as st
from langchain_ollama import OllamaEmbeddings, OllamaLLM
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.schema import HumanMessage as LangHumanMessage, AIMessage as LangAIMessage
from langchain_community.llms import Ollama
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.callbacks.manager import CallbackManager
from langchain.chains import RetrievalQA
from langchain_community.vectorstores import FAISS  

def initialize_components():
    if 'template' not in st.session_state:
        st.session_state.template = """You are an academic assistant for Griffith College. Your job is to provide accurate and helpful answers based on the 2025 college prospectus.

Context: {context}
History: {history}

User: {question}
Assistant:"""

    if 'prompt' not in st.session_state:
        st.session_state.prompt = PromptTemplate(
            input_variables=["history", "context", "question"],
            template=st.session_state.template,
        )

    if 'memory' not in st.session_state:
        st.session_state.memory = ConversationBufferMemory(
            memory_key="history",
            return_messages=True,
            input_key="question",
        )

    if 'llm' not in st.session_state:
        st.session_state.llm = Ollama(
            base_url="http://localhost:11434",
            model="llama3",
            verbose=True,
            callback_manager=CallbackManager([StreamingStdOutCallbackHandler()])
        )

    # ✅ Load FAISS vectorstore if it exists
    if 'vectorstore' not in st.session_state:
        try:
            st.session_state.vectorstore = FAISS.load_local(
                folder_path="vectorDb",
                embeddings=OllamaEmbeddings(base_url="http://localhost:11434", model="llama3"),
                allow_dangerous_deserialization=True
            )
        except Exception as e:
            st.warning(f"⚠️ Could not load FAISS vectorstore: {e}")
            st.session_state.vectorstore = None

    # ✅ Setup retriever and chain only if vectorstore is loaded
    if st.session_state.vectorstore and 'retriever' not in st.session_state:
        st.session_state.retriever = st.session_state.vectorstore.as_retriever(
            search_type="mmr",
            search_kwargs={"k": 8}
        )

    if 'retriever' in st.session_state and 'qa_chain' not in st.session_state:
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

def HumanMessage(content):
    return LangHumanMessage(content=content)

def AIMessage(content):
    return LangAIMessage(content=content)
