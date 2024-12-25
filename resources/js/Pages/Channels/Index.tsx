import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Channel, ChannelList} from "@/types";
import PieChart from "@/Components/PieChart";
import {router} from "@inertiajs/react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Index({channels}: { channels: ChannelList }) {
    return (
        <div className="p-8">
            {channels.length === 0
                ? <></>
                : (
                    <div className="w-full max-w-md mx-auto mt-6">
                        <PieChart channels={channels}/>
                    </div>
                )
            }

            <div className="overflow-x-auto relative sm:rounded-lg">
                <button
                    onClick={() => router.visit('/channels/create')}
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 mb-4"
                >
                    Dodaj nowy kanał
                </button>

                {channels.length === 0 ? (
                    <div className="text-gray-700 text-center py-6">
                        Brak dostępnych kanałów pozyskania klienta. Aby uzyskać listę oraz wykres, dodaj nowy kanał.
                    </div>
                ) : (
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Kanał</th>
                            <th scope="col" className="px-6 py-3">Liczba klientów</th>
                            <th scope="col" className="px-6 py-3">Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {channels.map((channel: Channel) => (
                            <tr key={channel.id} className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-gray-900">{channel.name}</td>
                                <td className="px-6 py-4">{channel.client_count}</td>
                                <td className="px-6 py-4 space-x-1">
                                    <button
                                        onClick={() => router.visit(`/channels/${channel.id}/edit`)}
                                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5"
                                    >
                                        Edytuj
                                    </button>
                                    <button
                                        onClick={() => router.delete(`/channels/${channel.id}`)}
                                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-2"
                                    >
                                        Usuń
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
