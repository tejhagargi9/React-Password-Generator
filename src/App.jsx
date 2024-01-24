import React, { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");

  //use ref hook
  const passwordRef = useRef(null);

  //Password Generator Method
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()[]{}?/-+_";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numberAllowed, charAllowed, setpassword]);

  const copyPasswordToClip = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    toast.success("Text Copied", {
      position: "top-right",
    });
  }, [password]);

  //Used to call after the page loads and optimizes with dependencies;
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="text-white w-[40%] mx-auto rounded-lg p-[2rem] my-8 text-orange-500 bg-slate-800 text-center">
        <ToastContainer />
        <h2 className="text-[1.6vw]">Password Generator</h2>
        <div className="flex shadow rounded-lg overflow-hidden m-0 bg-blue-800">
          <input
            type="text"
            value={password}
            className="outline-none w-[90%] py-1 px-3 rounded-lg text-black"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClip} className="w-3 ml-2 ">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 mt-4">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1 relative left-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={(e) => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={(e) => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
