"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import WaveSurfer from "wavesurfer.js";
import Hover from "wavesurfer.js/dist/plugins/hover.js";

import { renderAsymmetricWaveform } from "@/views/listening/lib/render-asymmetric-waveform";

const PROGRESS_COLOR = "#f97316";
const CURSOR_COLOR = "#ea580c";
const HOVER_LINE_COLOR = "#fb923c";

export type ListeningAudioPlayerHandle = {
  playFrom: (seconds: number) => void;
};

type ListeningAudioPlayerProps = {
  src: string;
  onPause?: () => void;
  onFinish?: () => void;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export const ListeningAudioPlayer = forwardRef<
  ListeningAudioPlayerHandle,
  ListeningAudioPlayerProps
>(function ListeningAudioPlayer({ src, onPause, onFinish }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const onPauseRef = useRef(onPause);
  const onFinishRef = useRef(onFinish);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  onPauseRef.current = onPause;
  onFinishRef.current = onFinish;

  useImperativeHandle(ref, () => ({
    playFrom(seconds: number) {
      const wavesurfer = wavesurferRef.current;
      if (!wavesurfer) return;

      wavesurfer.setTime(seconds);
      void wavesurfer.play();
    },
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wavesurfer = WaveSurfer.create({
      container,
      url: src,
      height: 72,
      normalize: true,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      cursorWidth: 2,
      waveColor: "#c7d2fe",
      progressColor: PROGRESS_COLOR,
      cursorColor: CURSOR_COLOR,
      interact: true,
      renderFunction: renderAsymmetricWaveform,
      plugins: [
        Hover.create({
          lineColor: HOVER_LINE_COLOR,
          lineWidth: 2,
          labelColor: "#ffffff",
          labelBackground: CURSOR_COLOR,
          labelSize: 12,
          formatTimeCallback: formatTime,
        }),
      ],
    });

    wavesurferRef.current = wavesurfer;

    wavesurfer.on("ready", () => {
      setIsReady(true);
      setDuration(wavesurfer.getDuration());
    });

    wavesurfer.on("play", () => setIsPlaying(true));
    wavesurfer.on("pause", () => {
      setIsPlaying(false);
      onPauseRef.current?.();
    });

    wavesurfer.on("finish", () => {
      setIsPlaying(false);
      onFinishRef.current?.();
    });

    wavesurfer.on("timeupdate", (time) => {
      setCurrentTime(time);
    });

    return () => {
      wavesurfer.destroy();
      wavesurferRef.current = null;
      setIsReady(false);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    };
  }, [src]);

  function togglePlayback() {
    const wavesurfer = wavesurferRef.current;
    if (!wavesurfer || !isReady) return;

    void wavesurfer.playPause();
  }

  return (
    <div className="listening-audio-player">
      <div className="listening-audio-player__toolbar">
        <button
          type="button"
          className="listening-audio-player__play"
          onClick={togglePlayback}
          disabled={!isReady}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          <i className={`ph-${isPlaying ? "fill" : "bold"} ph-${isPlaying ? "pause" : "play"}`}></i>
        </button>

        <div className="listening-audio-player__time" aria-live="off">
          <span>{formatTime(currentTime)}</span>
          <span className="listening-audio-player__time-sep">/</span>
          <span>{formatTime(duration)}</span>
        </div>

        {!isReady ? (
          <span className="listening-audio-player__loading text-sm text-neutral-500">
            Loading waveform…
          </span>
        ) : null}
      </div>

      <div
        ref={containerRef}
        className={`listening-audio-player__waveform${isReady ? " listening-audio-player__waveform--ready" : ""}`}
        aria-hidden={!isReady}
      />
    </div>
  );
});
