import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {ChannelList, Channel, PieData} from "@/types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    channels: ChannelList
}

export default function PieChart({channels}: PieChartProps) {
    const pieData: PieData = {
        labels: channels.map((channel: Channel) => channel.name),
        datasets: [{
            label: 'Klienci',
            data: channels.map((channel: Channel) => channel.client_count),
            // TODO Change static colors to random ones
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
            hoverOffset: 4
        }]
    };

    return <Pie data={pieData}/>;
}
