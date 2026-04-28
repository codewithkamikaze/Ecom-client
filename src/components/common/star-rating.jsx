import PropTypes from "prop-types";
import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating = 0, handleRatingChange }) {
  return [1, 2, 3, 4, 5].map((star) => {
    const isActive = star <= rating;

    return (
      <Button
        key={star}
        className={`p-2 rounded-full transition-colors ${
          isActive
            ? "text-yellow-500 hover:bg-black"
            : "text-black hover:bg-primary hover:text-primary-foreground"
        }`}
        variant="outline"
        size="icon"
        onClick={
          handleRatingChange ? () => handleRatingChange(star) : undefined
        }
        type="button"
      >
        <StarIcon
          className={`w-6 h-6 ${isActive ? "fill-yellow-500" : "fill-black"}`}
        />
      </Button>
    );
  });
}

/* ✅ PropTypes */
StarRatingComponent.propTypes = {
  rating: PropTypes.number,
  handleRatingChange: PropTypes.func,
};

export default StarRatingComponent;
