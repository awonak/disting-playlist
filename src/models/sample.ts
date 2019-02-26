import { DEFAULT_NAME } from "./sampleList";
import { Settings } from "./settings";

export class Sample {
    private element: HTMLElement;
    private audio: HTMLAudioElement;
    private name: string;
    private filepath: string;
    private settings: Settings;

    constructor(filepath: string) {
        this.name = filepath.split("/").pop();
        this.filepath = filepath;
        this.createElement();
        this.settings = new Settings();
    }

    public getName() {
        return this.name;
    }

    public getElement() {
        return this.element;
    }

    public getSetting(name: string) {
        this.settings.getSetting(name);
    }

    public getSettings() {
        return this.settings;
    }

    public renderSettings(d: Settings) {
        this.settings.render(d);
    }

    public updateSetting(name: string, value: any) {
        const setting = this.settings.getSetting(name);
        setting.setValue(value);
    }

    public togglePlay() {
        if (this.audio) {
            this.audio.currentTime = 0;
            (this.audio.paused) ? this.audio.play() : this.audio.pause();
        }
    }

    public stop() {
        if (this.audio) {
            this.audio.pause();
        }
    }

    public serialize(): string {
        const buffer: string[] = [];
        if (this.name !== DEFAULT_NAME) {
            buffer.push(this.name + "\n");
        }
        buffer.push(this.settings.serialize());
        return buffer.join("");
    }

    private createElement() {
        const li = document.createElement("li");
        const itemText = document.createTextNode(this.name);
        li.classList.add("collection-item");
        li.classList.add("waves-effect");
        li.setAttribute("name", this.name);
        if (this.name !== DEFAULT_NAME) {
            this.audio = document.createElement("audio");
            const source = document.createElement("source");
            source.setAttribute("src", this.filepath);
            source.setAttribute("type", "audio/wav");
            this.audio.appendChild(source);
            li.appendChild(this.audio);
        }
        li.appendChild(itemText);
        this.element = li;
    }
}
