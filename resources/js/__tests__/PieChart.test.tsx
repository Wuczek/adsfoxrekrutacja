import { render, screen } from '@testing-library/react';
import PieChart from '@/Components/PieChart';

test('renders PieChart component', () => {
    const channels = [
        { id: 1, name: 'Facebook Ads', client_count: 300 },
        { id: 2, name: 'Google Ads', client_count: 200 },
    ];

    render(<PieChart channels={channels} />);

    const canvas = screen.getByRole('img');
    expect(canvas).toBeInTheDocument();
});
