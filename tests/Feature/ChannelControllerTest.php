<?php

namespace Tests\Feature;

use App\Models\Channel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class ChannelControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_channels(): void
    {
        $channels = Channel::factory()->count(3)->create();

        $response = $this->get(route('channels.index'));

        $response->assertOk()
            ->assertInertia(fn(AssertableInertia $page) => $page->component('Channels/Index')
                ->has('channels', 3)
                ->where('channels.0.name', $channels->first()->name));
    }

    public function test_create_renders_create_page(): void
    {
        $response = $this->get(route('channels.create'));

        $response->assertOk()
            ->assertInertia(fn(AssertableInertia $page) => $page->component('Channels/Create'));
    }

    public function test_store_creates_a_channel(): void
    {
        $data = ['name' => 'New Channel', 'client_count' => 10];

        $response = $this->post(route('channels.store'), $data);

        $response->assertRedirect(route('channels.index'))
            ->assertSessionHas('success', 'Channel created successfully.');

        $this->assertDatabaseHas('channels', $data);
    }

    public function test_edit_renders_edit_page_with_channel(): void
    {
        $channel = Channel::factory()->create();

        $response = $this->get(route('channels.edit', $channel));

        $response->assertOk()
            ->assertInertia(fn(AssertableInertia $page) => $page->component('Channels/Edit')
                ->where('channel.id', $channel->id)
                ->where('channel.name', $channel->name)
                ->where('channel.client_count', $channel->client_count));
    }

    public function test_update_updates_a_channel(): void
    {
        $channel = Channel::factory()->create();
        $data = ['name' => 'Updated Channel', 'client_count' => 20];

        $response = $this->put(route('channels.update', $channel), $data);

        $response->assertRedirect(route('channels.index'))
            ->assertSessionHas('success', 'Channel updated successfully.');

        $this->assertDatabaseHas('channels', $data);
    }

    public function test_destroy_deletes_a_channel(): void
    {
        $channel = Channel::factory()->create();

        $response = $this->delete(route('channels.destroy', $channel));

        $response->assertRedirect(route('channels.index'))
            ->assertSessionHas('success', 'Channel deleted successfully.');

        $this->assertDatabaseMissing('channels', ['id' => $channel->id]);
    }
}
