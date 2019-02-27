import { Sample } from "./sample";
import { DEFAULT_NAME, SampleList } from "./sampleList";
import { Settings } from "./settings";

export class PlaylistItem {
    private element: HTMLElement;
    private name: string;
    private samples: SampleList;

    constructor(name: string) {
        this.name = name;
        this.samples = new SampleList();
        this.createElement();
    }

    public getName(): string {
        return this.name;
    }

    public getElement(): HTMLElement {
        return this.element;
    }

    public addSample(sample: Sample): void {
        this.samples.addSample(sample);
    }

    public getSample(name: string): Sample {
        return this.samples.getSample(name);
    }

    public getSamples(): Sample[] {
        return this.samples.getSamples();
    }

    public deselectSample(): void {
        return this.samples.deselectSample();
    }

    public selectSample(name: string): Sample {
        return this.samples.selectSample(name);
    }

    public getDefaultSettings(): Settings {
        return this.getSample(DEFAULT_NAME).getSettings();
    }

    public render(): void {
        this.deselectSample();
        this.samples.render();
    }

    public serialize(): string {
        return this.samples.serialize();
    }

    private createElement(): void {
        const li = document.createElement("li");
        const itemText = document.createTextNode(this.name);
        li.setAttribute("name", this.name);
        li.classList.add("collection-item");
        li.appendChild(itemText);
        this.element = li;
    }
}
