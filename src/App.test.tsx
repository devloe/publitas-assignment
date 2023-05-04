import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Slider', () => {
  it('renders without errors', () => {
    render(<App/>);
  });
});