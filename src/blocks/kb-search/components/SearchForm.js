import KbSearchType from "./KbSearchType";
import Pagination from "./Pagination";

const SearchForm = ({ query, type, handleSubmit, handleChange, handleSelectType, handleMore, handleClearSearch, page, currentPage, totalPages }) => {

    return (
        <>
            <div className="kb-search-wrapper">
            { query ? <h4>Searching For: {query} in {type}</h4> : <h4>Select a search type and enter a search term to begin...</h4> }
                <KbSearchType 
                    type={type}
                    handleSelectType={handleSelectType}
                />
                <form onSubmit={handleSubmit}
                    className="kb-search">
                    <input
                        id="search-term"
                        type="text"
                        onChange={handleChange}
                        value={query}
                        className="form-control"
                        name="kb-search-query"
                        placeholder={`Search ${type}`}
                    />
                    <input
                        type="submit"
                        name="_submit-kb-search"
                        value="Search"
                        className="button button-large button-primary"
                    />
                </form>
                { page ? 
                <Pagination 
                    handleMore={handleMore}
                    handleClearSearch={handleClearSearch}
                    currentPage={currentPage}
                    totalPages={totalPages} 
                /> 
                : <></> }
            </div>
        </>
    );
}

export default SearchForm;