import { Setting } from "./setting";

export class Settings {
    private element: HTMLElement;
    private settings: Setting[];

    constructor() {
        this.element = document.getElementById("settings");
        this.settings = [
            new Setting("loop"),
            new Setting("fadeOut"),
            new Setting("fadeIn"),
            new Setting("gap"),
            new Setting("retriggerOnSampleChange"),
            new Setting("fixedPitch"),
            new Setting("ramp"),
            new Setting("triggers"),
            new Setting("clocks"),
            new Setting("wavelength"),
            new Setting("natural"),
            new Setting("switch"),
            new Setting("playToCompletion"),
            new Setting("useStartOnSampleChange"),
        ];
    }

    public getSetting(name: string) {
        let setting: Setting = null;
        this.settings.forEach((item) => {
            if (item.getName() === name) {
                setting = item;
            }
        });
        return setting;
    }

    public renderItem(setting: Setting, d: Setting) {
        setting.render(d);
    }

    public render(d: Settings) {
        this.settings.forEach((setting) =>
            this.renderItem(setting, d.getSetting(setting.getName())));
    }

    public serialize(): string {
        const buffer: string[] = [];
        this.settings.forEach((setting) => {
            if (setting.getValue()) {
                buffer.push(setting.serialize());
            }
        });
        return buffer.join("");
    }
}
