import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="px-8 text-white flex flex-col space-y-1 pb-28">
      {playlist &&
        playlist?.tracks.items.map((track, i) => (
          <Song key={track.track.id} track={track} order={i + 1} />
        ))}
    </div>
  );
};

export default Songs;
