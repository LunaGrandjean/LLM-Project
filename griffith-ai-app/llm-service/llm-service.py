from flask import Flask, request, jsonify
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings.ollama import OllamaEmbeddings
from langchain_community.llms import Ollama

app = Flask(__name__)

# Load FAISS and LLM
embeddings = OllamaEmbeddings(base_url="http://localhost:11434", model="llama3")
vectorstore = FAISS.load_local("vectorDb", embeddings, allow_dangerous_deserialization=True)
retriever = vectorstore.as_retriever(search_kwargs={"k": 15})  # 6 chunks
llm = Ollama(base_url="http://localhost:11434", model="llama3")

@app.route("/query", methods=["POST"])
def query():
    data = request.get_json()
    user_question = data.get("question")

    if not user_question:
        return jsonify({"answer": "❌ No question provided."}), 400

    try:
        # Retrieve relevant chunks
        docs = retriever.get_relevant_documents(user_question)
        retrieved_chunks = [doc.page_content for doc in docs]

        # Build system prompt
        system_prompt = """
            You are Griffith AI, an assistant who responds only with information provided by the official Griffith College 2025 document.
            If the answer isn't in these documents, say, "I'm not sure about this answer."
            Be clear, professional, and give structured answers.
        """.strip()

        # Combine all in a final prompt
        final_prompt = f"{system_prompt}\n\nQuestion : {user_question}\n\nContenu :\n" + "\n\n".join(retrieved_chunks)

        print("📥 Prompt sent to LLM:\n", final_prompt)

        # Ask the LLM
        response = llm.invoke(final_prompt)

        return jsonify({
            "answer": response,
            "sources": retrieved_chunks
        })

    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"answer": "⚠️ Something went wrong processing your question."}), 500

if __name__ == "__main__":
    app.run(port=5000)
