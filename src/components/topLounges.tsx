import { useRef } from "react";
import LoungeCard from "./loungeCard";
import { ScrollLeft, ScrollRight } from "../assets/lounge/scroll";
import basketball from '../assets/svgs/basketball.png'
// import hockey from '../assets/svgs/Hockey.png'
import hockey from '../assets/svgs/hockeyEdit.jpg'
// import hockey from '../assets/svgs/Hockey.png'
import nfl from '../assets/svgs/nflEdit.jpg'
// import nfl from '../assets/svgs/the nfl.png'
import soccer from '../assets/lounge/soccer.png'
import { LoungeType } from "../utils/interface";

// Sample data for lounges
const lounges = [
  {
    title: "Basket Ball",
    image: basketball,
    stats: "990k",
  },
  {
    title: "Soccer",
    image: soccer,
    stats: "990k",
  },
  {
    title: "The NFL",
    image: nfl,
    stats: "990k",
  },
  {
    title: "Hockey",
    image: hockey,
    stats: "990k",
  },
];

const TopLounges: React.FC<{topLounges: LoungeType[]}> = ({topLounges}) => {
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
    <div className="py-6 flex justify-center w-[100vw] items-center">
      <div className="relative mx[4] px-[3rem] w-full sm:w-[40rem] md:w-[60rem]">
        {/* Title */}
        <h2 className="text-2xl font-bold text-blue-900">Top Lounges</h2>
        <div>
          {/* Left Scroll Button */}
          <button
            onClick={scrollLeft}
            className="absolute hidden left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 text-blue-900 p-2 rounded-full shadow-md hover:bg-gray-300 md:block"
          >
            <ScrollLeft />
          </button>

          {/* Scrollable Container */}
          <div
            className="flex gap-2 p-4 overflow-x-scroll scroll-smooth no-scrollbar sm:gap-4"
            ref={scrollContainerRef}
          >
            {/* Cards */}
            {topLounges.map((lounge, index) => (
              <LoungeCard {...lounge} />
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={scrollRight}
            className="absolute hidden block right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 text-blue-900 p-2 rounded-full shadow-md hover:bg-gray-300 md:block"
          >
            <ScrollRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopLounges;