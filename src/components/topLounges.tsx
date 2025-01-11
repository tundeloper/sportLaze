import { useRef } from "react";
import LoungeCard from "./loungeCard";

// Sample data for lounges
const lounges = [
  {
    title: "Basket Ball",
    image: "/assets/lounge/soccer.png",
    stats: "990k",
  },
  {
    title: "Soccer",
    image: "/assets/lounge/soccer.png",
    stats: "990k",
  },
  {
    title: "The NFL",
    image: "/assets/lounge/soccer.png",
    stats: "990k",
  },
  {
    title: "Hockey",
    image: "/assets/lounge/soccer.png",
    stats: "990k",
  },
  {
    title: "The NFL",
    image: "/assets/lounge/soccer.png",
    stats: "990k",
  },
  {
    title: "Hockey",
    image: "/assets/lounge/soccer.png",
    stats: "990k",
  },
];

const TopLounges: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll left functionality
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Scroll right functionality
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="py-6 ">

      <div className="relative mx[4] px-[3rem] max-w-[60rem]">
        {/* Title */}
        <h2 className="text-2xl font-bold text-blue-900">Top Lounges</h2>
        <div>
          {/* Left Scroll Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 text-blue-900 p-2 rounded-full shadow-md hover:bg-gray-300"
          >
            &#8592;
          </button>

          {/* Scrollable Container */}
          <div
            className="flex gap-4 p-4 overflow-x-scroll scroll-smooth no-scrollbar"
            ref={scrollContainerRef}
          >
            {/* Cards */}
            {lounges.map((lounge, index) => (
              <LoungeCard stats={lounge.stats} title={lounge.title} image={lounge.image} />
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 text-blue-900 p-2 rounded-full shadow-md hover:bg-gray-300"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopLounges;