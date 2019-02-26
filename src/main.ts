import { app, BrowserWindow, dialog, ipcMain } from "electron";
import log from "electron-log";
import * as path from "path";

let mainWindow: Electron.BrowserWindow;
let playlistWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function createPlaylistWindow() {
  playlistWindow = new BrowserWindow({
    height: 200,
    width: 300,
  });
  playlistWindow.loadFile(path.join(__dirname, "../add_playlist.html"));
  playlistWindow.on("closed", () => {
    playlistWindow = null;
  });
}

// Handle show add playlist modal.
ipcMain.on("playlist:show", (e: any) => {
  createPlaylistWindow();
});

// Handle add playlist submit.
ipcMain.on("playlist:submit", (e: any, name: string) => {
  log.debug("receive submit: " + name);
  mainWindow.webContents.send("playlist:add", name);
  playlistWindow.close();
});

// Handle show add sample dialog.
ipcMain.on("sample:dialog", (e: any) => {
  const files: string[] = (dialog.showOpenDialog(mainWindow, {
    filters: [
      { name: "Audio", extensions: ["wav"] },
      { name: "All Files", extensions: ["*"] },
    ],
    properties: ["openFile", "multiSelections"],
  }));
  if (files) {
    mainWindow.webContents.send("samples:add", files);
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
