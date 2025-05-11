import { commentsType } from "./interface";

export default function toggleLike(
  comments: commentsType[],
  targetId: number
): commentsType[] {
  const findAndToggle = (nodes: commentsType[]): boolean => {
    for (const node of nodes) {
      if (node.id === targetId) {
        // Toggle like status
        node.is_liked = !node.is_liked;
        node.likes_count += node.is_liked ? 1 : -1;
        return true;
      }
      if (node.replies.length > 0) {
        if (findAndToggle(node.replies)) return true;
      }
    }
    return false;
  };

  const updatedComments = JSON.parse(JSON.stringify(comments)); // Deep clone
  findAndToggle(updatedComments);
  return updatedComments;
}
