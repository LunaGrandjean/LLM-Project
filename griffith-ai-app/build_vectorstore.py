from langchain_community.embeddings.ollama import OllamaEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

# Step 1: Load text
print("📂 Loading the prospectus text...")
with open("griffith_college_prospectus_2025_cleaned.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Step 2: Split text into chunks
print("✂️ Splitting text into chunks...")
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1200, chunk_overlap=200)
texts = text_splitter.split_text(text)
print(f"✅ Text split into {len(texts)} chunks")

# Step 3: Generate metadata and documents
print("🧱 Preparing documents...")
metadatas = [{"source": f"{i}-griffith_college_prospectus_2025_cleaned.txt"} for i in range(len(texts))]
docs = [Document(page_content=t, metadata=m) for t, m in zip(texts, metadatas)]

# Step 4: Create embeddings
print("🧠 Generating embeddings using Ollama...")
embeddings = OllamaEmbeddings(base_url="http://localhost:11434", model="llama3")

# Step 5: Create FAISS vectorstore
print("📦 Creating FAISS vectorstore...")
vectorstore = FAISS.from_documents(docs, embeddings)

# Step 6: Save vectorstore locally
print("💾 Saving vectorstore to 'vectorDb/'...")
vectorstore.save_local("vectorDb")

print("🎉 Vectorstore successfully built and saved!")
