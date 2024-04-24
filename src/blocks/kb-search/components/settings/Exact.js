import {
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

const Exact = ({ exact, handleExact }) => {
    return (
        <ToggleGroupControl
            label="Verbatim Search or Fuzzy Search?" 
            value={exact}
            help="Should the search results exactly match the keyword(s) you provide, or approximately match?"
            onChange={handleExact}
            isBlock>
                <ToggleGroupControlOption value={0} label="Fuzzy Search" />
                <ToggleGroupControlOption value={1} label="Exact" />
            </ToggleGroupControl>
    );
}

export default Exact;