// import React from "react";
// // import Markdown from "./markdown";
// import { Bot, User2 } from "lucide-react";
// import { Message } from "ai/react";
// import MessageBox from "./messagebox";

// type Props = {
//   messages: Message[];
//   isLoading: boolean;
// };

// const Messages = ({ messages, isLoading }: Props) => {
//   return (
//     <div className="flex flex-col gap-4">
//       {messages.map((m, index) => {
//         return <MessageBox key={index} role={m.role} content={m.content}/>;
//       })}
//     </div>
//   );
// };

// export default Messages;

import { Message } from 'ai';
import React from 'react'
import MessageBox from './messagebox';

type Props = {
  messages: Message[];
  isLoading: boolean;
  generateSpeech: (text: string) => Promise<void>;
  playingMessage: string | null;
}

const Messages = ({ messages, isLoading, generateSpeech, playingMessage }: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      {messages.map((m, index)=>{
        return <MessageBox key={index} role={m.role} content={m.content} generateSpeech={generateSpeech} playingMessage={playingMessage} />
      })}
    </div>
  )
}

export default Messages