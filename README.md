# Mini Spotify Clone

![image](https://user-images.githubusercontent.com/78202013/144171294-775a22b2-755d-4ba1-bbb1-0221f7bcee2e.png)

Spotify is a Music Streaming platform. The clone tries to imitate the functions and working of the original app but has some limitations set up by the Spotify Web API itself. It uses Next.js combined with Typescript and Tailwind CSS. Also Recoil.js is used for app wide state management. The App supports features such as Streaming songs from any Playlist, Play/Pause the song and Increase/Decrease the Volume. The feature of skipping the Song is not implemented as Spotify API has some bug regarding the feature.

## Note : 
To Stream Songs, the API requires the User to be a Premium User. Also The clone acts as an extension to the Original App, so it requires a device which is already streaming the songs, so it can function. The Api doesn't allow to fetch or play/pause songs if there is no device which is actively streaming the song.

## Installation

Make Sure that you have [Node](https://nodejs.org/en/download/) Installed.

```bash
gh repo clone gh0sty02/spotifyClone

```

## Usage

```javascript
cd spotifyClone
npm install
npm run dev
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
