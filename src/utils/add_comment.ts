import { commentsType } from "./interface";

export default function insertReply(
  comments: commentsType[],
  newReply: commentsType
): commentsType[] {
  const findAndInsert = (nodes: commentsType[]): boolean => {
    for (const node of nodes) {
      if (node.id === newReply.parent_id) {
        node.replies.push(newReply);
        return true; // Inserted
      }
      if (node.replies.length > 0) {
        if (findAndInsert(node.replies)) return true;
      }
    }
    return false;
  };

  // Create a deep clone if you want to preserve immutability
  const updatedComments = JSON.parse(JSON.stringify(comments));
  findAndInsert(updatedComments);
  return updatedComments;
}

export function removeComment(
  comments: commentsType[],
  targetId: number
): commentsType[] {
  const removeRecursive = (nodes: commentsType[]): commentsType[] => {
    return nodes
      .filter((node) => node.id !== targetId) // Remove if ID matches
      .map((node) => ({
        ...node,
        replies: removeRecursive(node.replies), // Recurse into replies
      }));
  };

  return removeRecursive(comments);
}
