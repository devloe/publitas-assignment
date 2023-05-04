import { fabric } from 'fabric';
import { CanvasSlider, images } from './util';

describe('CanvasSlider', () => {
    let canvasElement: HTMLCanvasElement;
    let canvasSlider: CanvasSlider;

    beforeEach(() => {
        // Setup canvas element and images before each test
        canvasElement = document.createElement('canvas');

        canvasSlider = new CanvasSlider(canvasElement, images);
    });

    afterEach(() => {
        // Cleanup canvasSlider instance after each test
        canvasSlider.destroy();
    });

    it('should setup fabric.Canvas instance', () => {
        expect(canvasSlider['instance']).toBeInstanceOf(fabric.Canvas);
    });
});