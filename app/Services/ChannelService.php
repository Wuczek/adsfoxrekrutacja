<?php

namespace App\Services;

use App\Models\Channel;
use Illuminate\Database\Eloquent\Collection;

class ChannelService
{
    public function getAllChannels(): Collection
    {
        return Channel::all();
    }

    public function createChannel(array $data): Channel
    {
        return Channel::create($data);
    }

    public function updateChannel(Channel $channel, array $data): Channel
    {
        $channel->update($data);
        return $channel;
    }

    public function deleteChannel(Channel $channel): void
    {
        $channel->delete();
    }
}
