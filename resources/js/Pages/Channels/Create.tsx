import React from 'react';
import {router} from '@inertiajs/react';
import ChannelForm from "@/Components/ChannelForm";
import ReturnToChannelsHomePageButton from "@/Components/ReturnToChannelsHomePageButton";

export default function Create() {
    async function handleSubmit(values: { name: string; client_count: string | number }) {
        try {
            router.post('/channels', values, {preserveScroll: true});
        } catch (error) {
            console.error('Nie udało się utworzyć nowego kanału', error);
            throw error;
        }
    }

    return (
        <div className="p-8">
            <ReturnToChannelsHomePageButton/>
            <h1 className="text-2xl font-semibold mb-4">Stwórz nowy kanał</h1>
            <ChannelForm initialValues={{name: '', client_count: ''}} onSubmit={handleSubmit}/>
        </div>
    );
}
