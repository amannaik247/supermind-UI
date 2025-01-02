'use client';

import { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages([...messages, newMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate a response from the chat API
    setTimeout(() => {
      const botMessage = {
        id: Date.now().toString(),
        role: 'bot',
        content: 'This is a simulated response.',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsTyping(false);
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
        <CardContent className="flex-grow overflow-hidden pt-6">
          <ScrollArea 
            className="h-full pr-4 overflow-y-auto scrollbar-hide"
            ref={scrollAreaRef}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-neutral-900 text-white'
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  <ReactMarkdown 
                    className="prose prose-sm max-w-none"
                    components={{
                      p: ({node, ...props}) => <p className="mb-2" {...props} />,
                      h1: ({node, ...props}) => <h1 className="font-bold mt-4 mb-2" {...props} />,
                      h2: ({node, ...props}) => <h2 className="font-bold mt-4 mb-2" {...props} />,
                      h3: ({node, ...props}) => <h3 className="font-bold mt-4 mb-2" {...props} />,
                      h4: ({node, ...props}) => <h4 className="font-bold mt-4 mb-2" {...props} />,
                      h5: ({node, ...props}) => <h5 className="font-bold mt-4 mb-2" {...props} />,
                      h6: ({node, ...props}) => <h6 className="font-bold mt-4 mb-2" {...props} />,
                      ul: ({node, ...props}) => <ul className="pl-5 mb-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="pl-5 mb-2" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      code: ({node, ...props}) => <code className="bg-gray-100 rounded px-1 py-0.5 text-sm" {...props} />,
                      pre: ({node, ...props}) => <pre className="bg-gray-100 rounded p-2 mb-2 overflow-x-auto" {...props} />,
                      a: ({node, ...props}) => <a className="text-blue-500 underline" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic" {...props} />,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-left">
                <div className="inline-block p-3 rounded-lg bg-gray-200 text-black">
                  <div className="flex items-center">
                    {[...Array(3)].map((_, i) => (
                      <span
                        key={i}
                        className="h-2 w-2 bg-black rounded-full mr-1 animate-bounce"
                        style={{
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about your social media analytics..."
              className="flex-grow"
            />
            <Button type="submit" disabled={isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

