import React from "react";

const Reviews = () => {
  const reviews = [
    { name: "Jane Smith", feedback: "Great client!", rating: 5 },
    { name: "Mike Johnson", feedback: "Clear requirements.", rating: 4.5 },
  ];

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h3 className="font-semibold mb-4">Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index} className="mb-4">
          <p className="font-medium">{review.name}</p>
          <p className="text-gray-500">{review.feedback}</p>
          <span className="text-yellow-400">{review.rating} ★</span>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
