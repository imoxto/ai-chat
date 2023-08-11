'use client';

import InputForms from '@/components/InputForms';
import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Chat() {
  const [result, setResult] = useState<string | null>(null);

  const { input, handleSubmit, setInput } = useChat({
    onFinish: (message) => {
      setResult(message.content);
    },
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {result && (
        <div className="fixed top-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl">
          <p className="text-lg font-bold text-center text-gray-800">Result</p>
          <p className="text-center text-gray-800">{result}</p>
        </div>
      )}

      <InputForms
        input={input}
        handleSubmit={handleSubmit}
        setInput={setInput}
      />
    </div>
  );
}
