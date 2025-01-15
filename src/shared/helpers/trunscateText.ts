export const truncateText = (text, length) => {
    const truncatedText =
      text.length > length ? text.substring(0, length) + "..." : text;
    
    return truncatedText;
}