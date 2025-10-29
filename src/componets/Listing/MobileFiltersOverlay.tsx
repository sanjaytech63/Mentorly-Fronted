import FiltersSidebar, { FiltersSidebarProps } from "./FiltersSidebar";

interface MobileFiltersOverlayProps extends FiltersSidebarProps {
    show: boolean;
    onClose: () => void;
}

const MobileFiltersOverlay: React.FC<MobileFiltersOverlayProps> = ({ show, ...props }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-999 lg:hidden">
            <div className="absolute inset-0 bg-black/40 bg-opacity-50" onClick={props.onClose} />
            <div className="absolute left-0 top-0 h-full w-64 bg-white overflow-y-auto">
                <FiltersSidebar {...props} onClose={props.onClose} />
            </div>
        </div>
    );
};

export default MobileFiltersOverlay;