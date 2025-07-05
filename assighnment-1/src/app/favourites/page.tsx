"use client";

import QuoteCard from "@/components/ui/QuoteCard";
import { useFavourites } from "@/context/favouritesContext";

export default function FavouritesPage() {
  const { favourites } = useFavourites();

  return (
    <div className="p-6 space-y-6 flex justify-center flex-col items-center">
      <h2 className="text-2xl font-semibold">Your Favourite Quotes</h2>

      {favourites.length === 0 ? (
        <p className="text-gray-500">No favourites yet. Go add some!</p>
      ) : (
        <div className="flex flex-col items-center gap-5 my-6 w-full h-[400px] overflow-y-auto pr-2">
          {favourites.map((quote, idx) => (
            <QuoteCard key={idx} quote={quote} sourcePage="favourites" />
          ))}
        </div>
      )}
    </div>
  );
}
