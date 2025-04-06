import streamlit as st
from chatbot_utils import initialize_components, HumanMessage, AIMessage
from file_processing import process_text
import time

def main():
    st.title("Assistant IA - Griffith College Prospectus 2025")

    # Initialize prompt, memory, LLM, etc.
    initialize_components()

    # Load and process the cleaned prospectus text if not already done
    if 'qa_chain' not in st.session_state:
        st.write("📄 Chargement du prospectus...")
        try:
            with st.spinner("🔧 Traitement du texte... cela peut prendre quelques instants."):
                with open("griffith_college_prospectus_2025_cleaned.txt", "r", encoding="utf-8") as f:
                    text = f.read()
            st.write("✅ Texte chargé - longueur :", len(text))
            process_text(text, "griffith_college_prospectus_2025_cleaned.txt")
            st.write("✅ Traitement du texte terminé")

        except FileNotFoundError:
            st.error("❌ Fichier non trouvé : griffith_college_prospectus_2025_cleaned.txt")
            return
        except Exception as e:
            st.error(f"❌ Erreur lors du chargement du texte : {e}")
            return

    # Display internal states for debugging
    st.write("📦 Vectorstore chargé :", st.session_state.get("vectorstore"))
    st.write("🔍 Retriever prêt :", st.session_state.get("retriever"))
    st.write("🤖 QA Chain prête :", st.session_state.get("qa_chain"))

    # Initialize chat history
    if 'chat_history' not in st.session_state:
        st.session_state.chat_history = []

    # Display chat history
    for message in st.session_state.chat_history:
        role = "user" if isinstance(message, HumanMessage) else "assistant"
        with st.chat_message(role):
            st.markdown(message.content)

    # Show chat input (should be visible now)
    user_input = st.chat_input("Posez une question sur Griffith College...")
    if user_input:
        user_message = HumanMessage(content=user_input)
        st.session_state.chat_history.append(user_message)
        st.session_state.memory.chat_memory.messages.append(user_message)

        with st.chat_message("user"):
            st.markdown(user_input)

        with st.chat_message("assistant"):
            with st.spinner("L'assistant écrit..."):
                response = st.session_state.qa_chain({"query": user_input})

            message_placeholder = st.empty()
            full_response = ""
            for chunk in response['result'].split():
                full_response += chunk + " "
                time.sleep(0.05)
                message_placeholder.markdown(full_response + "▌")
            message_placeholder.markdown(full_response)

        # Save assistant response to history
        chatbot_message = AIMessage(content=response['result'])
        st.session_state.chat_history.append(chatbot_message)
        st.session_state.memory.chat_memory.messages.append(chatbot_message)

if __name__ == "__main__":
    main()
