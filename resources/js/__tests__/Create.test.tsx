jest.mock('@inertiajs/react', () => ({
    router: {
        post: jest.fn(),
    },
}));

import { render, fireEvent, screen } from '@testing-library/react';
import Create from '@/Pages/Channels/Create';
import { router } from '@inertiajs/react';

test('renders create page and submits form', () => {
    render(<Create />);

    fireEvent.change(screen.getByLabelText(/Nazwa kanału/i), { target: { value: 'Test Channel' } });
    fireEvent.change(screen.getByLabelText(/Liczba klientów/i), { target: { value: '50' } });

    fireEvent.click(screen.getByText(/Zapisz/i));

    expect(router.post).toHaveBeenCalledWith('/channels', { name: 'Test Channel', client_count: '50' }, { preserveScroll: true });
});
