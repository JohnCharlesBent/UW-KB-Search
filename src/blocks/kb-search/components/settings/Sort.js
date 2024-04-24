import { SelectControl } from '@wordpress/components';

const Sort = ({ sort, handleSort }) => {
    return ( 
    <SelectControl 
        label="Sort Results By:"
        help="How should the search results be sorted?"
        value={ sort }
        options={ [
            { label: "Sort by title, ascending", value: 3 },
            { label: "Sort by title, descending", value: 4 },
            { label: "Sort by updated date, ascending", value: 5 },
            { label: "Sort by updated date, descending", value: 6 },
            { label: "Sort by created date, ascending", value: 7 },
            { label: "Sort by created date, descending", value: 8 },
            { label: "Sort by reviewed date, ascending", value: 9 },
            { label: "Sort by reviewed date, descending", value: 10 },
            { label: "Sort by activation date, ascending", value: 11 },
            { label: "Sort by activation date, descending", value: 12 },
            { label: "Sort by expiration date, ascending", value: 13 },
            { label: "Sort by expiration date, descending", value: 14 },
            { label: "Sort by view count, ascending", value: 15 },
            { label: "Sort by view count, descending", value: 16 }
        ] }
        onChange={handleSort}
    />
    )
}

export default Sort;