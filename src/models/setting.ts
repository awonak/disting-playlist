
export class Setting {
    private element: HTMLInputElement;
    private name: string;
    private value: any;

    constructor(name: string) {
        this.name = name;
        this.element = document.getElementById(name) as HTMLInputElement;
    }

    public getName() {
        return this.name;
    }

    public getElement(): HTMLInputElement {
        return this.element;
    }

    public setValue(value: any): void {
        this.value = value;
    }

    public getValue(): any {
        return this.value;
    }

    public render(d: Setting): void {
        if (this.element.parentElement) {
            if (this.value) {
                this.element.value = this.value;
                this.element.parentElement.classList.remove("default");
                this.element.parentElement.classList.add("actual");
            } else if (d.value) {
                this.element.value = d.value;
                this.element.parentElement.classList.remove("actual");
                this.element.parentElement.classList.add("default");
            } else {
                this.element.value = null;
                this.element.parentElement.classList.remove("default");
                this.element.parentElement.classList.remove("actual");
            }
        }
    }
}
