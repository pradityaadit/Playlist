export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  cover: string;
  audioSrc: string;
  philosophy: string;
  year: number;
  lyrics: LyricLine[];
}

export interface LyricLine {
  time: number;
  text: string;
}
