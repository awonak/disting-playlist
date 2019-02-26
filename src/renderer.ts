import { ipcRenderer } from "electron";

import { Playlist } from "./models/playlist";
import { PlaylistItem } from "./models/playlistItem";
import { Sample } from "./models/sample";


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
