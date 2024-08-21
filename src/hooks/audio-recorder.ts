import { useEffect, useRef, useState } from "react";
import RecordRTC, { StereoAudioRecorder, State } from "recordrtc";

const useAudioRecorder = () => {
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingStatus, setRecordingStatus] = useState<State>();

  const intervalRef = useRef<any>(null);
  const recorderRef = useRef<any>(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((microphone) => {
        recorderRef.current = new RecordRTC(microphone, {
          type: "audio",
          recorderType: StereoAudioRecorder,
          desiredSampRate: 16000,
          disableLogs: true,
        });

        recorderRef.current.startRecording();
        recorderRef.current.microphone = microphone;
        setRecordingStatus("recording");
      })
      .catch((error) => {
        alert("Unable to access your microphone.");
        console.error(error);
      });
  };

  const stopRecording = (
    callBack?: (blob?: Blob, blobURL?: string) => void
  ) => {
    recorderRef.current?.stopRecording((blobURL: string) => {
      recorderRef.current.microphone.stop();
      setRecordingStatus("stopped");
      setRecordingTime(0);
      callBack?.(recorderRef.current?.getBlob(), blobURL);
    });
  };

  const pauseRecording = () => {
    recorderRef.current?.pauseRecording();
    setRecordingStatus("paused");
  };

  const resumeRecording = () => {
    recorderRef.current?.resumeRecording();
    setRecordingStatus("recording");
  };

  const saveRecording = (fileName?: string) => {
    recorderRef.current?.save(fileName);
  };

  const getBlob = (): Blob => {
    return recorderRef.current?.getBlob();
  };

  useEffect(() => {
    if (recordingStatus == "recording") {
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }

    if (!recordingStatus || recordingStatus == "stopped") {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [recordingStatus]);

  return {
    recordingStatus,
    recordingTime,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    saveRecording,
    getBlob,
  };
};

export default useAudioRecorder;
