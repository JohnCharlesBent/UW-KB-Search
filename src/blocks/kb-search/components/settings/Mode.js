import { SelectControl } from '@wordpress/components';

const Mode = ({ mode, handleMode }) => {
    return (
        <SelectControl 
        label="Search Mode:"
        value={ mode }
        help="Search by keyword, fulltext, attachments, or a combination?"
        options={ [
                { label: "Keyword search", value: 0 },
                { label: "Fulltext search", value: 1 },
                { label: "Attachments search", value: 2 },
                { label: "Keywords + attachments search", value: 3 },
                { label: "Fulltext + attachments search", value: 4 }
            ] }
        onChange={handleMode}
        />
    )
}

export default Mode;