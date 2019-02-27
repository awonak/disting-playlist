import { Sample } from "./sample";
export const DEFAULT_NAME = "Playlist Default Sample Settings";

export class SampleList {
    private element: HTMLElement;
    private samples: Sample[];

    constructor() {
        this.element = document.getElementById("samples");
        this.samples = [new Sample(DEFAULT_NAME)];
    }

    public addSample(sample: Sample): void {
        this.samples.push(sample);
        this.renderItem(sample);
    }

    public getSample(name: string): Sample {
        let sample: Sample = null;
        this.samples.forEach((item) => {
            if (item.getName() === name) {
                sample = item;
            }
        });
        return sample;
    }

    public getSamples(): Sample[] {
        return this.samples;
    }

    public deselectSample(): void {
        this.samples.forEach((sample) => {
            sample.stop();
            sample.getElement().classList.remove("active");
        });
    }

    public selectSample(name: string): Sample {
        const sample = this.getSample(name);
        this.deselectSample();
        sample.togglePlay();
        sample.getElement().classList.add("active");
        sample.renderSettings(this.getSample(DEFAULT_NAME).getSettings());
        return sample;
    }

    public clear(): void {
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
    }

    public renderItem(sample: Sample): void {
        this.element.appendChild(sample.getElement());
    }

    public render(): void {
        this.clear();
        this.samples.forEach((sample) => this.renderItem(sample));
    }

    public serialize(): string {
        const buffer: string[] = [];
        this.samples.forEach((sample) => {
            buffer.push(sample.serialize());
        });
        return buffer.join("");
    }
}
