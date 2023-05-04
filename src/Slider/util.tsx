import {fabric} from "fabric";

export const images:string[] = [
    require('./img/0.jpg'),
    require('./img/1.jpg'),
    require('./img/2.jpg'),
    require('./img/3.jpg')
];

export class CanvasSlider {
    private instance?:fabric.Canvas;
    private readonly element:HTMLCanvasElement;
    private readonly images:string[];

    constructor(element:HTMLCanvasElement, images:string[]) {
        this.element = element;
        this.images = images;

        this.setupInstance();
    }

    private setupInstance() {
        this.instance = new fabric.Canvas(this.element, {
            selection: false,
            backgroundColor: "#f2f2f2"
        });
    }

    private setupEvents() {
        this.instance?.on('object:moving',(event) => {
            let target = this.instance?.getActiveObject();

            if(target && target.left && target.width) {
                if(target.left > 0) {
                    target.left = 0;
                }else if(target.width && this.instance?.width && target.left < -(target.width - this.instance?.width)) {
                    target.left = -(target.width - this.instance?.width);
                }
            }
        });
    }

    private createImage(src: string, index: number): Promise<fabric.Object> {
        return new Promise<fabric.Object>((resolve, reject) => {
                fabric.Image.fromURL(src, (img:fabric.Image) => {
                    if(!img.width || !img.height || !this.instance?.width || !this.instance?.height) return;

                    const boxPosition = (index * this.instance?.width) + index;

                    // Calculate image x/y center position
                    const imgTop = (this.instance?.height / 2) - (img.height / 2);
                    const imgLeft = (this.instance?.width / 2) - (img.width / 2);

                    img.set({
                        left: imgLeft,
                        top: imgTop,
                        selectable: false,
                        evented: false,
                        originY: "top",
                        originX: "left"
                    });

                    // We create a placeholder box to see the boundaries of the image
                    // In case of debugging, fill it with a color
                    const bg = new fabric.Rect({
                        width: this.instance?.width,
                        height: this.instance?.height,
                        fill: 'transparent',
                        selectable: false,
                        originX: 'left',
                        originY: 'top',
                        top: 0,
                        left: 0
                    });

                    const box = new fabric.Group([bg, img], {
                        width: this.instance?.width,
                        height: this.instance?.height,
                        originX: 'left',
                        originY: 'top',
                        left: boxPosition,
                        top: 0,
                        selectable: false,
                        fill: 'transparent',
                    });

                    resolve(box);
                }, { crossOrigin: 'anonymous' });
            });
    }

    private createGroup(objects: fabric.Object[]): fabric.Group {
        const group = new fabric.Group(objects, {
            originX: 'left',
            originY: 'top',
            selectable: true,
            lockMovementY: true,
            moveCursor: "grabbing",
            hoverCursor: "grab"
        });

        this.instance?.add(group);

        return group;
    }

    public async render() {
        const imagePromises = this.images.map((src, index) => this.createImage(src, index));
        const imageObjects = await Promise.all(imagePromises);
        const group = this.createGroup(imageObjects);
        group.hasControls = false;

        this.instance?.renderAll();
    }

    public destroy() {
        this.instance?.dispose();
    }
}