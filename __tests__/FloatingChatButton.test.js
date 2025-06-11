import { render, screen } from '@testing-library/react'
import FloatingChatButton from '../src/components/FloatingChatButton'

describe('FloatingChatButton', () => {
  it('renders without crashing', () => {
    render(<FloatingChatButton onClick={() => {}} />)
    const button = screen.getByRole('button', { name: /start conversation/i })
    expect(button).toBeInTheDocument()
  })
})
