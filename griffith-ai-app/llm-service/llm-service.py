from flask import Flask, request, jsonify
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings.ollama import OllamaEmbeddings
from langchain.chains import RetrievalQA
from langchain_community.llms import Ollama


app = Flask(__name__)


# Load the vectorstore
embeddings = OllamaEmbeddings(base_url="http://localhost:11434", model="llama3")
vectorstore = FAISS.load_local("vectorDb", embeddings, allow_dangerous_deserialization=True)

# Build a QA chain
llm = Ollama(base_url="http://localhost:11434", model="llama3")
qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=vectorstore.as_retriever())

@app.route("/query", methods=["POST"])
def query():
    data = request.get_json()
    question = data.get("question")

    if not question:
        return jsonify({"answer": "❌ No question provided."}), 400

    print("🔹 Received question:", question)

    try:
        result = qa_chain.run(question)
        print("✅ LLM result:", result)
        return jsonify({"answer": result})
    except Exception as e:
        print("❌ Error running qa_chain:", e)
        return jsonify({"answer": "⚠️ Something went wrong processing your question."}), 500


if __name__ == "__main__":
    app.run(port=5000)
