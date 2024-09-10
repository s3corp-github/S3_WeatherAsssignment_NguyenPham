import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MessageError from './MessageError';

describe('MessageError', () => {
  it('should render the error message when message is provided', () => {
    const message = 'This is an error';
    render(<MessageError message={message} />);

    const errorElement = screen.getByText(message);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('message-error');
  });

  it('should not render anything when message is not provided', () => {
    render(<MessageError message="" />);

    const errorElement = screen.queryByText(/.+/);
    expect(errorElement).not.toBeInTheDocument();
  });
});
