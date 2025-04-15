import Carousel from "react-material-ui-carousel";
import { postSlide } from "../../utils/interface";
import { useEffect, useRef, useState } from "react";

const PostScroll: React.FC<{ posts: postSlide[] }> = ({ posts }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(250); // default

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (!entry.isIntersecting && !video.paused) {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    const videos = document.querySelectorAll("video");
    videos.forEach((video) => observer.observe(video));

    return () => {
      videos.forEach((video) => observer.unobserve(video));
    };
  }, [posts]);

  const handleChange = () => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => video.pause());
  };

  const handleVideoPlay = (playingVideo: HTMLVideoElement) => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      if (video !== playingVideo && !video.paused) {
        video.pause();
      }
    });
  };

  const handleMediaLoad = (element: HTMLImageElement | HTMLVideoElement) => {
    if (element && element.offsetHeight > maxHeight) {
      setMaxHeight(element.offsetHeight);
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-[800px] mx-auto">
      <Carousel
        indicators={true}
        navButtonsAlwaysVisible={false}
        animation="slide"
        autoPlay={false}
        duration={500}
        onChange={handleChange}
        activeIndicatorIconButtonProps={{
          style: { color: "#fff", background: "#463a85" },
        }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-center w-full p-2"
            style={{ height: `${maxHeight}px` }}
          >
            {post.media_type === "video" ? (
              <video
                src={post.media_url}
                controls
                className="max-h-full max-w-full  object-contain rounded-md"
                onPlay={(e) => handleVideoPlay(e.currentTarget)}
                onLoadedMetadata={(e) =>
                  handleMediaLoad(e.currentTarget as HTMLVideoElement)
                }
              />
            ) : (
              <img
                src={post.media_url}
                alt="SportLaze post"
                className="max-h-full max-w-full w-full object-contain rounded-md"
                onLoad={(e) =>
                  handleMediaLoad(e.currentTarget as HTMLImageElement)
                }
              />
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PostScroll;
    