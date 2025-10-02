import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TokenCard from './TokenCard';

const mockToken = {
  id: '1',
  name: 'Carbon Credit Token #1',
  amount: 100,
  status: 'active',
  country: 'Uganda'
};

describe('TokenCard Component', () => {
  it('renders token information correctly', () => {
    render(
      <BrowserRouter>
        <TokenCard token={mockToken} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockToken.name)).toBeInTheDocument();
    expect(screen.getByText(`Amount: ${mockToken.amount}`)).toBeInTheDocument();
    expect(screen.getByText(`Status: ${mockToken.status}`)).toBeInTheDocument();
    expect(screen.getByText(`Country: ${mockToken.country}`)).toBeInTheDocument();
  });
});