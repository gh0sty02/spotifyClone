import { ChevronDownIcon } from "@heroicons/react/outline";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState, playListIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "../components/Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center = () => {
  const { data: session, status } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playListIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    async function getPlaylists() {
      // const session = await getSession();

      spotifyApi.setAccessToken(session.user.accessToken);
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => console.log(err));
    }
    getPlaylists();
  }, [spotifyApi, playlistId]);

  return (
    <div className=" flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
          onClick={signOut}
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt={session?.user.name}
          />
          <h1>{session?.user.name}</h1>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0].url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
