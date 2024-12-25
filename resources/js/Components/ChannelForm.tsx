import React, {useState} from 'react';

interface ChannelFormProps {
    initialValues: { name: string; client_count: number | string };
    onSubmit: (values: { name: string; client_count: number | string }) => Promise<void>;
}

export default function ChannelForm({initialValues, onSubmit}: ChannelFormProps) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<{ name?: string; client_count?: string }>({});

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {id, value} = e.target;
        setValues({...values, [id]: value});
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const newErrors: typeof errors = {};
        if (!values.name) newErrors.name = 'Nazwa kanału jest obowiązkowa';
        if (!values.client_count || isNaN(Number(values.client_count)) || Number(values.client_count) < 0) {
            newErrors.client_count = 'Liczba klientów musi być dodatnia!';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        try {
            await onSubmit(values);
        } catch (error: any) {
            setErrors({name: 'Błąd przy zapisywaniu danych. Proszę spróbować ponownie.'});
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Nazwa kanału</label>
                <input
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
                <label htmlFor="client_count" className="block mb-2 text-sm font-medium text-gray-700">Liczba
                    klientów</label>
                <input
                    id="client_count"
                    value={values.client_count}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                />
                {errors.client_count && <p className="text-red-500 text-sm">{errors.client_count}</p>}
            </div>
            <button
                type="submit"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Zapisz
            </button>
        </form>
    );
}
