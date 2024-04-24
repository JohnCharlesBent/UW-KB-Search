import {  __experimentalNumberControl as NumberControl } from '@wordpress/components';

const Limit = ({ limit, handleLimit }) => {
    return (
       <NumberControl
            label="Results Limit:"
            help="How many results should be returned from the API?"
            isShiftStepEnabled={ true }
            onChange={ handleLimit }
            shiftStep={ 5 }
            value={ limit }
            min="5"
            max="25"
        />
    )
}

export default Limit;