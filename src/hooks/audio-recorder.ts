import { useEffect, useRef, useState } from "react";
import RecordRTC, { State, StereoAudioRecorder } from "recordrtc";

const useAudioRecorder = () => {
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingStatus, setRecordingStatus] = useState<State>();

  const intervalRef = useRef<any>(null);
  const recorderRef = useRef<any>(null);

  const startRecording = (callBack?: () => void) => {
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
        callBack?.();
      })
      .catch((error) => {
        alert("Unable to access your microphone.");
        console.error(error);
      });
  };

  const stopRecording = (callBack?: () => void) => {
    recorderRef.current?.stopRecording(() => {
      recorderRef.current.microphone.stop();
      setRecordingStatus("stopped");
      setRecordingTime(0);
      callBack?.();
    });
  };

  const pauseRecording = (callBack?: () => void) => {
    recorderRef.current?.pauseRecording();
    setRecordingStatus("paused");
    callBack?.();
  };

  const resumeRecording = (callBack?: () => void) => {
    recorderRef.current?.resumeRecording();
    setRecordingStatus("recording");
    callBack?.();
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
