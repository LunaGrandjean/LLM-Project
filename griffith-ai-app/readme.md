# LLM-Project

This project leverages a local LLM (LLaMA 3 via [Ollama](https://ollama.com)) and FAISS to build a searchable knowledge base from the Griffith College Prospectus 2025. It includes a full-stack application with a Node.js backend and a React frontend.

---

## Features

- Local LLM question answering using LLaMA 3 and Ollama
- FAISS-based vector search from embedded text
- Cleaned and processed Griffith College prospectus
- React frontend interface
- User authentication and conversation saving

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/LunaGrandjean/LLM-Project.git
cd LLM-Project
```

---

### 2. Start Ollama with LLaMA 3

Make sure Ollama is installed and running on your machine.

Pull the LLaMA 3 model if you haven't already:

```bash
ollama pull llama3
```

You can test it by running:

```bash
ollama run llama3
```

Leave this running in a terminal, or keep Ollama running as a background service.

---

### 3. Build the FAISS Vectorstore

From the project root:

```bash
python build_vectorstore.py
```

This will:
- Load the cleaned Griffith College prospectus
- Generate embeddings
- Create a FAISS vectorstore for fast search

A `vectorDb` directory will be created. Then move it to the `llm-service` directory to use your faiss database.

---

### 4. Start the llm service

```bash
cd griffith-ai-app/llm-service
python llm-service.py
```

This will launch the Flask app and the development server to interact with the llm. 

---

### 5. Start the Backend

```bash
cd griffith-ai-app/backend
node server.js
```

This will launch the Node.js backend, which connects to Ollama and the FAISS index to answer user queries.

---

### 6. Start the Frontend

```bash
cd griffith-ai-app/frontend
npm install
npm start
```

This will start the frontend (usually on [http://localhost:3000](http://localhost:3000)).

---


## Usage

Once the frontend is open:

- Create an account / log in.
- Ask any question about the Griffith College Prospectus.
- Example:  
  _"What postgraduate courses are available in Computing?"_

The backend will use FAISS + LLaMA 3 to retrieve and generate an accurate answer.

---

## Troubleshooting

- Make sure Ollama is running and the `llama3` model is pulled.
- Re-run `build_vectorstore.py` if the document changes or the index gets corrupted.
- If the backend doesn't start, check Node.js version and dependencies.

## Project Authors

- Luna Grandjean 
- Maia Jouenne 