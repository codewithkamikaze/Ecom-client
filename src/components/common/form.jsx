import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

/**
 * CommonForm Component
 * A dynamic form builder that renders different input types based on configuration.
 */
function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  // Helper function to render specific input components
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData?.[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="rounded-xl border-gray-200 focus:ring-blue-500"
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full rounded-xl border-gray-200">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {getControlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="rounded-xl border-gray-200 focus:ring-blue-500 min-h-[100px]"
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="rounded-xl"
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-col gap-4">
        {formControls?.map((controlItem) => (
          <div className="grid w-full gap-2" key={controlItem.name}>
            <Label className="text-sm font-bold text-gray-700 ml-1">
              {controlItem.label}
            </Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>

      <Button
        disabled={isBtnDisabled}
        type="submit"
        className="mt-4 w-full h-12 rounded-xl font-bold text-base transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-100"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
