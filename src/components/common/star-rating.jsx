import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

/**
 * StarRatingComponent
 * Renders a 5-star rating system with interactive capabilities.
 */
function StarRatingComponent({ rating = 0, handleRatingChange }) {
  // Create an array of 5 stars and map through them
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= rating;

        return (
          <Button
            key={star}
            className={`p-2 rounded-full transition-all duration-200 transform ${
              isActive
                ? "text-yellow-500 bg-yellow-50 border-yellow-200 hover:bg-yellow-100 hover:scale-110"
                : "text-gray-300 hover:bg-gray-50 hover:text-gray-500"
            }`}
            variant="outline"
            size="icon"
            onClick={
              handleRatingChange ? () => handleRatingChange(star) : undefined
            }
            type="button"
          >
            <StarIcon
              className={`w-6 h-6 transition-all ${
                isActive
                  ? "fill-yellow-500 stroke-yellow-600"
                  : "fill-transparent stroke-current"
              }`}
            />
          </Button>
        );
      })}
    </div>
  );
}

export default StarRatingComponent;
