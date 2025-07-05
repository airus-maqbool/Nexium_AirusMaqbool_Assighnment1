"use client";

import { useState } from "react";
import QuoteCard from "@/components/ui/QuoteCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Quote = {
  text: string;
  author: string;
};

const MOCK_QUOTES: Quote[] = [
  { text: "Believe in yourself.", author: "Unknown" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Anonymous" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
];

export default function QuoteGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const handleGenerate = () => {
    setQuotes(MOCK_QUOTES);
  };

  return (
    
    <div className="p-3 space-y-6">
      <div className="space-y-2 flex gap-2 justify-center items-baseline">
        
        <Input
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic"
          className="w-100 border-amber-950"
        />
        <Button onClick={handleGenerate} className="bg-purple-700 hover:bg-purple-500 transition-colors">Generate</Button>
       
      </div>

      <div className="flex flex-col items-center gap-5 my-4 h-[400px] overflow-y-auto pr-2">
        {quotes.map((quote, idx) => (
          <QuoteCard key={idx} quote={quote} sourcePage="generator" />
        ))}
      </div>
    </div>
  );
}
