<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChannelRequest;
use App\Models\Channel;
use App\Services\ChannelService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ChannelController extends Controller
{
    private ChannelService $channelService;

    public function __construct(ChannelService $channelService)
    {
        $this->channelService = $channelService;
    }

    public function index(): Response
    {
        return Inertia::render('Channels/Index', [
            'channels' => $this->channelService->getAllChannels()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Channels/Create');
    }

    public function store(ChannelRequest $channelRequest): RedirectResponse
    {
        $this->channelService->createChannel($channelRequest->validated());

        return Redirect::route('channels.index')->with('success', 'Channel created successfully.');
    }

    public function edit(): Response
    {
        return Inertia::render('Channels/Edit');
    }

    public function update(ChannelRequest $channelRequest, Channel $channel): RedirectResponse
    {
        $this->channelService->updateChannel($channel, $channelRequest->validated());

        return Redirect::route('channels.index')->with('success', 'Channel updated successfully.');
    }

    public function destroy(Channel $channel): RedirectResponse
    {
        $this->channelService->deleteChannel($channel);

        return Redirect::route('channels.index')->with('success', 'Channel deleted successfully.');
    }
}
