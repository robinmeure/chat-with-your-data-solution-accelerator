import React, { useState, useEffect } from "react";
import { Stack, TextField } from "@fluentui/react";
import { SendRegular } from "@fluentui/react-icons";
import Send from "../../assets/Send.svg";
import MicrophoneIcon from "../../assets/mic-outline.svg";
import styles from "./QuestionInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
interface Props {
  onSend: (question: string) => void;
  onMicrophoneClick: () => void;
  onStopClick: () => void;
  openPromptGeneratorClick:() => void;
  disabled: boolean;
  isSendButtonDisabled:boolean;
  placeholder?: string;
  clearOnSend?: boolean;
  recognizedText: string;
  isListening: boolean;
  isRecognizing: boolean;
  isTextToSpeachActive : boolean;
  setRecognizedText: (text: string) => void;
  prompt?: string;
}

export const QuestionInput = ({
  onSend,
  onMicrophoneClick,
  onStopClick,
  openPromptGeneratorClick,
  disabled,
  isSendButtonDisabled,
  placeholder,
  clearOnSend,
  recognizedText,
  isListening,
  isRecognizing,
  setRecognizedText,
  prompt,
  isTextToSpeachActive
}: Props) => {
  const [question, setQuestion] = useState<string>("");
  const [liveRecognizedText, setLiveRecognizedText] = useState<string>("");
  const [microphoneIconActive, setMicrophoneIconActive] =
    useState<boolean>(false);
  const [isMicrophoneDisabled , setIsMicrophoneDisabled] = useState(false);
  const [isTextAreaDisabled, setIsTextAreaDisabled] = useState(false);
  useEffect(() => {
    if (isRecognizing) {
      setLiveRecognizedText(recognizedText);
      setIsTextAreaDisabled(true)
      setMicrophoneIconActive(true); // Set microphone icon to active (blue)
    } else {
      setIsTextAreaDisabled(false)
      setMicrophoneIconActive(false); // Set microphone icon to inactive
    }
  }, [recognizedText, isRecognizing]);
  useEffect(()=>{
    setIsMicrophoneDisabled(isTextToSpeachActive);
  },[isTextToSpeachActive])

  useEffect(() => {
    if (prompt) {
      setQuestion(prompt);
    }
  });

  const sendQuestion = () => {
    if (disabled || (!question.trim() && !liveRecognizedText.trim())) {
      return;
    }

    const textToSend = question || liveRecognizedText;

    onSend(textToSend);

    if (clearOnSend) {
      setQuestion("");
      setLiveRecognizedText("");
      setRecognizedText(""); // Clear recognizedText
    }
  };

  const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      sendQuestion();
    }
  };

  const onQuestionChange = (
    _ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setQuestion(newValue || "");
    setLiveRecognizedText(newValue || ""); // Update liveRecognizedText when edited
  };

  const sendQuestionDisabled = disabled || !question.trim();

  return (
    <div>
       {/* PromptGenerate Icon */}
       <Stack className={styles.promptGenerateContainer} onClick={openPromptGeneratorClick}>
          <span>
            <svg className={styles.promptGenerateIcon} fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17 2.5a.5.5 0 0 0-1 0V3h-.5a.5.5 0 0 0 0 1h.5v.5a.5.5 0 0 0 1 0V4h.5a.5.5 0 0 0 0-1H17v-.5Zm-13 13a.5.5 0 0 0-1 0v.5h-.5a.5.5 0 0 0 0 1H3v.5a.5.5 0 0 0 1 0V17h.5a.5.5 0 0 0 0-1H4v-.5Zm3-1.56V15a3 3 0 0 0 3 3h5a3 3 0 0 0 3-3v-5a3 3 0 0 0-3-3h-1.06a2.13 2.13 0 0 1 0 1H15a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-1.06a2.13 2.13 0 0 1-1 0Zm3.5-.94a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Zm-.5-1.5c0-.28.22-.5.5-.5H15a.5.5 0 0 1 0 1h-4.5a.5.5 0 0 1-.5-.5ZM7.24 3.26c.04-.17.18-.26.26-.26.09 0 .22.09.26.26a5.14 5.14 0 0 0 3.98 3.98c.17.04.26.17.26.26s-.09.22-.26.26c-.67.14-1.7.5-2.6 1.39-.89.9-1.24 1.92-1.38 2.59-.04.17-.17.26-.26.26s-.22-.09-.26-.26a5.14 5.14 0 0 0-3.98-3.98C3.1 7.72 3 7.59 3 7.5s.09-.22.26-.26a5.15 5.15 0 0 0 3.98-3.98ZM7.5 2c-.65 0-1.12.51-1.24 1.06-.11.55-.4 1.37-1.11 2.09-.72.71-1.54 1-2.09 1.11C2.51 6.37 2 6.86 2 7.5c0 .65.52 1.13 1.06 1.24.55.11 1.37.4 2.09 1.11.71.72 1 1.54 1.11 2.1.12.54.59 1.05 1.24 1.05s1.13-.51 1.24-1.06c.11-.55.4-1.37 1.11-2.09.72-.71 1.54-1 2.1-1.11.54-.11 1.05-.59 1.05-1.24s-.51-1.13-1.06-1.24a4.14 4.14 0 0 1-2.09-1.11c-.71-.72-1-1.54-1.11-2.1C8.63 2.52 8.15 2 7.5 2Z" fill="currentColor"></path></svg>
          </span>
          <span className={styles.promptGenerateText}>
          View Prompts</span>
        </Stack>
        <Stack horizontal className={styles.questionInputContainer}>
          {/* Text Input Field */}
          <TextField
            style={{backgroundColor: 'white'}}
            disabled={isTextAreaDisabled}
            className={styles.questionInputTextArea}
            placeholder={placeholder}
            multiline
            resizable={false}
            borderless
            value={question || liveRecognizedText}
            onChange={(e, newValue) => {
              if (newValue !== undefined) {
                onQuestionChange(e, newValue);
                setRecognizedText(newValue);
              }
            }}
            onKeyDown={onEnterPress}
          />
          <div className={styles.microphoneAndSendContainer}>
            {/* Microphone Icon */}
            <button
            type="button"
              disabled={(isMicrophoneDisabled) ? true : false}
              className={styles.questionInputMicrophone}
              onClick={(isListening) ? onStopClick : onMicrophoneClick}
              onKeyDown={(e) =>
                e.key === "Enter" || e.key === " "
                  ? (isListening)
                    ? onStopClick()
                    : onMicrophoneClick()
                  : null
              }
              role="button"
              tabIndex={0}
              aria-label="Microphone button"
            >
              {microphoneIconActive || isMicrophoneDisabled ? (
                <FontAwesomeIcon
                  icon={faMicrophone}
                  className={styles.microphoneIconActive}
                  style={{ color: isMicrophoneDisabled ? "lightgray" : "blue" }}
                />
              ) : (
                  <img
                  src={MicrophoneIcon}
                  className={styles.microphoneIcon}
                  alt="Microphone"
                />
              )}
            </button>

            {/* Send Button */}
            {isSendButtonDisabled?( <SendRegular className={styles.SendButtonDisabled} />):(
                  <div
                  role="button"
                  tabIndex={0}
                  aria-label="Ask question button"
                  onClick={sendQuestion}
                  onKeyDown={(e) =>
                    e.key === "Enter" || e.key === " " ? sendQuestion() : null
                  }
                  className={styles.questionInputSendButtonContainer}
                  >
                  {disabled? (
                    <SendRegular className={styles.questionInputSendButtonDisabled} />
                  ) : (
                    <img
                      src={Send}
                      className={styles.questionInputSendButton}
                      alt="Send"
                    />
                  )}
                  </div>
            )}
          </div>
        </Stack>
    </div>
  );
};
