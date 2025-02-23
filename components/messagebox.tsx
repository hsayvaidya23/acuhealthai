import React from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import Markdown from './markdown';
import { Volume2, Loader2 } from 'lucide-react';

type Props = {
  role: string;
  content: string;
  generateSpeech: (text: string) => Promise<void>;
  playingMessage: string | null;
};

const MessageBox = ({ role, content, generateSpeech, playingMessage }: Props) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 text-sm flex items-center justify-between">
        <Markdown text={content} />
        {role !== "user" && (
          <button
            onClick={() => generateSpeech(content)}
            className="ml-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            disabled={playingMessage === content}
          >
            {playingMessage === content ? <Loader2 className="animate-spin size-5" /> : <Volume2 className="size-5" />}
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default MessageBox;
