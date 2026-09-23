import React, { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FloatingChatbot: React.FC<{ onOpenFullPage: () => void }> = ({ onOpenFullPage }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'NHAA AI Support Assistant. How may I guide you?' }
  ]);

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: inputMsg }]);
    setInputMsg('');
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Thank you for reaching out. An official NHAA officer will be notified.' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-teal-600 hover:bg-teal-500 text-white rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center border border-teal-400"
          title={t('chatbot_name')}
        >
          <Bot className="w-7 h-7" />
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[460px]">
          {/* Header */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-teal-400" />
              <span className="text-xs font-bold text-white">{t('chatbot_name')}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            <div className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-300 font-mono">
              {t('chatbot_disclaimer')}
            </div>

            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-xl max-w-[80%] ${m.sender === 'user' ? 'bg-teal-600 text-white' : 'bg-slate-950 text-slate-200 border border-slate-800'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-slate-800 space-y-2 bg-slate-950">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type message..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
              />
              <button onClick={handleSend} className="p-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl">
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-between text-[10px]">
              <button onClick={onOpenFullPage} className="text-teal-400 hover:underline">
                Open Full Screen Chat →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
