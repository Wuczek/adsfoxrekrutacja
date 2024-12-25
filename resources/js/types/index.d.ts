export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Channel {
    id: number;
    name: string;
    client_count: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface ChannelList extends Array<Channel> {
}

export interface PieData {
    labels: string[];
    datasets: {
        label: string
        data: number[]
        backgroundColor: string[]
        hoverOffset: number
    }[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
