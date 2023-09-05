import { useState } from "react";
import Library from "./components/library";
import Player from "./components/player";

function App() {
  const [isLibraryVisible, setIsLibraryVisible] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center w-screen py-5 lg:py-10">
      <div className="flex justify-between w-full gap-10 px-5 lg:w-1/2">
        <h1 className="text-xl font-bold ">wntn music</h1>
        <button
          className="text-xl "
          onClick={() => setIsLibraryVisible((prevValue) => !prevValue)}
        >
          Library
        </button>
      </div>
      <Library
        isLibraryVisible={isLibraryVisible}
        setIsLibraryVisible={setIsLibraryVisible}
      />
      <Player />
    </div>
  );
}

export default App;
