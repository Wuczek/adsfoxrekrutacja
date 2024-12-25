jest.mock('@inertiajs/react', () => ({
    router: {
        visit: jest.fn(),
    },
}));

import { render, fireEvent, screen } from '@testing-library/react';
import Index from '@/Pages/Channels/Index';
import { router } from '@inertiajs/react';

test('renders channel list and handles navigation', () => {
    const channels = [
        { id: 1, name: 'Facebook Ads', client_count: 300 },
        { id: 2, name: 'Google Ads', client_count: 200 },
    ];

    render(<Index channels={channels} />);

    expect(screen.getByText(/Facebook Ads/i)).toBeInTheDocument();
    expect(screen.getByText(/Google Ads/i)).toBeInTheDocument();

    const addButton = screen.getByText(/Dodaj nowy kanał/i);
    fireEvent.click(addButton);

    expect(router.visit).toHaveBeenCalledWith('/channels/create');
});
