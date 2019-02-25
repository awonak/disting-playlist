import {Sample} from "./sample";
export const DEFAULT_NAME = "Playlist Default Sample Settings";

export class SampleList {
    private element: HTMLElement;
    private samples: Sample[];

    constructor() {
        this.element = document.getElementById("samples");
        this.samples = [new Sample(DEFAULT_NAME)];
    }

    public addSample(sample: Sample) {
        this.samples.push(sample);
        this.renderItem(sample);
    }

    public getSample(name: string) {
        let sample: Sample = null;
        this.samples.forEach((item) => {
            if (item.getName() === name) {
                sample = item;
            }
        });
        return sample;
    }

    public deselectSample() {
        this.samples.forEach((sample) => {
            sample.stop();
            sample.getElement().classList.remove("active");
        });
    }

    public selectSample(name: string) {
        const sample = this.getSample(name);
        this.deselectSample();
        sample.play();
        sample.getElement().classList.add("active");
        sample.renderSettings(this.getSample(DEFAULT_NAME).getSettings());
        return sample;
    }

    public clear() {
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
    }

    public renderItem(sample: Sample): void {
        this.element.appendChild(sample.getElement());
    }

    public render() {
        this.clear();
        this.samples.forEach((sample) => this.renderItem(sample));
    }
}
