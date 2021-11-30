import { SwitchHorizontalIcon } from "@heroicons/react/outline";
import {
  ReplyIcon,
  FastForwardIcon,
  RewindIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/solid";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import spotifyApi from "../lib/spotify";
import useSongInfo from "../lib/useSongInfo";

const Player = () => {
  const SpotifyApi = useSpotify();
  const { data: session, status } = useSession();

  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  console.log(songInfo);

  const handlePlayPause = async () => {
    console.log(spotifyApi);
    const session = await getSession();

    spotifyApi.setAccessToken(session.user.accessToken);

    spotifyApi.getMyCurrentPlaybackState().then((data) => console.log(data));
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now Playing", data.body?.item);
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0].url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artist?.[0]?.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />

        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
        )}
        <FastForwardIcon className="button" />

        <ReplyIcon className="button" />
      </div>
    </div>
  );
};

export default Player;
