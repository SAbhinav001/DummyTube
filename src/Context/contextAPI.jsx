import { createContext, useEffect, useState } from "react";
import { FetchFromApi } from "../Utils/Api";

export const Context = createContext();

export const AppContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchresults] = useState(false);
  const [selectCategories, setSelectCategories] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);
  
  // useEffect(() => {
  //   fetchSelectedQueryResult(selectCategories);
  // }, [selectCategories]);

  // const fetchSelectedQueryResult = (query) => {
  //   setLoading(true);
  //   FetchFromApi(`search/?=${query}`).then(({contents}) => {
  //       console.log(contents)
  //     //setSearchresults(res.data);
  //     setLoading(false);
  //   });
   
  // };

  return (
    <Context.Provider
      value={{
        loading,
        searchResults,
        selectCategories,
        mobileMenu,
        setMobileMenu,
        setSearchresults,
        setSelectCategories,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
