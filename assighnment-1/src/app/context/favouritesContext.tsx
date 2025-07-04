"use client"

//createContext : create a storage box/local storage (context) for sharing data between componens without passing props manually
// useContext: grabs data from nearest storage box (above current component)
// useState : rerenders data if changed
type Quote={
   text: string;
   author: string;
};
type FavouritesContextType ={
  favourites: Quote[];
  add: (quote: Quote)=> void;
  remove: (quote: Quote)=> void;
};

import {createContext, useContext, useState} from "react";

//<any> typescript allows any value to be stored in cotext/storage box
//(null) sets default value of context null(used when no provided wraps context)
const FavouritesContext = createContext<FavouritesContextType|null>(null);

export const FavouritesProvider = ({children}:{
    children: React.ReactNode
})=>{
    const [favourites, setFavourites]=useState<Quote[]>([]);
    const add = (quote: Quote)=> setFavourites((prev) =>[...prev, quote]);
    const remove = (quote:Quote)=> setFavourites((prev)=> prev.filter((q)=>q.text !== quote.text));
    return (
      <FavouritesContext.Provider value={{ favourites, add, remove}}>
        {children}
      </FavouritesContext.Provider>
    );
};

export const useFavourites =()=> useContext(FavouritesContext);