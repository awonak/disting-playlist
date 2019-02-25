import { ipcRenderer } from "electron";
import log from "electron-log";

const form = document.querySelector("form");

// Submit the new playlist item.
form.addEventListener("submit", (e: any) => {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    log.debug("submit: " + name);
    ipcRenderer.send("playlist:submit", name);
});
