import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatHistory from '../src/components/ChatHistory';

describe('ChatHistory', () => {
  beforeEach(() => {
    localStorage.setItem('chatHistory', JSON.stringify([{ id: 1, title: 'Hello' }]));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('loads history from localStorage', () => {
    render(<ChatHistory />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('deletes a history item', async () => {
    const user = userEvent.setup();
    render(<ChatHistory />);
    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(screen.queryByText('Hello')).toBeNull();
    const stored = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    expect(stored).toHaveLength(0);
  });
});
