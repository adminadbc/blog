"use client"

import algoliasearch from "algoliasearch";
import Link from "next/link";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5"; 

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const userId = process.env.NEXT_PUBLIC_USER_ID;
// Connect and authenticate with your Algolia app
const client = algoliasearch(API_KEY!, userId!);

let hiStore: string = ""

let historyData : string | null = ""
if (typeof window !== 'undefined') {
    // Perform localStorage action
    historyData = localStorage.getItem("recent_searches");
  }

if(historyData === null){
  localStorage.setItem("recent_searches", hiStore)
}

let resultList: any[];

function SearchLayer() {
  const [pop, setPop] = useState(false);
  const [history, setHistory ] = useState(true)
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState<any[]>([]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let data = e.target.value;
    if (data.length > 0) {
      let latest = historyData?.split(" ")
      if(latest?.length! > 3){
        latest?.unshift(data)
      latest?.pop()
      }
      localStorage.setItem("recent_searches", latest?.toString()!)
      console.log(localStorage.getItem("recent_searches"))
      const index = client.initIndex("test");
      index.search(data).then(({ hits }) => {
        hits.length > 0 ? setShow(true) : null;
        setInputValue(data);
        setHistory(false)
        resultList = hits;
      });
    }else if(data == "" || data.length == 0) {
      resultList = [];
    }
  };
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  useEffect(() => {
    setList(resultList);
  }, [inputValue]);
  return (
    <div>
         {pop ? (
       <div className="absolute top-0 w-screen h-screen left-0 overflow-clip">
         <div  
          className="absolute top-0 w-screen overflow-x-hidden
       h-screen z-[100]  bg-white left-0 backdrop-blur-md bg-opacity-20
        bg-blur-sm" 
        onClick={()=>{setPop(false)}}
        >
        </div>
        <div className="bg-white rounded-lg py-4 drop-shadow-lg z-[9999]
     md:w-[70vw] mt-20 flex justify-center flex-col align-middle h-fit relative mx-auto">
      
      <div    className=" py-3 px-6 gap-1 flex border-b border-black text-center relative" >
        <CiSearch className="mt-2 font-bold"  />
      <input
            type="text"
            name="name"
            className="outline-none w-full pl-2"
            onChange={(e) => {
              handleSearch(e);
            }}
            autoFocus={true}
            placeholder="search reasources..."
            autoComplete="off"
          />
          <div onClick={()=>{setPop(false); console.log("clickedddd")}} className="p-2 rounded-lg border border-gray-400 cursor-pointer text-sm ml-auto">ESC</div>
        </div>
          <div className="relative flex flex-col ">
            {history && <div className="flex flex-col gap-2">
              <div className="font-semibold text-xl px-7 py-5 border-b border-gray-300">Recents </div>
              <ul className="flex flex-col text-sm">{historyData?.split(" ").map((data, idc)=>
                data.length > 2 && <li key={idc} className="px-7 border-b border-gray-300 text-gray-500 py-5">{data}
              </li>)}
              </ul>
              </div>}
         {!history &&    resultList?.map((listData, idx) => (
              <Link
                target="_blank"
                href={listData.link.replace("abcfoundationconnect.hashnode.dev", "abc-kit.vercel.app")}
                key={idx}
                className="border-b border-gray-400 flex px-5"
              >    
              <Image
              src={listData.image}
              alt={listData.title}
              width={100}
              height={100}
              className="h-full"
            />
                <div className="py-2 px-2 text-left w-full flex flex-col justify-center align-middle">
                  <div className="font-semibold text-base">
                    {listData.title}
                  </div>
{/* 
                  <p className="text-xs md:text-sm my-1">
                    {truncateText(listData.article, 100)}
                  </p> */}
                </div>
            
              </Link>
            ))}
          </div>
      </div>
        </div>
      ) : (
        <div className="border rounded-md w-32 mt-6 border-black mb-2 lg:mt-0 lg:w-28  flex">
          <input
            onClick={() => setPop(true)}
            placeholder="search..."
            className="h-8 ml-5 outline-none w-16
           text-black  text-[0.75rem]"
          />
          <CiSearch className="mt-2" size={16} />
        </div>
      )}
    </div>
  );
}

export default SearchLayer;


// <IoCloseOutline
// onClick={() => setPop(false)}
// color="black"
// size={32}
// className="absolute top-10 right-10 bg-red-300 hover:cursor-pointer  rounded-full"
// />