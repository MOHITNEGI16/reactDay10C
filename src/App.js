import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [lang, setLang] = useState("");
  const [tar, setTar] = useState("");
  const [input, setInput] = useState("");
  const [ans, setAnswer] = useState("");
  async function getingData() {
    const urlEncoded = new URLSearchParams();
    urlEncoded.set("source_language", `${lang}`);
    urlEncoded.set("target_language", `${tar}`);
    urlEncoded.set("text", `${input}`);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "1e71e911f5msh4431306193de168p15ab22jsn7f5d2e50273b",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: urlEncoded,
    };

    try {
      const response = await axios.request(options);
      const data = await response.data;
      setAnswer(data.data.translatedText);
      document.getElementById("source").value = "";
      document.getElementById("target").value = "";
      document.getElementById("translateText").value = "";
    } catch (error) {
      console.error(error);
    }
  }

  function handleSourceChange(e) {
    setLang(e.target.value);
  }

  function handleTargetChange(e) {
    setTar(e.target.value);
  }

  function handleClick() {
    if (lang !== "" && tar !== "" && input !== "") {
      getingData();
    } else {
      alert(
        "Please select option for Language or You may not filled the input."
      );
    }
  }
  function handleInput(e) {
    setInput(e.target.value);
  }

  return (
    <>
      <h1>Translator</h1>
      <div id="mainContainer">
        <select id="source" onChange={handleSourceChange}>
          <option value="">Source Language</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean </option>
          <option value="pl">Polish</option>
          <option value="bn">Bengali</option>
          <option value="zh-CN">Chinese</option>
        </select>
        <select id="target" onChange={handleTargetChange}>
          <option value="">Target Language</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean </option>
          <option value="pl">Polish</option>
          <option value="bn">Bengali</option>
          <option value="zh-CN">Chinese</option>
        </select>

        <input
          id="translateText"
          placeholder="Enter Text You Want To Translate"
          onChange={handleInput}
          type="text"
        />

        <button onClick={handleClick}>Translate</button>
        <h1>{ans}</h1>
      </div>
    </>
  );
}

export default App;
