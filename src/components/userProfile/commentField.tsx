import { Dispatch, SetStateAction } from "react";

const CommentFeild:React.FC<{commentText: string, postComment: () => void, setCommentText: Dispatch<SetStateAction<string>>}> = ({commentText, setCommentText, postComment}) => {
    return <div className="flex items-center gap-2">
    <input
      type="text"
      className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm dark:bg-[#1e1e1e] dark:text-white"
      placeholder="Write a comment..."
      value={commentText}
      onChange={(e) => {
        setCommentText(e.target.value);
      }}
    />
    <button
      className="bg-primary text-white rounded-full px-4 py-2 text-sm hover:bg-opacity-80 transition cursor-pointer"
      onClick={postComment}
      // disabled={true}
    >
      Comment
    </button>
  </div>
}

export default CommentFeild