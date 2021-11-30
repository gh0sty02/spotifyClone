import { SwitchHorizontalIcon, VolumeOffIcon } from "@heroicons/react/outline";
import {
  ReplyIcon,
  FastForwardIcon,
  RewindIcon,
  PauseIcon,
  PlayIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";
import { getSession, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import spotifyApi from "../lib/spotify";
import useSongInfo from "../lib/useSongInfo";

const Player = () => {
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const handlePlayPause = async () => {
    const session = await getSession();

    spotifyApi.setAccessToken(session.user.accessToken);

    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        setIsPlaying(false);
        spotifyApi.pause();
      } else {
        setIsPlaying(true);
        spotifyApi.play();
      }
    });
  };

  const fetchCurrentSong = async () => {
    if (!songInfo) {
      const session = await getSession();
      spotifyApi.setAccessToken(session.user.accessToken);
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
    if (!currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackState, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {
        throw new Error(err.message);
      });
    }, 500),
    []
  );

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0].url}
          alt=""
        />
        {songInfo && (
          <div>
            <h3>{songInfo.name}</h3>
            <p>{songInfo.artists[0].name}</p>
          </div>
        )}
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
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeOffIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button"
        />
        <input
          className="w-14 md:w-28"
          type="range"
          min={0}
          value={volume}
          max={100}
          name=""
          id=""
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button"
        />
      </div>
    </div>
  );
};

export default Player;
