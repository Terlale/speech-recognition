import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  padding: 10px;
`;

const Button = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  margin-right: 10px;
  background-color: ${props => (props.primary ? '#4CAF50' : '#008CBA')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ClearButton = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const App = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    const speechRecognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();

    speechRecognition.lang = "tr-Tr";
    speechRecognition.continuous = true;

    speechRecognition.onresult = (event) => {
      const arr = event.results;
      setTranscript((prevTranscript) => prevTranscript + arr[arr.length - 1][0].transcript);
    };

    recognitionRef.current = speechRecognition;
    recognitionRef.current.start();
    setListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const clearTextarea = () => {
    setTranscript('');
  };

  return (
    <Container>
      <Title>Söhbəti mətinə çevir...</Title>
      <Textarea value={transcript} cols="30" rows="10"></Textarea>
      <Button onClick={toggleListening} disabled={listening} primary>
        Qulaq as
      </Button>
      {listening && (
        <Button onClick={stopListening} disabled={!listening}>
          Dayandır
        </Button>
      )}
      <ClearButton onClick={clearTextarea}>Sil</ClearButton>
    </Container>
  );
};

export default App;
