import React, { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import play from "../assets/sounds/play.m4a";
import logo from "../assets/logo.png";

const User = ({ setUser }) => {
  let [letsPlay, { pause }] = useSound(play);
  const [isPlaying, setIsPlaying] = useState(true);
  const inp = useRef();
  if (isPlaying) {
    letsPlay();
  }
  const handleClick = () => {
    inp.current.value && setUser(inp.current.value);
    setIsPlaying(false);
    pause();
    
  };
  return (
    <div className="users">
      <div className="user w-[350px]">
        <h1 className="mb-4 mx-auto w-full text-center tracking-wider text-[40px] marhey-font">
          مين اللي فالح؟؟
        </h1>
        <img src={logo} alt="logo" className="mb-6" />
        <input
          ref={inp}
          type="text"
          placeholder="Enter your name"
          className="w-full h-[40px] rounded-xl text-black text-center text-[18px]"
        />
        <button
          className="w-full h-[40px] my-5 rounded-xl"
          onClick={handleClick}
        >
          Start
        </button>
      </div>
      <footer className="footer">
        <p className="footer-text text-white">
          Developed by &nbsp;
          <a href="https://www.linkedin.com/in/hossam-eltahan-24528b253/">
            Hossam Eltahan
          </a>
        </p>
      </footer>
    </div>
  );
};

export default User;