import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { TbInputSearch } from "react-icons/tb";
import { BiError } from "react-icons/bi";
import { AiFillSound } from "react-icons/ai";
import { ThemeContext } from "./Themeprovider";
import Footer from "./components/Header/Footer";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Meaning from "./components/Meaning";

function App() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [word, setWord] = useState("keyboard");

  const {
    data: result,
    isError,
    isLoading,
    refetch,
    error,
    isSuccess,
    isRefetching,
  } = useQuery({
    queryKey: ["dictionary"],
    queryFn: () =>
      axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`),
    onError: () => setWrongWord(word),
  });

  const data = result?.data;

  console.log(isError);

  const [wrongWord, setWrongWord] = useState("");
  const [audio, setAudio] = useState();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <div className={`container-items`}>
        <Header />

        <div className="divider"></div>
        <form
          className="w-full flex"
          onSubmit={(e) => {
            e.preventDefault();
            refetch();
          }}
        >
          <div className="btn-group w-full">
            <input
              type="text"
              placeholder="Search a word..."
              onChange={(e) => setWord(e.target.value)}
              className="input rounded-r-none input-bordered w-full focus:outline-none"
            />
            <button type="submit" className="btn">
              Search
            </button>
          </div>
        </form>
        {isLoading || isRefetching ? (
          <div className="flex flex-col h-[50vh] gap-5 items-center space-x-2 mt-[5rem]">
            <div aria-label="Loading..." role="status">
              <svg className="h-20 w-20 animate-spin" viewBox="3 3 18 18">
                <path
                  className="fill-gray-200"
                  d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                ></path>
                <path
                  className="fill-gray-800"
                  d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                ></path>
              </svg>
            </div>
          </div>
        ) : isSuccess ? (
          <div>
            <div className="mt-[3rem] flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold mb-4">{data[0]?.word}</h2>
                <h4 className="text-purple-400 text-lg mt-3">
                  {data[0]?.phonetics[2]?.text !== undefined &&
                    data[0]?.phonetics[2].text}
                  {data[0]?.phonetic && data[0]?.phonetic}
                </h4>
              </div>
              <div
                onClick={() => audio.play()}
                className="text-2xl cursor-pointer bg-purple-500/20 text-purple-600 p-5 rounded-full"
              >
                <AiFillSound />
              </div>
            </div>
            {data[0]?.meanings.map((item, index) => {
              return <Meaning item={item} key={index} />;
            })}
          </div>
        ) : isError ? (
          <div className="flex flex-col gap-3 text-center items-center min-h-[65vh] justify-center">
            <div className="text-[6rem]">
              <BiError />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-4xl text-gray-500">
                {error.response.data.title} for "{wrongWord}"
              </p>
              <p className="text-md text-gray-500">{error.message}</p>
              <p className="text-md text-gray-500">{error.resolution}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col text-center items-center min-h-[65vh] justify-center">
            <div className="text-[6rem]">
              <TbInputSearch />
            </div>
            <div className="text-4xl text-gray-500">
              Please Search something...
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
