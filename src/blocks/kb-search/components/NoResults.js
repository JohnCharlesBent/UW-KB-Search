const NoResults = ({query}) => {
    return ( 
        <>
            <div class="no-results-message">
                <h3>No articles were found for the search term: <strong>{query}</strong></h3>
            </div>
        </>
    )
}

export default NoResults;