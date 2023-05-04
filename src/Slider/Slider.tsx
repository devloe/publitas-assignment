import React, {useRef, useEffect} from 'react';
import styles from "./slider.module.css";
import {CanvasSlider, images} from "./util";

const Slider: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if(canvasRef.current) {
            const canvasSlider = new CanvasSlider(canvasRef.current, images);
            canvasSlider.render();

            return () => {
                canvasSlider.destroy();
            };
        }
    }, []);

    return (
        <section className={styles['container']}>
            <canvas data-testid="slider-canvas" ref={canvasRef} width={640} height={400}></canvas>
            <aside className={styles['caption']}>Drag to change image</aside>
        </section>
    );
};

export {Slider};