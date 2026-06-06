export type ListeningToken = {
  word: string;
  type: string;
  difficulty: number;
  translation?: string;
};

export type ListeningSegment = {
  segment_id: number;
  audio_timestamp_start: number;
  audio_timestamp_end: number;
  text: string;
  tokens: ListeningToken[];
};

export type ListeningLessonMetadata = {
  title: string;
  audio: string;
  transcript: string;
  segments: ListeningSegment[];
};

export type BlankTokenRef = {
  key: string;
  segmentId: number;
  tokenIndex: number;
  word: string;
};
