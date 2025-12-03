import { render, screen } from '@testing-library/react';
import EVScanner from '../components/EVScanner';

test('renders scanner filters', () => {
  render(<EVScanner />);
  expect(screen.getByText(/Edge %/i)).toBeInTheDocument();
});
