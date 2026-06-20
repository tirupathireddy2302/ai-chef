function SearchHistory() {

  const searches =
    JSON.parse(
      localStorage.getItem(
        "recentSearches"
      )
    ) || [];

  if(searches.length===0)
    return null;

  return (
    <div className="search-history">

      <h4>
        Recent Searches
      </h4>

      {searches.map(
        (item,index)=>(
          <span key={index}>
            {item}
          </span>
        )
      )}

    </div>
  );
}

export default SearchHistory;