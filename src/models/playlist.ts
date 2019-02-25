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

    public clear() {
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
    }

    private renderItem(item: PlaylistItem): void {
        this.element.appendChild(item.getElement());
    }

}
