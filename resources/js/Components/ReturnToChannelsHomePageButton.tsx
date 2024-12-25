import {router} from "@inertiajs/react";
import React from "react";

export default function ReturnToChannelsHomePageButton() {
    return <button
        onClick={() => router.visit('/channels')}
        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 mb-4"
    >
        Powrót do listy kanałów
    </button>
}
