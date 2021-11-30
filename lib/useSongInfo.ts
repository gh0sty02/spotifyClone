import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";

const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState);

  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => setSongInfo(data));

        setSongInfo(trackInfo);
        console.log(songInfo);
        fetchSongInfo();
      }
    };
  }, [currentTrackId, spotifyApi]);

  return songInfo;
};

export default useSongInfo;
