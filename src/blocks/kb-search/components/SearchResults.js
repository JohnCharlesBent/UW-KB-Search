import parse from 'html-react-parser';
import CheckIcon from '@mui/icons-material/Check';

const SearchResults = ({ results, handleArticleSelect }) => {
        const kbArticles = results.map( (article, idx )  => {
            const updated = new Date(article.updated).toDateString();
            const created = new Date(article.created).toDateString();
            const title = article.title.replace(/(<([^>]+)>)/gi, "");
            return ( 
                <li className="search-result" key={idx}>
                    <h3>{article.title}</h3>
                    <div className="article-data">
                        <div>
                            <p className="summary">{parse(article.summary)}</p>
                            <hr></hr>
                            <p className="date-created"><strong>Date Created: </strong>{created}</p>
                            <p className="last-updated"><strong>Last Updated: </strong>{updated}</p>
                            <p><strong>KB URL: </strong><a href={article.pageUrl} target="_blank">{article.pageUrl}</a></p>
                            <p
                            className="views">
                                <strong>Article Views: </strong>{article.views}
                            </p>
                        </div>
                        <div className="button-wrapper">
                            <button 
                            type="button" 
                            onClick={handleArticleSelect} 
                            data-title={article.title}
                            data-summary={article.summary}
                            data-url={article.pageUrl}
                            data-created={created}
                            data-updated={updated}
                            data-keywords={article.keywords}
                            data-views={article.views}

                            className="button button-secondary select-article">Select This Article <CheckIcon /></button>
                        </div>
                    </div>
                </li>
            )
        });
        return (
            <>
            <div className="results-list-wrapper">
                <ul className="results-list">
                    {kbArticles}
                </ul>
            </div>
            </>
        )
}

export default SearchResults;