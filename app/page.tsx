'use client';

import InputForms from '@/components/InputForms';
import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat();

  const [formData, setFormData] = useState({
    Name: '',
    Location: '',
    Description: '',
    AdditionalInfo: '',
  });

  console.log(formData);

  return (
    <div className='flex flex-col w-full max-w-md py-24 mx-auto stretch'>
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className='whitespace-pre-wrap'>
              {m.role === 'user' ? 'User: ' : 'AI: '}
              {m.content}
            </div>
          ))
        : null}

      <InputForms onFormSubmit={setFormData} />

      <form onSubmit={handleSubmit}>
        <input
          className='fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl'
          value={input}
          placeholder='Say something...'
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
