import React, { createContext, useContext, useState } from 'react';

const ChatSettingsContext = createContext();

export const ChatSettingsProvider = ({ children }) => {
  const [language, setLanguage] = useState('English (Australia)');
  const [tone, setTone] = useState('Simple');

  return (
    <ChatSettingsContext.Provider value={{ language, setLanguage, tone, setTone }}>
      {children}
    </ChatSettingsContext.Provider>
  );
};

export const useChatSettings = () => useContext(ChatSettingsContext);
