<div align="center">
  <img src="https://raw.githubusercontent.com/sankaSanjeeva/react-use-audio-recorder/blob/main/media/repo-logo.png" alt="React-use-audio-recorder repo logo" />
</div>

<p align="center">
React-use-audio-recorder simplifies audio recording in your React applications. Built on top of the powerful RecordRTC.js library, this provides an easy-to-use interface for capturing, managing, and interacting with audio recordings.
</p>

### Features

- `useAudioRecorder` hook
- `AudioRecorder` React component

### Install

    npm i react-use-audio-recorder

### Quick Start

`useAudioRecorder` hook

```jsx
import { useAudioRecorder } from "react-use-audio-recorder";

function App() {
  const {
    recordingStatus,
    recordingTime,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    getBlob,
    saveRecording,
  } = useAudioRecorder();

  return (
    <div>
      <span>{`Recording Status - ${recordingStatus} - ${recordingTime} s`}</span>

      <div>
        <button
          disabled={!(!recordingStatus || recordingStatus === "stopped")}
          onClick={startRecording}
        >
          Start
        </button>

        <button
          disabled={!(recordingStatus === "recording")}
          onClick={pauseRecording}
        >
          Pause
        </button>

        <button
          disabled={!(recordingStatus === "paused")}
          onClick={resumeRecording}
        >
          Resume
        </button>

        <button
          disabled={
            !(recordingStatus === "recording" || recordingStatus === "paused")
          }
          onClick={stopRecording}
        >
          Stop
        </button>
      </div>

      <div>
        <button
          disabled={!(recordingStatus === "stopped")}
          onClick={() => saveRecording()}
        >
          Save
        </button>
        <button
          disabled={!(recordingStatus === "stopped")}
          onClick={() => console.log(getBlob())}
        >
          Get Blob
        </button>
      </div>
    </div>
  );
}
```

`AudioRecorder` React component

```jsx
import AudioRecorder from "react-use-audio-recorder";
import "react-use-audio-recorder/dist/index.css";

function App() {
  return <AudioRecorder onStop={(blob) => console.log(blob)} />;
}
```
