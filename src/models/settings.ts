import { Setting } from "./setting";

export class Settings {
    private element: HTMLElement;
    private settings: Setting[];

    constructor() {
        this.element = document.getElementById("settings");
        this.settings = [
            new Setting("loop"),
            new Setting("fadeIn"),
            new Setting("fadeOut"),
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
}
