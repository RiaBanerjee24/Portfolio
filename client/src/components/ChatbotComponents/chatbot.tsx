// Full integration of your chatbot UI with backend API

import { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm Ria's AI assistant, built with Langchain and OpenAI. I'm trained on Ria's resume. You can ask me about Ria's proffesional experience!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  type ChatMessage = { sender: 'user' | 'bot'; text: string };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
    //   const res = await fetch('http://localhost:5000/chatbot/ask', {
      const res = await fetch('/api/chatbot/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      if (res.status === 429) {
        const rateLimitMessage: ChatMessage = {
          sender: 'bot',
          text: data.message || 'You are sending messages too fast. Try again later.',
        };
        setMessages((prev) => [...prev, rateLimitMessage]);
        return;
      }
      const botMessage: ChatMessage = { sender: 'bot', text: data.answer || 'No response' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { sender: 'bot', text: "Oops! Something went wrong." }]);
    }

    setIsTyping(false);
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 text-gray-500 mb-2">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span className="text-sm">Ria's assistant is typing...</span>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Styles */}
      <style>{`
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.1) rotate(180deg); opacity: 0.8; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%) scale(0.8); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 191, 255, 0.4); }
          50% { box-shadow: 0 0 0 20px rgba(0, 191, 255, 0); }
        }
        .chatbot-button {
          animation: float 3s ease-in-out infinite, pulse 2s infinite;
        }
        .sparkle::before {
          content: '✨';
          position: absolute;
          top: -5px;
          right: -5px;
          animation: sparkle 2s ease-in-out infinite;
        }
        .slide-up {
          animation: slideUp 0.3s ease-out;
        }
        .message-user {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 18px 18px 4px 18px;
          padding: 12px 16px;
          max-width: 80%;
          margin-left: auto;
          margin-bottom: 12px;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
          animation: slideUp 0.3s ease-out;
        }
        .message-bot {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          border-radius: 18px 18px 18px 4px;
          padding: 12px 16px;
          max-width: 80%;
          margin-right: auto;
          margin-bottom: 12px;
          box-shadow: 0 2px 8px rgba(240, 147, 251, 0.3);
          animation: slideUp 0.3s ease-out;
        }
        .chat-container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .input-glow:focus {
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
          border-color: #667eea;
        }
      `}</style>

      {isOpen ? (
        <div className="w-[90vw] h-[70vh] sm:w-[500px] sm:h-[500px] chat-container rounded-2xl shadow-2xl flex flex-col slide-up">
          <div className="text-white p-4 rounded-t-2xl flex justify-between items-center relative overflow-hidden">
            <div className="flex items-center space-x-3 z-10">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <span className="font-semibold text-lg">Ria's AI Assistant</span>
                <div className="text-xs opacity-90">Always here to help</div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm z-10"
            >✕</button>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto glass-effect">
            <div className="space-y-1">
              {messages.map((msg, i) => (
                <div key={i} className="flex">
                  <div className={msg.sender === 'user' ? 'message-user' : 'message-bot'}>{msg.text}</div>
                </div>
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 glass-effect rounded-b-2xl border-t border-white/20">
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 border-2 border-gray-200 rounded-full px-4 py-2 focus:outline-none input-glow transition-all duration-200 bg-white/90"
                placeholder="Type your message..."
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >Ask</button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="chatbot-button rounded-full shadow-2xl flex items-center justify-center text-lg px-6 py-3 relative overflow-hidden border-2 border-white/20"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}
        >
          <span className="hidden lg:inline mr-3 font-semibold z-10">Talk to Ria's assistant</span>
          <span className="z-10 text-2xl">💬</span>
          <div className="sparkle absolute inset-0 z-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>
        </button>
      )}
    </div>
  );
};

export default Chatbot;