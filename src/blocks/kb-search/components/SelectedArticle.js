import { useBlockProps, RichText } from '@wordpress/block-editor';

const SelectedArticle = ({ articleUrl, articleTitle, summary,  additionalContext, lastUpdated, created, keywords, views, setAttributes }) => {
    const blockProps = useBlockProps({
        className: "selected-kb-article"
    });
    return ( 
        <>
        <Fragment>
            <div {...blockProps}>
                <RichText 
                    tagName="h3"
                    value={articleTitle}
                    onChange={ ( newVal ) => setAttributes( { articleTitle: newVal } ) }
                />
                <div className="article-content">
                    <RichText 
                        tagName="p"
                        value={summary}
                        className="summary"
                        allowedFormats={ ['core/bold', 'core/italic', 'core/link'] }
                        onChange={ ( newVal ) => setAttributes( { summary: newVal } ) }
                    />
                    <RichText 
                        tagName="p"
                        value={additionalContext}
                        allowedFormats={ ['core/bold', 'core/italic', 'core/link'] }
                        onChange={ ( newVal ) => setAttributes( { additionalContext: newVal } ) }
                        placeholder="Provide additional context for this article here ... "
                    />
                    <p className="dates">
                        { created != "" ?  
                            <span>
                                <strong>Date Created: </strong>{ created }
                            </span> 
                        : <></> }
                        { lastUpdated != "" ? 
                            <span>
                                <strong>Date Updated: </strong>{ lastUpdated }
                            </span> : <></>
                        }
                    </p>
                    <div className="views">
                        <strong>Arctivle Views: </strong>{ views }
                    </div>
                    <div className="keywords">
                        <strong>Keywords: </strong>{ keywords }
                    </div>
                    <div class="button-wrapper">
                        <a href={articleUrl} className="article-link button button-large button-primary">View KB Article</a>
                    </div>
                </div>
            </div>
            </Fragment>
        </>
    )
}

export default SelectedArticle;