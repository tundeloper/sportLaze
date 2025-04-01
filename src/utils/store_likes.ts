export function storePostId(postId: string): string[] {
    // Retrieve the existing array from localStorage (or initialize an empty array)
    let storedIds: string[] = JSON.parse(localStorage.getItem("postIds") || "[]");

    // Check if the ID is already in the array
    if (!storedIds.includes(postId)) {
        storedIds.push(postId); // Add the new ID
        localStorage.setItem("postIds", JSON.stringify(storedIds)); // Save back to localStorage
        console.log(`Post ID ${postId} added.`);
    }

    return storedIds
}

export function removePostId(postId: string): string[] {
    // Retrieve the existing array from localStorage (or initialize an empty array)
    let storedIds: string[] = JSON.parse(localStorage.getItem("postIds") || "[]");

    // Filter out the ID to be removed
    const updatedIds = storedIds.filter(id => id !== postId);

    // Update localStorage
    localStorage.setItem("postIds", JSON.stringify(updatedIds));

    console.log(`Post ID ${postId} removed.`);
    return storedIds
}