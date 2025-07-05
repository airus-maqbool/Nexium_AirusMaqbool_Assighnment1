"use client"

//blue print for quote object
type Quote={
   text: string;
   author: string;
};
// blueprint for Favourites quotes
type FavouritesContextType ={
  //list of favourites quote
  favourites: Quote[];
  //a function that takes quote and returns nothing
  add: (quote: Quote)=> void;    //void means return can be ignored
  remove: (quote: Quote)=> void;
};

//createContext : create a storage box/local storage (context) for sharing data between components without passing props manually
// useContext: grabs data from nearest storage box (above current component)
// useState : re-renders data if changed

import {createContext, useContext, useState} from "react";

//(null) sets default value of context null(used when no provider wraps context)
//creates a context(storage box) that can save data of type favourties context type or can have null

const FavouritesContext = createContext<FavouritesContextType|null>(null);

//{children} destructuring/separating children prop from components prop
//destructing means to extract specific value of array or of object , assighnment of extracted values ot variables.
//... -> rest pattern: const [first, ...rest] = [1, 2, 3, 4]; first-> 1 nand rest will have [2,3,4]  : ... to get remaining elements

//export means this is usable in other files
export const FavouritesProvider = ({children}:{
  //children must be a reactnode, reactnode means any valid component that can be rendered on react component tree

    children: React.ReactNode
})=>{
  //destructuring favourits = [] of quote type, favourits is state (data that will rerender)
   //setFavourtes is setState function that will rerender ui upon data change and will only accept Quote type data
   //Quote[] means list of quotes type , ([]) initial will be null , means no favourties
    const [favourites, setFavourites]=useState<Quote[]>([]);
   //add will get a quote, setFavouties will automatically get the previous favourites in prev by react, and return a new list with prev + new quote, list updated, state changed and ui will be updated 
    const add = (quote: Quote)=> setFavourites((prev) =>[...prev, quote]);  //actually not returning just updating
    //filter returns array of those element that pass the condition provided by callback
    const remove = (quote:Quote)=> setFavourites((prev)=> prev.filter((q)=>q.text !== quote.text));
    return (

      //you are returning favouritesContext as provider and making favourites, add, remove available to all rendered components
      <FavouritesContext.Provider value={{ favourites, add, remove}}>   
      {/* here the  add, remove and favourites are linking to context*/}
        {children}
      </FavouritesContext.Provider>
    );
};


//can use / access storage box of favouriteContext
export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};
