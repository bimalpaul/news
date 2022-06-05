import { createContext, useState } from "react";

const NewsContext = createContext();

const NewsContextProvider = NewsContext.Provider;
const NewsContextConsumer = NewsContext.Consumer;

export default NewsContext;

export {
  NewsContextConsumer,
  NewsContextProvider
};