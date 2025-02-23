import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import Markdown from './markdown';
import { Volume2, Loader2 } from 'lucide-react';

type Props = {
  role: string;
  content: string;
  generateSpeech: (text: string) => Promise<void>;
  playingMessage: string | null;
};

const MessageBox = ({ role, content, generateSpeech, playingMessage }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleVolumeClick = async () => {
    setIsLoading(true);
    await generateSpeech(content);
    setIsLoading(false);
  };
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 text-sm flex items-center justify-between">
        <Markdown text={content} />
        {role !== "user" && (
          <button
            onClick={handleVolumeClick}
            className="ml-2 p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
            disabled={isLoading || playingMessage === content}
          >
            {isLoading || playingMessage === content ? (
              <Loader2 className="animate-spin size-5 text-green-600" />
            ) : (
              <Volume2 className="size-5 text-green-600" />
            )}
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default MessageBox;
