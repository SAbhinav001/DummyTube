import React, { useContext, useEffect } from "react";
import LeftNav from "./LeftNav";
import { Context } from "../Context/contextAPI";
import VideoCard from "./VideoCard";

const Feed = () => {
  const { loading, searchResults } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  }, []);

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          { !loading && searchResults &&
            searchResults.map((items, index) => {
              if (items.type !== "video") return false;
              return (
                <VideoCard key={index} video={items?.video} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
