import Carousel from "react-material-ui-carousel";
import { postSlide } from "../../utils/interface";
import { useRef } from "react";

const PostScroll: React.FC<{ posts: postSlide[] }> = ({ posts }) => {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const handleChange = (_now: number, _previous: number) => {
        // Pause all videos
        videoRefs.current.forEach((video) => {
          if (video && !video.paused) {
            video.pause();
          }
        });
      };
  return (
    <Carousel
    indicators={true}
    navButtonsAlwaysVisible={false}
    animation="slide"
    autoPlay={false}
    duration={500}
      activeIndicatorIconButtonProps={{
        style: { color: "#fff", background: '#463a85' },
      }}
    >
      {posts.map((post, index) => {

        return (
            <div
            key={post.id}
            className="flex items-center justify-center w-full p-2"
            style={{ minHeight: "300px" }} // Fix this to a value matching your tallest content
          >
          {post.media_type === "video" ? (
          <video
            src={post.media_url}
            ref={(el) => (videoRefs.current[index] = el)}
            controls 
            className="max-h-full max-w-full object-contain rounded-md"
          />
        ) : (
          <img
            src={post.media_url}
            alt="SportLaze post"
            className="max-h-full max-w-full object-contain rounded-md"
          />
        )}
          </div>
        );
      })}
    </Carousel>
  );
};

export default PostScroll