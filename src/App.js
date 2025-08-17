import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAllTexts, saveText } from "./api.js"; // make sure API.js has these functions

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const TextInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const TextItem = styled.div`
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function App() {
  const [texts, setTexts] = useState([]);
  const [newText, setNewText] = useState("");

  // Fetch all texts
  const loadTexts = async () => {
    try {
      const data = await fetchAllTexts();
      setTexts(data);
    } catch (err) {
      console.error("Error fetching texts:", err);
    }
  };

  useEffect(() => {
    loadTexts();
  }, []);

  // Save new text
  const handleSave = async () => {
    if (!newText.trim()) return alert("Text cannot be empty!");
    try {
      await saveText(newText);
      setNewText("");
      loadTexts(); // refresh list
    } catch (err) {
      console.error("Error saving text:", err);
    }
  };

  // Copy to clipboard
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    alert("Copied to clipboard!");
  };

  return (
    <Container>
      <Title>Text Manager</Title>
      <TextInput
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        placeholder="Write something..."
      />
      <Button onClick={handleSave}>Save Text</Button>

      <hr style={{ margin: "20px 0" }} />

      {texts.length === 0 ? (
        <p>No texts yet.</p>
      ) : (
        texts.map((t) => (
          <TextItem key={t._id}>
            <span>{t.content}</span>
            <Button onClick={() => handleCopy(t.content)}>Copy</Button>
          </TextItem>
        ))
      )}
    </Container>
  );
}
