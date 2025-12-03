import { render, screen, fireEvent } from '@testing-library/react';
import LogModal from './LogModal';

test('renders modal and blocks empty stake', () => {
  const onClose = jest.fn();
  render(<LogModal show={true} onClose={onClose} market="Test Market" />);
  fireEvent.click(screen.getByText("✅ Save"));
  expect(screen.getByText("Stake is required.")).toBeInTheDocument();
});
