import React, { useState } from "react";
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    __experimentalNumberControl as NumberControl,
    Spinner,
    DropdownMenu,
    MenuGroup,
    MenuItem,
    Toolbar,
    ToolbarItem,
    ToolbarGroup,
    Button
} from '@wordpress/components';
import { edit, replace, trash } from '@wordpress/icons';
// Custom Block Inspector Components
import Sort from './components/settings/Sort.js';
import Mode from './components/settings/Mode.js';
import Limit from "./components/settings/Limit.js";
import Exact from "./components/settings/Exact.js";
// Search Form Components
import SearchForm from "./components/SearchForm.js";
import SearchResults from "./components/SearchResults.js";
import NoResults from "./components/NoResults.js";
// KB Article Components
import SelectedArticle from "./components/SelectedArticle.js";
import * as kbSearch from "./components/helpers/KbSearch.js";
import { __ } from '@wordpress/i18n';
import block from './block.json';
import icon from './icon.js';
import './index.scss';


registerBlockType(block.name, {
    icon: icon.primary,
    edit({ attributes, setAttributes }) {
        // Attributes 
        const { articleId, articleUrl, articleTitle, summary, additionalContext, lastUpdated, created, keywords, views, limit, exact, mode, sort } = attributes;

        // State
        const [query, setQuery] = useState("");
        const [results, setResults] = useState([]);
        const [article, setArticle] = useState({});
        const [noResults, setNoResults] = useState(false);
        const [searchType, setSearchType] = useState('Articles');
        const [page, setPage] = useState(null);
        const [currentPage, setCurrentPage] = useState(1);
        const [totalPages, setTotalPages] = useState("");
        const [spinner, setSpinner] = useState(false);

        // Block Props
        const blockProps = useBlockProps({
            className: 'selected-kb-article-editor',
            articleId: articleId,
            articleUrl: articleUrl,
            articleTitle: articleTitle,
            summary: summary,
            additionalContext: additionalContext,
            lastUpdated: lastUpdated,
            created: created,
            keywords: keywords,
            views: views,
            limit: limit,
            exact: exact,
            mode: mode,
            sort: sort,
        });

        // Handlers
        const handleChange = (e) => {
            setQuery(e.target.value);
            setResults([]);
            setNoResults(false);
            setPage(null);
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            setResults([]);
            setSpinner(true);
            setNoResults(false);
            const term = e.target.querySelector('input#search-term').value;
            try {
                kbSearch.searchKb(term, page, limit, searchType, exact, mode, sort)
                    .then((data) => {
                        console.log(data);
                        setTimeout(() => {
                            setSpinner(false);
                            if (data._embedded.article.length > 0) {
                                setResults(data._embedded.article);
                                setPage(data._links.next);
                                setCurrentPage(data.page);
                                setTotalPages(data.page_count);
                            } else {
                                setNoResults(true);
                            }

                        }, 2000)
                    })
            } catch (err) {
                console.log(err);
            }
        }

        const handleSelectType = (e) => {
            setSearchType(e);
        }

        const handleArticleSelect = (e) => {
            setSpinner(true);
            setResults([]);
            setArticle({
                title: e.target.dataset.title,
                summary: e.target.dataset.summary,
                url: e.target.dataset.url,
                created: e.target.dataset.created,
                updated: e.target.dataset.updated,
                keywords: e.target.dataset.keywords,
                views: e.target.dataset.views,
            });
            setAttributes({
                articleId: e.target.dataset.id,
                articleUrl: e.target.dataset.url,
                articleTitle: e.target.dataset.title,
                summary: e.target.dataset.summary,
                created: e.target.dataset.created,
                lastUpdated: e.target.dataset.updated,
                keywords: e.target.dataset.keywords,
                views: e.target.dataset.views
            });

            setTimeout(() => {
                setSpinner(false);
            }, 2000);
        }

        const handleMore = () => {
            setResults([]);
            setNoResults(false);
            setSpinner(true);
            try {
                kbSearch.searchKb(query, page, limit, searchType)
                    .then((data) => {
                        console.log(data);
                        setTimeout(() => {
                            setSpinner(false);
                            if (data._embedded.article.length > 0) {
                                setResults(data._embedded.article);
                                setPage(data._links.next);
                                setCurrentPage(data.page);
                                setTotalPages(data.page_count);
                            } else {
                                setNoResults(true);
                            }

                        }, 2000)
                    })
            } catch (err) {
                console.log(err);
            }
        }

        const handleClear = () => {
            setResults([]);
            setQuery("");
            setPage(null);
            setCurrentPage(1);
            setTotalPages("");
            setArticle({
                title: "",
                summary: "",
                url: "",
                created: "",
                updated: "",
                keywords: ""
            });
            setAttributes({
                articleId: "",
                articleUrl: "",
                articleTitle: "",
                additionalContext: "",
                summary: "",
                created: "",
                lastUpdated: "",
                keywords: "",
            });
        }

        const handleSort = (e) => {
            setAttributes({ sort: Number(e) });
        }

        const handleMode = (e) => {
            setAttributes({ mode: e });
        }

        const handleLimit = (e) => {
            setAttributes({ limit: e });
        }

        const handleExact = (e) => {
            console.log(e);
            setAttributes({ exact: e });
        }

        return (
            <>
                <BlockControls>
                    {articleTitle != "" ?
                        <Toolbar label="KB Search Options">
                            <ToolbarItem
                                as={Button}
                                icon={trash}
                                label={__('Clear Selected Article?', 'uw-kb-search')}
                                onClick={handleClear}
                            />
                        </Toolbar> : <></>
                    }
                </BlockControls>

                <InspectorControls>
                    <PanelBody title={__('KB Search Settings', 'uw-kb-search')} initialOpen={true}>
                        <PanelRow>
                           <Sort sort={sort} handleSort={handleSort} />
                        </PanelRow>
                        <PanelRow>
                            <Mode mode={mode} handleMode={handleMode} />
                        </PanelRow>
                        <PanelRow>
                            <Limit limit={limit} handleLimit={handleLimit} />
                        </PanelRow>
                        <PanelRow>
                            <Exact exact={exact} handleExact={handleExact} />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    {(!articleTitle) ?
                        <SearchForm
                            query={query}
                            type={searchType}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            handleSelectType={handleSelectType}
                            handleMore={handleMore}
                            handleClearSearch={handleClear}
                            page={page}
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />
                        : <></>
                    }

                    {spinner ?
                        <div className="loading-spinner">
                            <Spinner
                                style={{
                                    height: 'calc( 3px * 20 )',
                                    width: 'calc( 3px * 20 )',
                                    textAlign: 'center',
                                }}
                            />
                        </div>
                        : <></>
                    }

                    {!spinner && articleTitle != "" ?
                        <SelectedArticle
                            articleUrl={articleUrl}
                            articleTitle={articleTitle}
                            summary={summary}
                            additionalContext={additionalContext} lastUpdated={lastUpdated}
                            created={created}
                            keywords={keywords} 
                            views={views}
                            setAttributes={setAttributes} /> : <></>
                    }

                    {(results.length > 0) ?
                        <SearchResults
                            results={results}
                            handleArticleSelect={handleArticleSelect}
                        />
                        : <></>
                    }

                    {(noResults && query != "") ?
                        <NoResults query={query} />
                        : <></>}
                </div>
            </>
        )
    },
    save({ attributes }) {
        const { articleId, articleUrl, articleTitle, summary, additionalContext, lastUpdated, created, keywords, views } = attributes;
        if ( articleTitle != "" ) {
            const blockProps = useBlockProps.save({
                className: "selected-kb-article",
                articleUrl: articleUrl,
                articleTitle: articleTitle,
                summary: summary,
                additionalContext: additionalContext,
                lastUpdated: lastUpdated,
                created: created,
                keywords: keywords,
                articleId: articleId,
                views: views,
            });
            
            return (
                <div {...blockProps}>
                    <h3>{articleTitle}</h3>
                    <p className="summary">{summary}</p>
                    <p className="summary>">{additionalContext}</p>
                    <hr />
                    <p className="dates">
                        {created != "" ?
                            <span>
                                <strong>Date Created: </strong>{created}
                            </span>
                            : <></>
                        }
                        {lastUpdated != "" ?
                            <span>
                                <strong>Date Updated: </strong>{lastUpdated}
                            </span>
                            : <></>
                        }
                    </p>
                    <div className="views">
                        <strong>Article Views: </strong>{views}
                    </div>
                    <div className="keywords">
                        {keywords}
                    </div>
                    <a href={articleUrl} className="button button-large view-kb-article">View KB Article</a>
                </div>
            )
        } else {
            return (
                <></>
            )
        }
        
    }
});