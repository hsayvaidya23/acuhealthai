"use client";
import React, { useState, useRef } from "react";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Mic, CornerDownLeft, Loader2, Volume2 } from "lucide-react";
import Messages from "./messages";
import Markdown from "./markdown";
import { fal } from "@fal-ai/client";

const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_KEY;
const FAL_AI_KEY = process.env.NEXT_PUBLIC_FAL_API_KEY;
const VOICE_ID = 'hGb0Exk8cp4vQEnwolxa';

type Props = {
  reportData?: string;  // ✅ Add reportData as an optional prop
};

fal.config({
  credentials: FAL_AI_KEY,
});

const ChatComponent = ({ reportData }: Props) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({ api: "api/medichatgemini" });

  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [playingMessage, setPlayingMessage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // 🎙️ Start recording voice
  const startRecording = async () => {
    setIsRecording(true);
    audioChunks.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        await sendAudioToFalAI(audioBlob);
      };

      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setIsRecording(false);
    }
  };

  // 🛑 Stop recording
  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  // 🔍 Send recorded audio to Fal AI Whisper API for language detection
  const sendAudioToFalAI = async (audioBlob: Blob) => {
    try {
      const falUrl = await fal.storage.upload(audioBlob);
      console.log("Uploaded Audio URL:", falUrl);

      const result = await fal.subscribe("fal-ai/whisper", {
        input: { audio_url: falUrl, task: "transcribe" },
        logs: true,
      });

      const transcript = result.data.text;
      const inferredLanguages = result.data.inferred_languages;

      setDetectedLanguage(inferredLanguages?.[0] || "en");
      handleInputChange({ target: { value: transcript } } as React.ChangeEvent<HTMLTextAreaElement>);
    } catch (error) {
      console.error("Error transcribing voice:", error);
    }
  };

  // 🔊 Convert AI-generated response to speech
  const generateSpeech = async (text: string) => {
    try {
      const langCode = detectedLanguage || "en";

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.5 },
          output_format: "mp3",
          language: langCode, // Use detected language
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch speech data");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      setPlayingMessage(text);

      audio.onended = () => {
        setPlayingMessage(null);
      };
    } catch (error) {
      console.error("Speech generation failed:", error);
    }
  };

  return (
    <div className="h-full bg-muted/50 relative flex flex-col min-h-[50vh] rounded-xl p-4 gap-4">
      

      <Messages messages={messages} isLoading={isLoading} generateSpeech={generateSpeech} playingMessage={playingMessage} />

      <form
        className="relative overflow-hidden rounded-lg border bg-background"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: { reportData: reportData || "" },
          });
        }}
      >
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your query here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <Button disabled={isLoading} type="submit" size="sm" className="ml-auto">
            {isLoading ? "Analysing..." : "3. Ask"}
            {isLoading ? <Loader2 className="size-3.5 animate-spin" /> : <CornerDownLeft className="size-3.5" />}
          </Button>
        </div>
        <div className="flex items-center p-3 pt-0">
          <Button onClick={isRecording ? stopRecording : startRecording} className={`bg-blue-500 text-white ${isRecording ? "bg-red-500" : ""}`}>
            <Mic className="size-5" /> {isRecording ? "Stop Recording" : "Record Voice"}
          </Button>
          {detectedLanguage && <span>🗣️ Detected: {detectedLanguage.toUpperCase()}</span>}
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
