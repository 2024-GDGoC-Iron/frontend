import React from 'react';
import logo from '../../assets/ai.jpg';
import { motion } from 'framer-motion';

export const ChatMessage = ({ message, isUser }) => {
  const { text, time } = message;
  
  const formatText = (text) => {
    return text
      .split('\n')
      .map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i !== text.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
  };

  // 애니메이션 variants
  const messageVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 40
      }
    }
  };

  return (
    <motion.div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start gap-3 mb-4`}
      initial="hidden"
      animate="visible"
      variants={messageVariants}
    >
      {!isUser && (
        <motion.div 
          className="flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
            <img
              src={logo}
              alt="IN!PICK AI"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-200"
            />
          </div>
        </motion.div>
      )}
      
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && (
          <motion.div 
            className="text-sm font-semibold mb-1 text-gray-700 flex items-center gap-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-blue-500">IN!PICK</span>
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>
        )}
        
        <div className="flex flex-col gap-1">
          <motion.div 
            className={`rounded-2xl px-4 py-2.5 max-w-xl whitespace-pre-wrap break-words
                       shadow-sm hover:shadow-md transition-shadow duration-200 ${
              isUser 
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-tr-none leading-relaxed' 
                : 'bg-white border border-gray-100 text-gray-900 rounded-tl-none leading-relaxed'
            }`}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {formatText(text)}
          </motion.div>
          <motion.div 
            className={`text-xs text-gray-400 ${isUser ? 'text-right' : 'text-left'} 
                       flex items-center gap-1`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {!isUser && <div className="w-1 h-1 bg-gray-300 rounded-full" />}
            {time || new Date().toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};