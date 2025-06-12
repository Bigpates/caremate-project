'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- SVG ICONS (Self-contained, no library needed) ---
const Icon = ({ path, className = "h-6 w-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
);

const NewChatIcon = () => <Icon path="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />;
const PaperclipIcon = () => <Icon path="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01.01-.01z" />;
const SendIcon = () => <Icon path="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />;
const MicIcon = () => <Icon path="M12 18.75a6 6 0 006-6v-1.5a6 6 0 00-12 0v1.5a6 6 0 006 6z" />;
const StopIcon = () => <Icon path="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25-2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />;
const SettingsIcon = () => <Icon path="M9.594 3.94c.09-.542.56-1.008 1.11-1.212.55-.203 1.203-.125 1.743.187l.22.163c.24.18.52.322.82.404.3.082.62.12.94.12s.64-.038.94-.12a1.454 1.454 0 01.82-.404l.22-.163c.54-.402 1.27-.47 1.84-.158.57.312.95.895.95 1.542 0 .223-.02.443-.06.66a1.442 1.442 0 00.32 1.084l.162.22c.403.54.47 1.27.158 1.84-.312.57-.895.95-1.542.95-.223 0-.443-.02-.66-.06a1.442 1.442 0 00-1.084.32l-.22.162c-.54.403-1.27.47-1.84.158-.57-.312-.95-.895-.95-1.542 0-.223.02-.443.06-.66a1.442 1.442 0 00-.32-1.084l-.162-.22c-.403-.54-.47-1.27-.158-1.84.312-.57.895-.95 1.542-.95.223 0 .443-.02.66-.06a1.442 1.442 0 001.084-.32l.22-.162c.54-.403 1.27-.47 1.84-.158.57.312.95.895.95-1.542zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
const UserProfileIcon = () => <Icon path="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
const CloseIcon = () => <Icon path="M6 18L18 6M6 6l12 12" />

const BotIcon = () => (
    <div className="w-9 h-9 rounded-lg bg-black border border-primary/50 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
        <Icon path="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L24.999 9l-.813-2.846a4.5 4.5 0 00-3.09-3.09L18.25 3l-2.846.813a4.5 4.5 0 00-3.09 3.09L11.502 9l.813 2.846a4.5 4.5 0 003.09 3.09L18.25 12z" className="h-5 w-5 text-primary" />
    </div>
);
const UserIcon = () => <Icon path="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" className="h-8 w-8 text-secondary-text"/>;

// --- Component Definitions ---
const promptStarters = [
    { title: "Explain my budget", subtitle: "in simple terms" },
    { title: "Help me draft a letter", subtitle: "to my doctor or provider" },
    { title: "What are common supports for...", subtitle: "autism, cerebral palsy, etc." },
    { title: "How do I prepare?", subtitle: "for a plan review meeting" }
];

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeChatId, setActiveChatId] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const chatContainerRef = useRef(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const mediaRecorderRef = useRef(null);

    // --- Effects ---
    useEffect(() => {
        const storedHistory = localStorage.getItem('caremate_chat_history');
        if (storedHistory) setChatHistory(JSON.parse(storedHistory));
    }, []);

    useEffect(() => {
        if (chatHistory.length > 0) {
            localStorage.setItem('caremate_chat_history', JSON.stringify(chatHistory));
        }
    }, [chatHistory]);

    useEffect(() => {
        chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, isLoading]);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [input]);

    // --- Core Logic ---
    const handleSendMessage = async (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput && !selectedFile) return;

        setError(null);
        setIsLoading(true);
        const userMessage = { id: Date.now(), role: 'user', content: trimmedInput };
        const currentMessages = [...messages, userMessage];
        setMessages(currentMessages);
        setInput('');
        setSelectedFile(null);

        try {
            // Note: In a real app, you would handle file uploads here (e.g., to S3)
            // and pass the file URL along with the message.
            console.log("Selected file (placeholder):", selectedFile);

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: currentMessages }),
            });
            
            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                let errorText;
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const err = await response.json();
                    errorText = err.error || 'The server returned an error.';
                } else {
                    errorText = 'The server returned an invalid response. Please ensure the /api/chat route is configured correctly.';
                    console.error("Received non-JSON response from server.");
                }
                throw new Error(errorText);
            }
            
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantResponse = '';
            const placeholderId = Date.now() + 1;
            setMessages(prev => [...prev, { id: placeholderId, role: 'assistant', content: '' }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                assistantResponse += decoder.decode(value, { stream: true });
                setMessages(prev => prev.map(msg => 
                    msg.id === placeholderId ? { ...msg, content: assistantResponse } : msg
                ));
            }

            // Finalize the state and update history
            setMessages(prevMessages => {
                const finalMessages = prevMessages.map(msg => 
                    msg.id === placeholderId ? { ...msg, content: assistantResponse } : msg
                );

                if (activeChatId) {
                    setChatHistory(prevHistory => prevHistory.map(chat =>
                        chat.id === activeChatId ? { ...chat, messages: finalMessages } : chat
                    ));
                } else {
                    const newChatId = Date.now();
                    setActiveChatId(newChatId);
                    setChatHistory(prevHistory => [...prevHistory, { id: newChatId, title: trimmedInput.substring(0, 35) + '...', messages: finalMessages }]);
                }
                
                return finalMessages;
            });

        } catch (err) {
            setError(err.message);
            // Revert the optimistic UI update on failure
            setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleAudioRecording = async () => {
        if (isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorderRef.current = new MediaRecorder(stream);
                mediaRecorderRef.current.start();
                
                const audioChunks = [];
                mediaRecorderRef.current.ondataavailable = (event) => {
                    audioChunks.push(event.data);
                };
                
                mediaRecorderRef.current.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    // In a real app, you would send this blob to a speech-to-text API
                    console.log("Audio recorded:", audioBlob);
                    setInput("Audio recorded (placeholder). Transcription would appear here.");
                    stream.getTracks().forEach(track => track.stop());
                };
                
                setIsRecording(true);
            } catch (err) {
                console.error("Microphone access denied:", err);
                setError("Microphone access was denied. Please enable it in your browser settings.");
            }
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleNewChat = () => {
        setActiveChatId(null);
        setMessages([]);
        setInput('');
        setSelectedFile(null);
    };

    const loadChat = (chatId) => {
        const chat = chatHistory.find(c => c.id === chatId);
        if (chat) {
            setActiveChatId(chat.id);
            setMessages(chat.messages);
            setInput('');
        }
    };
    
    // --- Render ---
    return (
        <div className="flex h-screen bg-background text-primary-text font-sans antialiased">
            {/* Hidden file input */}
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />

            <aside className="w-80 bg-black/30 p-4 flex flex-col border-r border-white/10 shrink-0">
                <button 
                  onClick={handleNewChat} 
                  className="bg-primary text-background font-bold text-base py-3 px-6 rounded-full hover:shadow-lg hover:shadow-primary/20 hover:brightness-110 transition-all duration-300 mb-6 flex items-center justify-center gap-2"
                >
                    <NewChatIcon /> New Chat
                </button>
                <div className="flex-1 overflow-y-auto -mr-2 pr-2">
                    <h2 className="px-2 mb-2 text-sm font-semibold text-secondary-text">Recent</h2>
                    <nav className="flex flex-col space-y-1">
                        {chatHistory.map(chat => (
                            <button key={chat.id} onClick={() => loadChat(chat.id)} className={`p-3 text-sm text-left truncate rounded-lg transition-colors w-full ${activeChatId === chat.id ? 'bg-white/5 text-primary-text' : 'text-secondary-text hover:bg-white/5 hover:text-primary-text'}`}>
                                {chat.title}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="pt-4 border-t border-white/10 flex flex-col space-y-1">
                    <button onClick={() => alert('Profile page coming soon!')} className="w-full flex items-center gap-3 p-3 text-sm rounded-lg text-secondary-text hover:bg-white/5 hover:text-primary-text transition-colors">
                        <UserProfileIcon /> My Profile
                    </button>
                    <button onClick={() => setIsSettingsOpen(true)} className="w-full flex items-center gap-3 p-3 text-sm rounded-lg text-secondary-text hover:bg-white/5 hover:text-primary-text transition-colors">
                        <SettingsIcon /> Settings
                    </button>
                </div>
            </aside>
            
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

            <main className="flex-1 flex flex-col bg-background/80">
                <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto">
                    {messages.length === 0 ? <WelcomeScreen onPromptClick={(text) => setInput(text)} />
                    : (
                        <div className="space-y-8 max-w-4xl mx-auto w-full">
                           {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                           {isLoading && (
                                <div className="flex gap-4 items-start">
                                    <BotIcon />
                                    <div className="p-4 rounded-xl bg-[#1A1A1A] flex items-center">
                                        <span className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                        <span className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.15s] mx-1"></span>
                                        <span className="h-2 w-2 bg-primary rounded-full animate-pulse"></span>
                                    </div>
                                </div>
                           )}
                        </div>
                    )}
                </div>

                <div className="p-4 w-full max-w-4xl mx-auto">
                    {selectedFile && (
                        <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-2 px-4 mb-3 flex items-center justify-between text-sm animate-fade-in-up">
                            <span className="text-secondary-text truncate">{selectedFile.name}</span>
                            <button onClick={() => setSelectedFile(null)} className="p-1 rounded-full hover:bg-white/10 text-secondary-text hover:text-primary-text">
                                <CloseIcon className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                    <form onSubmit={handleSendMessage} className="relative">
                        <div className="flex items-end gap-2 border border-white/10 rounded-xl p-2 bg-[#1A1A1A]/80 backdrop-blur-sm transition-all duration-300 focus-within:border-primary/80 hover:border-white/20">
                            <button type="button" onClick={() => fileInputRef.current.click()} className="p-2 transition-colors text-secondary-text hover:text-primary-text"><PaperclipIcon /></button>
                            <button type="button" onClick={handleAudioRecording} className={`p-2 transition-colors text-secondary-text hover:text-primary-text ${isRecording ? 'text-red-500 animate-pulse' : ''}`}>
                                {isRecording ? <StopIcon /> : <MicIcon />}
                            </button>
                            <textarea
                                ref={textareaRef}
                                placeholder="Ask anything, or describe the file you've attached..."
                                className="flex-1 w-full px-2 pt-2.5 pb-2 bg-transparent focus:outline-none placeholder:text-secondary-text resize-none overflow-y-hidden"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { handleSendMessage(e); } }}
                                rows={1}
                            />
                            <button type="submit" disabled={isLoading || (!input.trim() && !selectedFile)} className="p-3 transition-all duration-200 bg-primary rounded-lg text-background self-end disabled:bg-gray-500 disabled:cursor-not-allowed hover:brightness-110">
                                <SendIcon />
                            </button>
                        </div>
                    </form>
                     {error && <p className="mt-3 text-xs text-center text-red-400">Error: {error}</p>}
                    <p className="mt-3 text-xs text-center text-secondary-text">Care Mate can make mistakes. Consider checking important information.</p>
                </div>
            </main>
        </div>
    );
}

// --- Child Components ---
const WelcomeScreen = ({ onPromptClick }) => ( 
    <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in-up"> 
        <div className="relative mb-4"> 
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-green-400 rounded-lg blur opacity-25"></div>
            <div className="relative"> <BotIcon/> </div>
        </div> 
        <h1 className="text-5xl font-bold text-primary-text"><span className="font-bold">Care</span><span className="font-light">Mate</span>.</h1> 
        <p className="mt-2 text-lg text-secondary-text">Your 24/7 guide through NDIS. How can I help you today?</p> 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 w-full max-w-2xl"> 
            {promptStarters.map(prompt => ( 
                <button key={prompt.title} onClick={() => onPromptClick(prompt.title)} className="text-left bg-[#1A1A1A] p-4 rounded-lg border border-white/10 w-full transition-all duration-300 hover:border-primary/50 hover:bg-white/5 hover:scale-[1.03]"> 
                    <p className="font-semibold text-primary-text">{prompt.title}</p> 
                    <p className="text-sm text-secondary-text">{prompt.subtitle}</p> 
                </button> 
            ))} 
        </div> 
    </div> 
);

const ChatMessage = ({ message }) => { 
    const isUser = message.role === 'user'; 
    return ( 
        <div className={`flex gap-4 items-start animate-fade-in-up ${isUser ? 'justify-end' : ''}`}> 
            {isUser && <div className="mt-1"><UserIcon/></div>}
            {!isUser && <BotIcon />} 
            <div className={`p-4 rounded-xl max-w-2xl whitespace-pre-wrap prose prose-invert prose-p:my-0 prose-li:my-1 ${isUser ? 'bg-black/20 text-primary-text' : 'bg-[#1A1A1A]'}`}> 
                {message.content}
            </div> 
        </div> 
    ); 
};

const SettingsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#1A1A1A] border border-white/10 p-6 text-left align-middle shadow-xl transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold leading-6 text-primary-text flex items-center gap-2">
                        <SettingsIcon /> Settings
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10">
                        <CloseIcon className="h-5 w-5"/>
                    </button>
                </div>
                <div className="mt-6">
                    <p className="text-secondary-text">
                        Settings and customization options will be available here in a future update.
                    </p>
                    {/* Example Setting */}
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
                        <span className="text-primary-text">Dark Mode</span>
                        <div className="w-12 h-6 flex items-center bg-gray-600 rounded-full p-1 cursor-pointer">
                            <div className="bg-white w-4 h-4 rounded-full shadow-md transform"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
