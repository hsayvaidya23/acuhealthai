# AcuHealth AI

An interactive Next.js application that allows users to upload a medical report, extract its details, and chat with an AI-powered assistant. The app integrates several APIs—including Google Generative AI for content generation, Pinecone as a vector database for storing vector embeddings of the RAG system, and ElevenLabs and Fal.ai to provide a rich, conversational interface for medical insights.

## Table of Contents

- Features
- Usage
- APIs
- Technologies
- Contributers

## Features

- **Upload and Process Reports:** Upload clinical reports to extract key medical findings.
- **Interactive Chat Interface:** Chat with an AI assistant powered by Gemini models.
- **Voice Interaction:** Record user's queries and convert AI responses to speech using ElevenLabs and Fal AI integration.
- **Theme and UI Components:** Toggle between light and dark themes, along with a rich set of UI components.

## Usage

1. Clone the repository:
    ```bash
    git clone https://github.com/perfect7613/acuhealthai.git
    cd elevenlabs-hackethon
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## APIs

- **Google Generative AI:** Used for summarizing the medical reports and user queries.
- **Pinecone:** Utilized as a Vector Database for storing the vector embeddings for the RAG system.
- **ElevenLabs:** Converts text responses from the AI assistant into speech.
- **Fal AI:** Have utilized the fal-ai/whisper for user's speech transcription and language detection .

## Technologies

- **Next.js:** Framework for building the application.
- **React:** Library for building user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **TypeScript:** Superset of JavaScript for type safety.
- **Node.js:** JavaScript runtime for server-side code.

## Contributors

- **Amey Muke:** Backend integration and processing, and some parts of the frontend.
- **Yash Vaidya:** Frontend development and optimization.
