'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import TextareaAutosize from 'react-textarea-autosize';
import Markdown from 'markdown-to-jsx';

// --- ICONS ---
const NewChatIcon = () => <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>;
const UserIcon = () => <svg className="h-5 w-5 text-secondary-text flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const GoalIcon = () => <svg className="h-5 w-5 text-secondary-text flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const SettingsIcon = () => <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const PaperclipIcon = () => <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" /></svg>;
const MicIcon = () => <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" /><path d="M5 10a7 7 0 0 0 14 0" /><path d="M8 21l8 0" /><path d="M12 17l0 4" /></svg>;
const SendIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>;
const BotIcon = () => <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center flex-shrink-0"><SparkleIcon/></div>;
const SparkleIcon = () => <svg className="h-5 w-5" strokeWidth="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke="currentColor" strokeLinejoin="round"/><path d="M5 2L6 5L9 6L6 7L5 10L4 7L1 6L4 5L5 2Z" stroke="currentColor" strokeLinejoin="round"/><path d="M19 2L20 5L23 6L20 7L19 10L18 7L15 6L18 5L19 2Z" stroke="currentColor" strokeLinejoin="round"/></svg>;

const chatHistory = [ { id: 1, title: "Understanding my plan budget..." } ];
const promptStarters = [ { title: "Explain my budget", subtitle: "in simple terms" }, { title: "Help me draft a letter", subtitle: "to my doctor or provider" }, { title: "What are common supports for...", subtitle: "autism, cerebral palsy, etc." }, { title: "How do I prepare?", subtitle: "for a plan review meeting" } ];
const commonRequests = [ { title: "Review My Plan", template: "I need help preparing for my upcoming NDIS plan review." }, { title: "Generate Incident Report", template: "I need to generate an incident report." }, ];

const PromptBubble = ({ title, subtitle, onClick }) => ( <button onClick={onClick} className="text-left bg-[#1A1A1A] p-4 rounded-lg border border-white/10 w-full transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:scale-105"> <p className="font-semibold text-primary-text">{title}</p> <p className="text-sm text-secondary-text">{subtitle}</p> </button> );

export default function ChatPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'Participant';
  const goal = searchParams.get('goal') || 'Draft a progress letter';
  const prompt = searchParams.get('prompt');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (prompt) {
      setInputValue(prompt);
    }
  }, [prompt]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput === '') return;

    const userMessage = { role: 'user', content: trimmedInput };
    const newMessages = [...messages, userMessage];
    // Add placeholder assistant message for streaming updates
    setMessages([...newMessages, { role: 'assistant', content: '' }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, role })
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';
      if (reader) {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.replace('data: ', ''));
                if (data.content) {
                  assistantText += data.content;
                  setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'assistant', content: assistantText };
                    return updated;
                  });
                }
              } catch (e) {
                console.error('Failed to parse SSE chunk', e);
              }
            }
          }
        }
      } else {
        const data = await response.json();
        assistantText = data.content || '';
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: assistantText };
          return updated;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePromptClick = (text) => { setInputValue(text); };

  return (
    <div className="flex h-screen bg-background text-primary-text font-sans">
      <aside className="w-80 bg-[#111111] p-4 flex flex-col border-r border-white/10">
        <button className="flex items-center justify-center gap-2 w-full p-3 rounded-full bg-primary-text text-background font-semibold hover:bg-white/80 transition mb-6">
            <NewChatIcon />
            New Chat
        </button>
        <div className="p-4 rounded-lg bg-black/20 border border-white/10">
            <div className="flex items-start gap-2"> <UserIcon /> <p className="text-sm"><span className="text-secondary-text">You're a:</span><br/><span className="font-bold text-primary-text">{role}</span></p> </div>
            <div className="flex items-start gap-2 mt-3"> <GoalIcon /> <p className="text-sm"><span className="text-secondary-text">Your Goal:</span><br/><span className="font-bold text-primary-text">{goal}</span></p> </div>
        </div>
        <div className="flex-1 mt-6 overflow-y-auto">
            <h2 className="px-2 mb-2 text-sm font-semibold text-secondary-text">Recent</h2>
            <nav className="flex flex-col mb-6 space-y-1"> {chatHistory.map(chat => ( <a key={chat.id} href="#" className="p-2 text-sm truncate rounded-lg text-secondary-text hover:bg-white/5 hover:text-primary-text transition-colors">{chat.title}</a> ))} </nav>
            <h2 className="px-2 mb-2 text-sm font-semibold text-secondary-text">Common Requests</h2>
            <nav className="flex flex-col space-y-1"> {commonRequests.map(request => ( <button key={request.title} onClick={() => handlePromptClick(request.template)} className="p-2 text-sm text-left truncate rounded-lg text-secondary-text hover:bg-white/5 hover:text-primary-text transition-colors">{request.title}</button>))} </nav>
        </div>
        <div className="pt-4 border-t border-white/10">
            <button className="w-full flex items-center gap-2 p-2 text-sm rounded-lg text-secondary-text hover:bg-white/5 hover:text-primary-text transition-colors"> <SettingsIcon /> Settings </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col pt-16">
        <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="max-w-2xl text-center">
                <div className="flex justify-center items-center gap-3"> <span className="relative flex h-3 w-3"> <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span> <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span> </span> <h1 className="text-5xl font-bold text-primary-text"> Hi, I'm <span className="font-bold">Care</span><span className="font-light">Mate</span>. </h1> </div>
                <p className="mt-2 text-lg text-secondary-text">Your 24/7 guide through NDIS. How can I help you today?</p>
                <div className="grid grid-cols-1 gap-4 mt-12 md:grid-cols-2"> {promptStarters.map(prompt => ( <PromptBubble key={prompt.title} title={prompt.title} subtitle={prompt.subtitle} onClick={() => handlePromptClick(prompt.title)} /> ))} </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 max-w-4xl mx-auto w-full">
              {messages.map((msg, index) => (
                <div key={index} className={`flex gap-4 items-start ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && <BotIcon />}
                  <div className={`p-4 rounded-2xl max-w-2xl prose prose-invert prose-p:my-2 prose-li:my-1 prose-pre:bg-black/20 ${msg.role === 'user' ? 'bg-primary-text text-background font-bold' : 'bg-[#1A1A1A]'}`}>
                    <Markdown>{msg.content}</Markdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 items-start">
                  <BotIcon />
                  <div className="p-4 rounded-lg bg-[#1A1A1A] flex items-center gap-2">
                    <span className="h-2 w-2 bg-secondary-text rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-secondary-text rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-secondary-text rounded-full animate-pulse"></span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 w-full max-w-4xl mx-auto">
            <div className="group flex items-end gap-2 border-2 border-secondary-text rounded-2xl p-2 transition-all duration-300 focus-within:border-primary-text hover:border-primary-text/70">
                <button className="p-2 transition-colors text-secondary-text hover:text-primary-text"><PaperclipIcon /></button>
                <button className="p-2 transition-colors text-secondary-text hover:text-primary-text"><MicIcon /></button>
                <TextareaAutosize placeholder="Ask anything..." className="flex-1 w-full px-2 py-2 bg-transparent focus:outline-none placeholder:text-secondary-text resize-none" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} maxRows={5}/>
                <button onClick={handleSendMessage} disabled={isLoading} className="p-3 transition-all duration-300 bg-primary-text rounded-full text-background self-end group-hover:bg-primary group-hover:text-background group-focus-within:bg-primary group-focus-within:bg-background disabled:bg-gray-500"> <SendIcon className="h-5 w-5"/> </button>
            </div>
             <p className="mt-3 text-xs text-center text-secondary-text">Care Mate can make mistakes. Consider checking important information.</p>
        </div>
      </main>
    </div>
  );
}