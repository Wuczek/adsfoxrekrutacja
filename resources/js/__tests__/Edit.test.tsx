jest.mock('@inertiajs/react', () => ({
    router: {
        put: jest.fn(),
    },
}));

import { render, fireEvent, screen } from '@testing-library/react';
import Edit from '@/Pages/Channels/Edit';
import { router } from '@inertiajs/react';

test('renders edit page and updates channel', () => {
    const channel = { id: 1, name: 'Test Channel', client_count: 50 };

    render(<Edit channel={channel} />);

    expect(screen.getByDisplayValue(/Test Channel/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('50')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Nazwa kanału/i), { target: { value: 'Updated Channel' } });
    fireEvent.change(screen.getByLabelText(/Liczba klientów/i), { target: { value: '100' } });

    fireEvent.click(screen.getByText(/Zapisz/i));

    expect(router.put).toHaveBeenCalledWith('/channels/1', { name: 'Updated Channel', client_count: '100' }, { preserveScroll: true });
});
