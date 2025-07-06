"use client";

import { useState } from "react";
import QuoteCard from "@/components/ui/QuoteCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Quote = {
  text: string;
  author: string;
};

export default function QuoteGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState("");

 

  const handleGenerate = async () => {
    try {
      const res = await fetch("/quotes.json");
      const data = await res.json();

      const topicQuotes = data[topic.toLowerCase()];
      if (!topicQuotes || topicQuotes.length === 0) {
        setQuotes([]);
        setError("No quotes found for this topic.");
        return;
      }

      const shuffled = [...topicQuotes].sort(() => 0.5 - Math.random());
      setQuotes(shuffled.slice(0, 3));
      setError("");
    } catch (e) {
      console.log(e);
      setError("Failed to load quotes. ");
    }
  };

  return (
    <div className="p-3 space-y-6">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
        {/* Input with datalist */}
        <div className="flex flex-col w-[300px]">
          <Input
            list="topics"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter or choose topic"
            className="border-gray-300"
          />
          
        </div>

        <Button
          onClick={handleGenerate}
          className="bg-purple-700 hover:bg-purple-500 transition-colors"
        >
          Generate
        </Button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex flex-col items-center gap-5 my-4 h-[400px] overflow-y-auto pr-2">
        {quotes.map((quote, idx) => (
          <QuoteCard key={idx} quote={quote} sourcePage="generator" />
        ))}
      </div>
    </div>
  );
}
