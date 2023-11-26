import { AppContext } from "./context/contextApi";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./Components/Feed";
import Header from "./Components/Header";
import LeftNav from "./Components/LeftNav";
import LeftNavMenuItem from "./Components/LeftNavMenuItem";
import SearchResult from "./Components/SearchResult";
import SearchResultVideoCard from "./Components/SearchResultVideoCard";
import SuggestionVideoCard from "./Components/SuggestionVideoCard";
import VideoDetails from "./Components/VideoDetails";
import Xyz from "./Components/X";

const App = () => {
  return (
    <AppContext>
      <BrowserRouter>
        <div className=" flex flex-col h-full">
          <Header />
          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path="/search/:searchQuery" element={<SearchResult />} />
            <Route path="/video/:id" element={<VideoDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext>
  );
};

export default App;
