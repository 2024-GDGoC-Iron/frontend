// src/components/chat/ChatInput.jsx
import { Send } from 'lucide-react';

export const ChatInput = ({ onSend }) => {
  return (
    <div className="relative">
      <input 
        type="text"
        placeholder="구체적으로 물어보세요?"
        className="w-full bg-gray-100 rounded-full py-3 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center"
        onClick={onSend}
      >
        <Send className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
};