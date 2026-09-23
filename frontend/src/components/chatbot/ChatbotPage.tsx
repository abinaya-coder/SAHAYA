import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Bot, Mic, Send, Globe, ShieldAlert, AlertTriangle, UserCheck } from 'lucide-react';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  time: string;
  isDanger?: boolean;
}

export const ChatbotPage: React.FC = () => {
  const { t } = useLanguage();
  const [victimLang, setVictimLang] = useState<string>('ta');
  const [inputMsg, setInputMsg] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [requestedHuman, setRequestedHuman] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: 'வணக்கம். நான் NHAA AI உதவியாளர். உங்களுக்கு எவ்வாறு உதவ முடியும்? (Hello. I am the NHAA AI Support Assistant. How can I assist you today?)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleSend = () => {
    if (!inputMsg.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessageText = inputMsg.trim();
    
    // Check if immediate danger or distress keywords present
    const isHighDistress = userMessageText.includes('பயம்') || userMessageText.includes('மிரட்டல்') || userMessageText.includes('threat') || userMessageText.includes('afraid') || userMessageText.includes('डर');

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: userMessageText, time: userTime }
    ]);

    setInputMsg('');

    // AI Response
    setTimeout(() => {
      let botResp = 'உங்கள் தகவல் பதிவு செய்யப்பட்டுள்ளது. NHAA அதிகாரி விரைவில் தொடர்பு கொள்வார். (Your information has been logged. An official officer will be notified.)';
      
      if (isHighDistress) {
        botResp = 'உங்கள் தகவலில் பாதுகாப்பு தொடர்பான சொற்கள் அடையாளம் காணப்பட்டுள்ளன. உடனடி மனித அதிகாரியின் உதவியைப் பெற தயவுசெய்து கீழே உள்ள பொத்தானைக் கிளிக் செய்யவும்.';
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botResp,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDanger: isHighDistress
        }
      ]);
    }, 1000);
  };

  const handleToggleMic = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setInputMsg('அவர்கள் என்னை மீண்டும் மிரட்டினார்கள். எனக்கு பயமாக இருக்கிறது.');
        setIsRecording(false);
      }, 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header & Victim Independent Language Picker */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-600/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white">{t('chatbot_name')}</h2>
            <p className="text-xs text-slate-400">Victim-Centred Multi-lingual Grievance & Information Guidance</p>
          </div>
        </div>

        {/* Independent Victim Language Selector */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs">
          <Globe className="w-4 h-4 text-teal-400" />
          <span className="text-slate-400 font-semibold">Victim Chat Language:</span>
          <select
            value={victimLang}
            onChange={(e) => setVictimLang(e.target.value)}
            className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
          >
            <option value="ta" className="bg-slate-900">தமிழ் (Tamil)</option>
            <option value="hi" className="bg-slate-900">हिंदी (Hindi)</option>
            <option value="en" className="bg-slate-900">English</option>
            <option value="te" className="bg-slate-900">తెలుగు (Telugu)</option>
            <option value="kn" className="bg-slate-900">ಕನ್ನಡ (Kannada)</option>
            <option value="ml" className="bg-slate-900">മലയാളം (Malayalam)</option>
          </select>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-300 leading-relaxed font-mono flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>{t('chatbot_disclaimer')}</span>
      </div>

      {/* Main Chat Stream Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-[420px] flex flex-col justify-between shadow-xl">
        {/* Messages */}
        <div className="overflow-y-auto space-y-3 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-lg p-4 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-teal-600 text-white font-medium rounded-br-none'
                    : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-1 px-1">{m.time}</span>

              {/* Immediate Danger Banner if flagged */}
              {m.isDanger && (
                <div className="mt-2 p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-xs text-rose-200 space-y-2 max-w-lg">
                  <div className="flex items-center gap-1.5 font-bold text-rose-300">
                    <ShieldAlert className="w-4 h-4" /> Immediate Human Assistance Recommended
                  </div>
                  <p className="text-[11px]">Your message indicates that you may need immediate human support.</p>
                  <button
                    onClick={() => setRequestedHuman(true)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-lg transition-all shadow-md text-xs flex items-center gap-1.5"
                  >
                    <UserCheck className="w-3.5 h-3.5" /> {t('btn_request_human')}
                  </button>
                </div>
              )}
            </div>
          ))}

          {requestedHuman && (
            <div className="p-3 bg-teal-950/80 border border-teal-800 rounded-xl text-xs text-teal-200 flex items-center gap-2 font-mono">
              <UserCheck className="w-4 h-4 text-teal-400" />
              <span>Human Assistance Requested. Priority alert dispatched to duty NHAA Officer.</span>
            </div>
          )}
        </div>

        {/* Input Controls Area */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleMic}
              className={`p-3 rounded-xl border transition-all ${
                isRecording 
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title="Record Voice Input"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('type_message_placeholder')}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-teal-500"
            />

            <button
              onClick={handleSend}
              className="px-5 py-3 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5"
            >
              <span>Send</span> <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
            <button
              onClick={() => setRequestedHuman(true)}
              className="text-rose-400 hover:underline font-bold flex items-center gap-1"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> {t('btn_request_human')}
            </button>
            <span className="font-mono">NHAA Confidential Channel</span>
          </div>
        </div>
      </div>
    </div>
  );
};
