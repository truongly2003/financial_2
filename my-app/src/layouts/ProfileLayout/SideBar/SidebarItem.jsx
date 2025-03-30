import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const SidebarItem = ({ icon: Icon, label, to, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {to ? (
        <Link
          to={to}
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 rounded-md"
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon size={18} />}
            {label}
          </div>
        </Link>
      ) : (
        <button
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 rounded-md"
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon size={18} />}
            {label}
          </div>
          {children ? (
            open ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )
          ) : null}
        </button>
      )}

      {open && children && <div className="pl-6">{children}</div>}
    </div>
  );
};
SidebarItem.propTypes = {
  icon: PropTypes.elementType,
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  to: PropTypes.string,
};
export default SidebarItem;
