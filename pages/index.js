import Head from "next/head";
import React from "react";
import SpaceCard from "../components/SpaceCard";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const topics = [
  "Business",
  "NFT",
  "Finance",
  "Music",
  "Sports",
  "Technology",
  "Gaming",
  "World",
  "Entertainment",
  "Art",
  "Culture",
  "Career",
  "Home",
  "Family",
  "Song",
  "Wrestling",
  "WWE",
  "AEW",
  "Crypto",
  "Web3",
  "Blockchain",
  "Ethereum",
  "Bitcoin",
  "Chill",
  "Black",
  "Covid-19",
  "Coronavirus",
];

export default function Home() {
  const [query, setQuery] = React.useState("");
  const [state, setState] = React.useState("live");
  const [spaces, setSpaces] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [toggle, setToggle] = React.useState(false);

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if(inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  React.useEffect(() => {
    const handleEnterKeyPress = (e) => {
      if (e.key === 'Enter') {
        setQuery(e.target.value);
        setToggle(!toggle);
      }
    }

    if(inputRef && inputRef.current) {
      inputRef.current.addEventListener("keyup", handleEnterKeyPress);
    }

    setLoading(true);

    axios
      .post("/api/spaces", {
        query,
        state,
      })
      .then((res) => {
        setSpaces(res.data.data);
        setUsers(res.data.includes?.users);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

      return () => {
        inputRef.current.removeEventListener("keyup", handleEnterKeyPress);
      }
  }, [toggle]);

  const onSearch = () => {
    setToggle(!toggle);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-2 overflow-hidden">
      <div className="section-background"></div>
      <Head>
        <title>Find Twitter Spaces</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page-root flex flex-col max-w-screen-xl h-full">
        <div className="flex w-full items-center mb-16 flex-wrap">
          <div className="flex flex-col py-2 px-2 md:py-12 md:px-10 z-10 font-bold text-white w-full">
            {/* <div className="flex flex-row items-center">
              <h1 className="heading">Find</h1>
            </div> */}
            {/* <div className="flex flex-row items-center nameGradient">
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-white mr-8 twitterLogo"
                size="7x"
              />
              <div className="heading">Spaces</div>
            </div> */}
            <div className="w-full mr-auto relative">
              <input
                placeholder="search by username or title"
                className="mt-10 rounded-3xl p-4 w-full text-lg md:text-xl pr-14 md:pr-28"
                style={{
                  backgroundColor: "#303134",
                }}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                ref={inputRef}
              />
              <div className="absolute right-0 top-10 bottom-0 rounded-2xl md:rounded-3xl w-14 md:w-24 buttonGradient cursor-pointer flex justify-center items-center"
                onClick={onSearch}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className=" text-gray-300"
                  size="lg"
                />
              </div>
            </div>
            <div className="w-full flex flex-row items-center mt-6 overflow-scroll">
              {topics.map((topic) => (
                <div
                  className={`hide-scrollbar border-gray-400 rounded-2xl p-2 m-2 border-2 cursor-pointer whitespace-nowrap text-sm ${topic === query ? "selectedPill" : "hover:bg-gray-700 "}`}
                  key={topic}
                  onClick={() => {
                    setQuery(topic);
                    setToggle(!toggle);
                  }}
                >
                  {topic}
                </div>
              ))}
            </div>

            {loading ? (
              <div className="text-white text-2xl pt-24 w-full text-center">Loading</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 w-full pt-16">
                {spaces?.map((space, index) => (
                  <SpaceCard key={index} space={space} users={users}/>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
