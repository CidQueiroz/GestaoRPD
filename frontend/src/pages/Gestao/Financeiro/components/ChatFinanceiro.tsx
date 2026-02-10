import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send } from 'lucide-react';
import api from '../../../../api';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Olá! 👋 Sou seu assistente financeiro. Me conte sobre seus gastos ou faça perguntas sobre suas finanças.',
    role: 'assistant',
    timestamp: new Date(),
  },
];

interface ChatFinanceiroProps {
  onNewTransaction: () => void;
}

export const ChatFinanceiro: React.FC<ChatFinanceiroProps> = ({ onNewTransaction }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await api.post(
        'finance-chat/',
        { question: currentInput }
      );

      // Assuming the backend might tell us if a transaction was logged.
      // The AI response parsing is on the backend, so we check if the parent needs a refresh.
      if (response.data.intent === 'log_transaction') {
        onNewTransaction();
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.text_answer,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Desculpe, não consegui processar sua solicitação no momento. Verifique a conexão com o servidor.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="finance-chat-container">
      {/* Header */}
      <header className="finance-chat-header">
        <div className="finance-chat-header-icon">
          <Sparkles size={20} />
        </div>
        <div className="finance-chat-header-info">
          <h1 className="finance-chat-title">Assistente Financeiro</h1>
          <p className="finance-chat-subtitle">
            {isTyping ? 'Digitando...' : 'Online • Pronto para ajudar'}
          </p>
        </div>
      </header>

      {/* Messages Area */}
      <div className="finance-chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`finance-message ${message.role === 'assistant' ? 'finance-message--assistant' : 'finance-message--user'}`}
          >
            <div className="finance-message__content">
              <p>{message.content}</p>
              {message.role === 'assistant' && message.id === '1' && (
                <ul className="finance-message__examples">
                  <li>"Gastei 50 reais no mercado"</li>
                  <li>"Quanto gastei esse mês?"</li>
                  <li>"Me dê dicas para economizar"</li>
                </ul>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="finance-message finance-message--assistant">
            <div className="finance-message__content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="finance-chat-input-area">
        <div className="finance-chat-input-wrapper">
          <input
            type="text"
            className="finance-chat-input"
            placeholder="Digite seu gasto ou pergunte algo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isTyping}
          />
          <button
            className="finance-chat-send-btn"
            onClick={handleSendMessage}
            disabled={isTyping || !inputValue.trim()}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="finance-chat-hint">
          Ex: "Gastei 50 reais no mercado" ou "Quanto gastei esse mês?"
        </p>
      </div>
    </div>
  );
};
