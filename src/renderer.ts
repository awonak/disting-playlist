import { ipcRenderer } from "electron";

import { Playlist } from "./models/playlist";
import { PlaylistItem } from "./models/playlistItem";
import { Sample } from "./models/sample";
import { DEFAULT_NAME } from "./models/sampleList";


const addPlaylistBtn = document.getElementById("addPlaylistBtn");
const addSamplestBtn = document.getElementById("addSamplestBtn");
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

// Add new Playlist Item.
addPlaylistBtn.addEventListener("click", (e: any) => {
    ipcRenderer.send("playlist:show");
});

// Add samples to playlist.
addSamplestBtn.addEventListener("click", (e: any) => {
    ipcRenderer.send("sample:dialog");
});

// Select Playlist Item.
playlistElement.addEventListener("click", (e: any) => {
    const name = e.target.getAttribute("name");
    selectPlaylist(name);
});

// Select Sample Item.
sampleListElement.addEventListener("click", (e: any) => {
    const name = e.target.getAttribute("name");
    activeSample = activePlaylistItem.selectSample(name);
    toggleSettings();
    const defaultSettings = activePlaylistItem.getSample(DEFAULT_NAME).getSettings();
    activeSample.renderSettings(defaultSettings);
});

// Update the settings value for the active sample.
settingsListElement.onchange = (e: any) => {
    activeSample.updateSetting(e.target.id, e.target.value);
};

// Received playlist name from add playlist modal.
ipcRenderer.on("playlist:add", (e: any, name: string) => {
    playlist.addItem(new PlaylistItem(name));
    selectPlaylist(name);
});

// Add samples selected from file dialog.
ipcRenderer.on("samples:add", (e: any, filepaths: string[]) => {
    filepaths.forEach((filepath) => {
        activePlaylistItem.addSample(new Sample(filepath));
    });
});
