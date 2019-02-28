# Disting mk4 SD Card Playlist Manager

Desktop application for creating audio playlists for the [Expert Sleepers Disting mk4](http://www.expert-sleepers.co.uk/disting.html) v4.10.

With the Playlist Manager you can create playlist folders and add samples to that playlist. Each playlist has default settings that will be applied to all samples within that playlist. When a playlist is complete, the contents can be written to your SD card for use with the Disting mk4.

*NOTE This tool is still in development and may be broken*

TODO:
- Load existing SD card into Playlist Manager
- Additional sample specific validations
- Improve settings form field inputs
- Support for MIDI files
- Support for Wavetable files
- Create binary versioned releases for direct download

![Screenshot 1](/images/screenshot01.png "Screenshot 1")

![Screenshot 2](/images/screenshot02.png "Screenshot 2")


## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/awonak/disting-playlist
# Go into the repository
cd disting-playlist
# Install dependencies
npm install
# Run the app
npm start
```

## License

[Apache License 2.0](LICENSE.md)
