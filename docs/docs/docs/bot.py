"""
TradeSmart Co. — Company Knowledge Bot
Answers questions based on docs/ folder using Claude API
"""

import os
import glob

def load_docs(docs_path="docs/"):
    """Load all markdown files from docs folder"""
    docs = {}
    for filepath in glob.glob(f"{docs_path}*.md"):
        filename = os.path.basename(filepath)
        with open(filepath, "r", encoding="utf-8") as f:
            docs[filename] = f.read()
    return docs

def build_context(docs):
    """Combine all docs into a single context string"""
    context = ""
    for filename, content in docs.items():
        context += f"\n\n--- {filename} ---\n{content}"
    return context

def answer_question(question, context):
    """Answer a question based on provided context"""
    import anthropic
    client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
    
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=500,
        messages=[{
            "role": "user",
            "content": f"""You are TradeSmart Co.'s support assistant.
Answer ONLY based on the documents below. If the answer isn't in the docs, say so.

DOCUMENTS:
{context}

QUESTION: {question}"""
        }]
    )
    return message.content[0].text

def main():
    print("TradeSmart Knowledge Bot")
    print("Type 'quit' to exit\n")
    docs = load_docs()
    if not docs:
        print("No docs found in docs/ folder")
        return
    context = build_context(docs)
    while True:
        question = input("Your question: ").strip()
        if question.lower() == "quit":
            break
        if question:
            print(f"\nAnswer: {answer_question(question, context)}\n")

if __name__ == "__main__":
    main()
