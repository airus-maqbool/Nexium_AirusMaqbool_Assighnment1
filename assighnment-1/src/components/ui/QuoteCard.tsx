"use client";

import { useFavourites } from "@/context/favouritesContext";
import { Clipboard, ClipboardCheck, Heart } from "lucide-react";
import { useState } from "react";

type Quote = {
  text: string;
  author: string;
};

type QuoteCardProps = {
  quote: Quote;
  sourcePage: "generator" | "favourites"; // determines icon behavior
};

export default function QuoteCard({ quote, sourcePage }: QuoteCardProps) {
  const { favourites, add, remove } = useFavourites();
  const [copied, setCopied] = useState(false);

  const isFavourite = favourites.some((prev: Quote) => prev.text === quote.text);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleHeartClick = () => {
    if (isFavourite) {
      remove(quote);
    } else {
      add(quote);
    }
  };

  const heartColor =
    sourcePage === "favourites" || isFavourite ? "text-red-600" : "text-gray-400";

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 w-full max-w-xl space-y-4 transition duration-300 hover:shadow-lg">
      <p className="text-lg font-medium text-gray-800 italic leading-relaxed">
        “{quote.text}”
      </p>
      <p className="text-sm text-purple-600 font-semibold text-right">
        — {quote.author}
      </p>

      <div className="flex justify-end gap-4 pt-2">
        {/* Copy to clipboard */}
        <button onClick={handleCopy} title="Copy to clipboard">
          {copied ? (
            <ClipboardCheck className="text-green-600" />
          ) : (
            <Clipboard className="text-gray-500 hover:text-green-600" />
          )}
        </button>

        {/* Add/remove favourite */}
        <button
          onClick={handleHeartClick}
          title={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart
            className={`${heartColor} hover:scale-110 transition-transform`}
          />
        </button>
      </div>
    </div>
  );
}
