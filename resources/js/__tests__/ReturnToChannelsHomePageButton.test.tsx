jest.mock('@inertiajs/react', () => ({
    router: {
        visit: jest.fn(),
    },
}));

import { render, fireEvent, screen } from '@testing-library/react';
import ReturnToChannelsHomePageButton from '@/Components/ReturnToChannelsHomePageButton';
import { router } from '@inertiajs/react';

test('navigates to channels homepage', () => {
    const mockVisit = router.visit;

    render(<ReturnToChannelsHomePageButton />);

    const button = screen.getByText(/Powrót do listy kanałów/i);
    fireEvent.click(button);

    expect(mockVisit).toHaveBeenCalledWith('/channels');
});

