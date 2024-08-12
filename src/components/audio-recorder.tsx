import { useEffect } from "react";
import { useAudioRecorder } from "../hooks";
import { AudioRecorderProps } from "../types";
import "./styles.css";

export default function AudioRecorder({ onStop }: AudioRecorderProps) {
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

  useEffect(() => {
    if (recordingStatus === "stopped") {
      onStop?.(getBlob());
    }
  }, [recordingStatus]);

  return (
    <div className="audio-recorder">
      {(!recordingStatus || recordingStatus === "stopped") && (
        <button className="record-button" onClick={startRecording}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 48 48"
          >
            <path
              fill="none"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M31.03 25.59a7.03 7.03 0 0 1-14.06 0V11.53a7.03 7.03 0 0 1 14.06 0z"
            />
            <path
              fill="none"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M35.919 25.59c0 6.582-5.336 11.919-11.919 11.919s-11.919-5.337-11.919-11.92M24 37.509V43.5"
            />
          </svg>
        </button>
      )}

      {recordingStatus === "recording" && (
        <button className="record-button" onClick={pauseRecording}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M16 19q-.825 0-1.412-.587T14 17V7q0-.825.588-1.412T16 5t1.413.588T18 7v10q0 .825-.587 1.413T16 19m-8 0q-.825 0-1.412-.587T6 17V7q0-.825.588-1.412T8 5t1.413.588T10 7v10q0 .825-.587 1.413T8 19"
            />
          </svg>
        </button>
      )}

      {recordingStatus === "paused" && (
        <button className="record-button" onClick={resumeRecording}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712"
            />
          </svg>
        </button>
      )}

      <div
        className="recording-status"
        style={
          recordingStatus === "recording" || recordingStatus === "paused"
            ? { opacity: 1 }
            : { opacity: 0 }
        }
      >
        <span>Recording {`${recordingTime} s`}</span>
      </div>

      <button
        className="pause-resume-button"
        onClick={() => saveRecording()}
        disabled={recordingStatus !== "stopped"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M12 15.575q-.2 0-.375-.062T11.3 15.3l-3.6-3.6q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L11 12.15V5q0-.425.288-.712T12 4t.713.288T13 5v7.15l1.875-1.875q.3-.3.713-.288t.712.313q.275.3.288.7t-.288.7l-3.6 3.6q-.15.15-.325.213t-.375.062M6 20q-.825 0-1.412-.587T4 18v-2q0-.425.288-.712T5 15t.713.288T6 16v2h12v-2q0-.425.288-.712T19 15t.713.288T20 16v2q0 .825-.587 1.413T18 20z"
          />
        </svg>
      </button>

      <button
        className="stop-button"
        onClick={stopRecording}
        disabled={!recordingStatus || recordingStatus === "stopped"}
      >
        Stop
      </button>
    </div>
  );
}
