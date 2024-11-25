import React, { useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatInput = ({ value, onChange, onSubmit, disabled }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative bg-white shadow-lg rounded-2xl">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="무엇이든 물어보세요..."
        className="w-full px-6 py-4 pr-14 bg-[#F8F9FB] rounded-2xl outline-none 
                   resize-none overflow-hidden min-h-[52px] max-h-[200px]"
        disabled={disabled}
        rows={1}
        style={{ lineHeight: '1.5' }}
      />
      
      <AnimatePresence>
        {disabled ? (
          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
          </div>
        ) : (
          <button 
            type="submit"
            disabled={!value.trim() || disabled}
            className={`absolute right-5 top-1/2 -translate-y-1/2 
                      ${value.trim() ? 'text-blue-500 hover:text-blue-600' : 'text-gray-300'} 
                      transition-colors duration-200`}
          >
            <Send size={18} />
          </button>
        )}
      </AnimatePresence>
    </form>
  );
};