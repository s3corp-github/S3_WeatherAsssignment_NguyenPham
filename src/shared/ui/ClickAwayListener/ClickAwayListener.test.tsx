import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ClickAwayListener from './ClickAwayListener';

describe('ClickAwayListener', () => {
  it('calls onClickOutside when clicking outside', () => {
    const handleClickOutside = jest.fn();

    const { getByText } = render(
      <div>
        <ClickAwayListener onClickOutside={handleClickOutside}>
          <div>Inside</div>
        </ClickAwayListener>
        <div>Outside</div>
      </div>
    );

    fireEvent.mouseDown(getByText('Outside'));

    expect(handleClickOutside).toHaveBeenCalledTimes(1);
  });

  it('does not call onClickOutside when clicking inside', () => {
    const handleClickOutside = jest.fn();

    const { getByText } = render(
      <ClickAwayListener onClickOutside={handleClickOutside}>
        <div>Inside</div>
      </ClickAwayListener>
    );

    fireEvent.mouseDown(getByText('Inside'));

    expect(handleClickOutside).not.toHaveBeenCalled();
  });
});
