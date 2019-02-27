import { PlaylistItem } from "./playlistItem";

export class Playlist {
    private element: HTMLElement;
    private items: PlaylistItem[];

    constructor() {
        this.element = document.getElementById("playlist");
        this.items = [];
    }

    public addItem(item: PlaylistItem): void {
        this.items.push(item);
        this.renderItem(item);
    }

    public getItem(name: string): PlaylistItem {
        let playlistItem: PlaylistItem = null;
        this.items.forEach((item) => {
            if (item.getName() === name) {
                playlistItem = item;
            }
        });
        return playlistItem;
    }

    public getItems(): PlaylistItem[] {
        return this.items;
    }

    public selectItem(name: string): PlaylistItem {
        for (const item of this.element.children as any) {
            (item.getAttribute("name") === name)
                ? item.classList.add("active")
                : item.classList.remove("active");
        }
        const playlistItem = this.getItem(name);
        playlistItem.render();
        return playlistItem;
    }

    public serialize(): string {
        const buffer: string[] = [];
        this.items.forEach((item) => {
            buffer.push("disting playlist v1\n");
            buffer.push(item.serialize());
        });
        return buffer.join("");
    }

    private renderItem(item: PlaylistItem): void {
        this.element.appendChild(item.getElement());
    }

}
