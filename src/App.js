import "./App.css";
import { React, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";

function App() {
  const [shortenedLink, setShortenedLink] = useState("");
  const [userInput, setUserInput] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchData = async () => {
    setCopied(false);
    try {
      const response = await axios(
        `https://api.shrtco.de/v2/shorten?url=${userInput}`
      );
      setShortenedLink(() => response.data.result.full_short_link);
    } catch (e) {
      alert("Some error occured. Please try again or with a different link");
      console.log(e);
    }
  };
  return (
    <div className="container h-screen flex justify-center items-center">
      <div className=" text-center">
        <input
          className="outline-none border-2 border-blue-800 rounded-md backdrop-blur-xl bg-white/20 shadow-md px-3 py-3"
          type="text"
          placeholder="Shorten your URL"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
        <button
          className=" bg-blue-800 text-white px-8 py-3 ml-4 rounded-md"
          onClick={() => {
            fetchData();
          }}
        >
          Abra Ca Dabra
        </button>
        <div className=" mt-5">
          {shortenedLink ? (
            <CopyToClipboard
              text={shortenedLink}
              onCopy={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 10000);
                setTimeout(() => setShortenedLink(""), 10000);
              }}
            >
              <button
                className={`border-2 border-blue-800 text-blue-800 font-small px-5 py-2 ml-4 rounded-md`}
                style={
                  copied ? { backgroundColor: "blue", color: "white" } : {}
                }
              >
                {copied ? "Copied" : "Copy URL to Clipboard"}
              </button>
            </CopyToClipboard>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
