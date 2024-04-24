import LoopIcon from '@mui/icons-material/Loop';
import ClearAllIcon from '@mui/icons-material/ClearAll';

const Pagination = ({ handleMore, handleClearSearch, currentPage, totalPages }) => {
    return (
        <>
            <div className="kb-pagination">
                <div className="pagination-data">
                    Viewing page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </div>
                <div className="button-group">
                    <button
                        className="button button-secondary clear"
                        onClick={handleClearSearch}>
                        Clear <ClearAllIcon />
                    </button>
                    <button
                        className="button button-secondary load-more"
                        onClick={handleMore}>
                        Load More <LoopIcon />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Pagination;