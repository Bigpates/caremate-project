import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RoleSelectionModal from '../src/components/RoleSelectionModal';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    AnimatePresence: ({ children }) => <div>{children}</div>,
    motion: {
      div: React.forwardRef((props, ref) => <div ref={ref} {...props} />),
    },
  };
});

describe('RoleSelectionModal', () => {
  afterEach(() => {
    pushMock.mockClear();
  });

  it('does not render when closed', () => {
    render(<RoleSelectionModal isOpen={false} onClose={() => {}} />);
    expect(screen.queryByText(/how can i help you today/i)).toBeNull();
  });

  it('shows role options when open', () => {
    render(<RoleSelectionModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByText(/how can i help you today/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /participant/i })).toBeInTheDocument();
  });

  it('allows selecting a role and goal', async () => {
    const user = userEvent.setup();
    render(<RoleSelectionModal isOpen={true} onClose={() => {}} />);

    await user.click(screen.getByRole('button', { name: /participant/i }));
    expect(screen.getByText(/what is your primary goal today/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /understand my plan/i }));

    const expected = (() => {
      const role = 'Participant';
      const goal = 'Understand my plan';
      const prompt = "I'm a participant and I'd like some help understanding my NDIS plan.";
      const roleQuery = encodeURIComponent(role);
      const goalQuery = encodeURIComponent(goal);
      const promptQuery = encodeURIComponent(prompt);
      return `/chat?role=${roleQuery}&goal=${goalQuery}&prompt=${promptQuery}`;
    })();

    expect(pushMock).toHaveBeenCalledWith(expected);
  });
});
