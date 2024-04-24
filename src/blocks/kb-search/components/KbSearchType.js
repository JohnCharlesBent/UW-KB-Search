import { SelectControl } from '@wordpress/components';

const KbSearchType = ({ type, handleSelectType }) => {
    return (
        <SelectControl 
            label="Search Article or Help Desk?"
            value={ type }
            options={ [
                { label: "Help Desk", value: "Help Desk" },
                { label: "Articles", value: "Articles" }
            ] }
            onChange={ handleSelectType }
        />
    )
}

export default KbSearchType;