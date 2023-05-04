import React from 'react';
import { render, screen } from '@testing-library/react';
import {Slider} from './Slider';

describe('Slider', () => {
    it('renders without errors', () => {
        render(<Slider />);
    });

    it('displays the canvas correctly', () => {
        const { getByTestId } = render(<Slider />);
        const canvasElement = screen.getByTestId('slider-canvas');
        expect(canvasElement).toBeInTheDocument();
    });

    it('displays the "Drag to change image" message correctly', () => {
        const { getByText } = render(<Slider />);
        const messageElement = screen.getByText('Drag to change image');
        expect(messageElement).toBeInTheDocument();
    });
});