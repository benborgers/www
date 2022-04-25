<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Forms;
use App\Models\Blob;

class Index extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-user-circle';
    protected static string $view = 'filament.pages.index';

    public $data;
    protected function getFormStatePath(): string { return 'data'; }

    public function mount()
    {
        $this->form->fill(
            Blob::firstWhere('name', 'index')?->data ??
            [
                'content' => '',
                'published' => false,
                'published_at' => today('America/New_York')
            ]
        );
    }

    protected function getFormSchema(): array
    {
        return [
            Forms\Components\Card::make()->schema([
                Forms\Components\MarkdownEditor::make('content')->required()
            ])
        ];
    }

    public function save()
    {
        Blob::updateOrCreate(
            ['name' => 'index'],
            ['data' => $this->data]
        );
    }
}
