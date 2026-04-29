import PropTypes from "prop-types";
import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div
      className="
        bg-white 
        rounded-xl 
        border border-gray-100
        shadow-sm 
        w-full lg:w-64
        m-0 
        p-0
      
        h-auto
      "
    >
      {/* Header */}
      <div className="p-5 border-b border-gray-50 bg-gray-50/50 rounded-t-xl">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
          Filters
        </h2>
      </div>

      {/* Body */}
      <div className="p-5 space-y-6">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                {keyItem}
              </h3>

              <div className="grid gap-3">
                {filterOptions[keyItem].map((option) => {
                  const isChecked =
                    Array.isArray(filters?.[keyItem]) &&
                    filters[keyItem].includes(option.id);

                  return (
                    <Label
                      key={option.id}
                      className={`
                        flex items-center gap-3 p-2 rounded-md cursor-pointer
                        transition-colors duration-200
                        ${isChecked ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50 text-gray-600"}
                        font-medium text-sm
                      `}
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                        className="border-gray-300 data-[state=checked]:bg-blue-600"
                      />
                      {option.label}
                    </Label>
                  );
                })}
              </div>
            </div>
            <Separator className="bg-gray-100" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

ProductFilter.propTypes = {
  filters: PropTypes.object,
  handleFilter: PropTypes.func.isRequired,
};

export default ProductFilter;
