import { render, fireEvent, screen } from '@testing-library/react';
import ChannelForm from '@/Components/ChannelForm';

test('validates and submits the form', async () => {
    const handleSubmit = jest.fn();

    render(<ChannelForm initialValues={{ name: '', client_count: '' }} onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/Nazwa kanału/i), { target: { value: 'Test Channel' } });
    fireEvent.change(screen.getByLabelText(/Liczba klientów/i), { target: { value: '10' } });

    fireEvent.click(screen.getByText(/Zapisz/i));

    expect(handleSubmit).toHaveBeenCalledWith({ name: 'Test Channel', client_count: '10' });
});
