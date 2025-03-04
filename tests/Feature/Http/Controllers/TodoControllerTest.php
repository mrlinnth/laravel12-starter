<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Creator;
use App\Models\Todo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\TodoController
 */
final class TodoControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    #[Test]
    public function index_displays_view(): void
    {
        $todos = Todo::factory()->count(3)->create();

        $response = $this->get(route('todos.index'));

        $response->assertOk();
        $response->assertViewIs('todo.index');
        $response->assertViewHas('todos');
    }

    #[Test]
    public function create_displays_view(): void
    {
        $response = $this->get(route('todos.create'));

        $response->assertOk();
        $response->assertViewIs('todo.create');
    }

    #[Test]
    public function store_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\TodoController::class,
            'store',
            \App\Http\Requests\TodoStoreRequest::class
        );
    }

    #[Test]
    public function store_saves_and_redirects(): void
    {
        $title = fake()->sentence(4);
        $content = fake()->paragraphs(3, true);
        $creator = Creator::factory()->create();
        $status = fake()->randomElement(/** enum_attributes **/);

        $response = $this->post(route('todos.store'), [
            'title' => $title,
            'content' => $content,
            'creator_id' => $creator->id,
            'status' => $status,
        ]);

        $todos = Todo::query()
            ->where('title', $title)
            ->where('content', $content)
            ->where('creator_id', $creator->id)
            ->where('status', $status)
            ->get();
        $this->assertCount(1, $todos);
        $todo = $todos->first();

        $response->assertRedirect(route('todos.index'));
        $response->assertSessionHas('todo.id', $todo->id);
    }

    #[Test]
    public function show_displays_view(): void
    {
        $todo = Todo::factory()->create();

        $response = $this->get(route('todos.show', $todo));

        $response->assertOk();
        $response->assertViewIs('todo.show');
        $response->assertViewHas('todo');
    }

    #[Test]
    public function edit_displays_view(): void
    {
        $todo = Todo::factory()->create();

        $response = $this->get(route('todos.edit', $todo));

        $response->assertOk();
        $response->assertViewIs('todo.edit');
        $response->assertViewHas('todo');
    }

    #[Test]
    public function update_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\TodoController::class,
            'update',
            \App\Http\Requests\TodoUpdateRequest::class
        );
    }

    #[Test]
    public function update_redirects(): void
    {
        $todo = Todo::factory()->create();
        $title = fake()->sentence(4);
        $content = fake()->paragraphs(3, true);
        $creator = Creator::factory()->create();
        $status = fake()->randomElement(/** enum_attributes **/);

        $response = $this->put(route('todos.update', $todo), [
            'title' => $title,
            'content' => $content,
            'creator_id' => $creator->id,
            'status' => $status,
        ]);

        $todo->refresh();

        $response->assertRedirect(route('todos.index'));
        $response->assertSessionHas('todo.id', $todo->id);

        $this->assertEquals($title, $todo->title);
        $this->assertEquals($content, $todo->content);
        $this->assertEquals($creator->id, $todo->creator_id);
        $this->assertEquals($status, $todo->status);
    }

    #[Test]
    public function destroy_deletes_and_redirects(): void
    {
        $todo = Todo::factory()->create();

        $response = $this->delete(route('todos.destroy', $todo));

        $response->assertRedirect(route('todos.index'));

        $this->assertSoftDeleted($todo);
    }

    #[Test]
    public function export_responds_with(): void
    {
        $todos = Todo::factory()->count(3)->create();

        $response = $this->get(route('todos.export'));

        $response->assertOk();
        $response->assertJson($todos);
    }
}
