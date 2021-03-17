import React, { useCallback, useEffect, useRef, useState } from "react";
import { RowDiv, SearchBarStyle, SearchButton, SelectStyle } from "../Styles";
import SearchIcon from "../SvgIcons/SearchIcon";
import ReactTags, { ReactTagsProps, Tag } from "react-tag-autocomplete";
import "./SearchBar.css";
import { FormEvent } from "react";
import { useHistory, useLocation } from "react-router";
interface Props {
  marginBottom: number;
}
const SearchBar: React.FC<Props> = ({ marginBottom }) => {
  const history = useHistory();
  const location = useLocation();

  const reactTags = useRef<any>();
  const [select, setSelect] = useState<string>("places");
  const [tagstoAPI, setTagstoAPI] = useState<Tag[]>([]);
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
    setTagstoAPI([]);
  };
  const onDelete = (index: any) => {
    const arrCopy = [...tagstoAPI];
    arrCopy.splice(index, 1);
    setTagstoAPI(arrCopy);
  };
  const onAddition = (tag: Tag) => {
    setTagstoAPI([...tagstoAPI, tag]);
  };

  const RedirectToSearchPage = (e: FormEvent) => {
    e.preventDefault();
    // Gets the array items , makes them in to string array and after that transofrms to whole string i pass it to the API fetch(where it gets encoded)
    const copyArr = [...tagstoAPI];
    const arrIds = copyArr.map((el) => el.id).join(",");

    history.push({
      pathname: "/search",
      state: {
        tags: arrIds,
        input: tagstoAPI,
        type: select === "places" ? "allplaces" : select.toLowerCase(),
      },
    });
  };

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(
      `${
        process.env.REACT_APP_SERVER_URL
      }/api/Routs/getTags/${select?.toLowerCase()}`,
      {
        method: "GET",
        signal: abortCont.signal,
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        // Response gives Tags then i make a loop because key values of json are hard to acces, and i create new object with name:,id: and push it to array
        //after that just update the state.
        //https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object
        const tags = [];
        for (let key in res.tags) {
          if (res.tags.hasOwnProperty(key)) {
            let tag = { name: res.tags[key], id: key };
            tags.push(tag);
          }
        }
        setSuggestions(tags);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("err ABORT");
        } else {
          console.log(err);
        }
      });
    return () => {
      abortCont.abort();
    };
  }, [select]);
  return (
    <RowDiv marginBottom={marginBottom}>
      <form style={{ display: "flex" }} onSubmit={RedirectToSearchPage}>
        <SearchButton type="submit" disabled={tagstoAPI.length ? false : true}>
          <SearchIcon />
          Search
        </SearchButton>

        <ReactTags
          placeholderText={"Add new search tag"}
          ref={reactTags}
          tags={tagstoAPI}
          suggestions={suggestions}
          onDelete={(index) => onDelete(index)}
          onAddition={(tag) => onAddition(tag)}
        />
        <SelectStyle onChange={onChangeSelect}>
          <option>Places</option>
          <option>Events</option>
          <option>Activities</option>
        </SelectStyle>
      </form>
    </RowDiv>
  );
};

export default SearchBar;
