import React, { useContext, useMemo, useState } from "react";
import { Nullable, Song } from "../types";
import { Songs } from "../assets/songs";

interface PlayerProviderProps {
  children: React.ReactNode;
}

interface PlayerContextSong {
  id: string;
  index: number;
  details: Song;
}

interface PlayerContextProps {
  song: Nullable<PlayerContextSong>;
  setSong: React.Dispatch<React.SetStateAction<Nullable<string>>>;
}

const PlayerContext = React.createContext({} as PlayerContextProps);

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [songId, setSong] = useState<Nullable<string>>(null);

  const songIndex = useMemo(() => {
    if (!songId) return -1;
    const songIndex = Songs.findIndex((s) => s.id === songId);
    return songIndex
  }, [songId]);

  return (
    <PlayerContext.Provider value={{ song: songIndex === -1 ? null : {
      id: songId!,
      index: songIndex,
      details: Songs[songIndex],
    }, setSong }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const playerContext = useContext(PlayerContext);

  return playerContext;
};
