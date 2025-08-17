// API.js
const BASE_URL = "http://localhost:5000/api/texts";

/**
 * Fetch all texts from backend
 * @returns {Promise<Array>} Array of text objects
 */
export const fetchAllTexts = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch texts");
    return res.json();
  } catch (err) {
    console.error("Error in fetchAllTexts:", err);
    throw err;
  }
};

/**
 * Fetch the latest text from backend
 * @returns {Promise<Object>} Latest text object
 */
export const fetchLatestText = async () => {
  try {
    const res = await fetch(`${BASE_URL}/latest`);
    if (!res.ok) throw new Error("Failed to fetch latest text");
    return res.json();
  } catch (err) {
    console.error("Error in fetchLatestText:", err);
    throw err;
  }
};

/**
 * Save a new text to backend
 * @param {string} content - Text content to save
 * @returns {Promise<Object>} Saved text object
 */
export const saveText = async (content) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) throw new Error("Failed to save text");
    return res.json();
  } catch (err) {
    console.error("Error in saveText:", err);
    throw err;
  }
};
