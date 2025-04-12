import Carousel from "react-material-ui-carousel";
import { postSlide } from "../../utils/interface";

const PostScroll: React.FC<{ posts: postSlide[] }> = ({ posts }) => {
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
      {posts.map((post) => {

        return (
            <div
            key={post.id}
            className="flex items-center justify-center w-full p-2"
            style={{ minHeight: "300px" }} // Fix this to a value matching your tallest content
          >
          {post.media_type === "video" ? (
          <video
            src={post.media_url}
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