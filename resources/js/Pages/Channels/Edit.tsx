import React from 'react';
import {router} from '@inertiajs/react';
import ChannelForm from "@/Components/ChannelForm";
import {Channel} from "@/types";
import ReturnToChannelsHomePageButton from "@/Components/ReturnToChannelsHomePageButton";

export default function Edit({channel}: { channel: Channel }) {
    async function handleSubmit(values: { name: string; client_count: string | number }) {
        try {
            router.put(`/channels/${channel.id}`, values, {preserveScroll: true});
        } catch (error) {
            console.error('Nie udało się zaktualizować kanału', error);
            throw error;
        }
    }

    return (
        <div className="p-8">
            <ReturnToChannelsHomePageButton/>
            <h1 className="text-2xl font-semibold mb-4">Edytuj kanał</h1>
            <ChannelForm initialValues={{name: channel.name, client_count: channel.client_count}}
                         onSubmit={handleSubmit}/>
        </div>
    );
}
