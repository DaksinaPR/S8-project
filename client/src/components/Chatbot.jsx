import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I help you with your application today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        try {
            const res = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: inputValue })
            });

            const data = await res.json();

            if (res.ok) {
                const botMessage = {
                    id: Date.now() + 1,
                    text: data.response,
                    sender: 'bot'
                };
                setMessages(prev => [...prev, botMessage]);
            } else {
                const errorMessage = {
                    id: Date.now() + 1,
                    text: "Sorry, I'm encountering an issue. Please check your API key configuration.",
                    sender: 'bot'
                };
                setMessages(prev => [...prev, errorMessage]);
            }
        } catch (error) {
            console.error("Chat Error:", error);
            const errorMessage = {
                id: Date.now() + 1,
                text: "Network error. Please try again later.",
                sender: 'bot'
            };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 sm:w-96 overflow-hidden flex flex-col transition-all duration-300 transform origin-bottom-right">
                    {/* Header */}
                    <div className="bg-[#0070f3] p-4 flex justify-between items-center text-white">
                        <div className="flex items-center space-x-2">
                            <div className="bg-white/20 p-1.5 rounded-lg">
                                <Bot size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Support Assistant</h3>
                                <p className="text-xs text-blue-100">Always here to help</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${msg.sender === 'user'
                                        ? 'bg-[#0070f3] text-white rounded-br-none'
                                        : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim()}
                            className="p-2.5 bg-[#0070f3] text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition transform active:scale-95 shadow-md flex items-center justify-center"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center ${isOpen
                    ? 'bg-gray-700 text-white rotate-90'
                    : 'bg-[#0070f3] text-white hover:bg-blue-600'
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
        </div>
    );
};

export default Chatbot;
