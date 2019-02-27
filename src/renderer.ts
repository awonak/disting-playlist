import { ipcRenderer } from "electron";
import log from "electron-log";
import * as fs from "fs";

import { Playlist } from "./models/playlist";
import { PlaylistItem } from "./models/playlistItem";
import { Sample } from "./models/sample";
import { DEFAULT_NAME } from "./models/sampleList";


const addPlaylistBtn = document.getElementById("addPlaylistBtn");
const addSamplestBtn = document.getElementById("addSamplestBtn");
const writeToSDCardBtn = document.getElementById("writeToSDCardBtn");
const playlistElement = document.getElementById("playlist");
const sampleListElement = document.getElementById("samples");
const settingsListElement = document.getElementById("settings");

const playlist = new Playlist();
let activePlaylistItem: PlaylistItem = null;
let activeSample: Sample = null;


// Disable Add Samples button on load until a playlist is selected.
function toggleAddSampleBtb() {
    (activePlaylistItem === null)
        ? addSamplestBtn.setAttribute("disabled", "")
        : addSamplestBtn.removeAttribute("disabled");
}

// Disable settings when no sample is selected.
function toggleSettings() {
    (activeSample === null)
        ? settingsListElement.setAttribute("hidden", "")
        : settingsListElement.removeAttribute("hidden");
}

// Select Playlist behavior.
function selectPlaylist(name: string) {
    activePlaylistItem = playlist.selectItem(name);
    activeSample = null;
    toggleAddSampleBtb();
    toggleSettings();
}

// Add new playlist item.
addPlaylistBtn.addEventListener("click", (e: any) => {
    ipcRenderer.send("playlist:show");
});

// Add samples to playlist.
addSamplestBtn.addEventListener("click", (e: any) => {
    ipcRenderer.send("sample:dialog");
});

// Select playlist item.
playlistElement.addEventListener("click", (e: any) => {
    const name = e.target.getAttribute("name");
    selectPlaylist(name);
});

// Select sample item.
sampleListElement.addEventListener("click", (e: any) => {
    const name = e.target.getAttribute("name");
    if (activeSample && activeSample.getName() === name) {
        // pause or play active sample.
        activeSample.togglePlay();
    } else {
        // select new active sample and render settings values.
        activeSample = activePlaylistItem.selectSample(name);
        activeSample.renderSettings(activePlaylistItem.getDefaultSettings());
        toggleSettings();
    }
});

// Update the settings value for the active sample.
settingsListElement.onchange = (e: any) => {
    activeSample.updateSetting(e.target.id, e.target.value);
    activeSample.renderSettings(activePlaylistItem.getDefaultSettings());
};

// Click Write to SD Card button.
writeToSDCardBtn.addEventListener("click", (e: any) => {
    ipcRenderer.send("write:dialog");
});

// Received playlist name from add playlist modal.
ipcRenderer.on("playlist:add", (e: any, name: string) => {
    playlist.addItem(new PlaylistItem(name));
    selectPlaylist(name);
});

// Add samples selected from file dialog.
ipcRenderer.on("samples:add", (e: any, filepaths: string[]) => {
    filepaths.forEach((filepath) => {
        // TODO: validate the filepath points to a .wav file.
        activePlaylistItem.addSample(new Sample(filepath));
    });
});

// Serialize the playlists and write to path specified along with each sample.
ipcRenderer.on("write:filesystem", (e: any, filepath: string) => {
    // Copy each sample to playlist folder
    playlist.getItems().forEach((item) => {
        const playlistPath = filepath + "/" + item.getName();
        fs.mkdir(playlistPath, (err: any) => {
            if (err) {
                throw err;
            }
        });
        // Write the playlist file to the playlist folder.
        const playlistFile = playlistPath + "/playlist.txt";
        fs.writeFile(playlistFile, playlist.serialize(), (err: any) => {
            if (err) {
                throw err;
            }
        });
        item.getSamples().forEach((sample) => {
            if (sample.getName() !== DEFAULT_NAME) {
                const dest = playlistPath + "/" + sample.getName();
                fs.copyFile(sample.getFilepath(), dest, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
        });
    });
});
