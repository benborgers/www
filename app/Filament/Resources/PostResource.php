<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PostResource\Pages;
use App\Filament\Resources\PostResource\RelationManagers;
use App\Models\Post;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;
    protected static ?string $navigationIcon = 'heroicon-o-pencil';
    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Card::make()
                    ->schema([
                        Forms\Components\TextInput::make('title')->required(),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->reactive()
                            ->afterStateUpdated(fn ($state, $set) => $set('slug',
                                str($state)->replaceMatches('/ /', '-')->lower()
                            )),
                        Forms\Components\MarkdownEditor::make('body')
                            ->columnSpan(2),
                    ])
                    ->columns(2)
                    ->columnSpan(2),
                Forms\Components\Card::make()
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->options(static::statusOptions())
                            ->required()
                            ->default('idea'),
                        Forms\Components\Toggle::make('technical')->required()->default(false),
                        Forms\Components\DatePicker::make('date')->default(today('America/New_York'))
                            ->required()
                            ->columnSpan(2)
                    ])
                    ->columns(2)
                    ->columnSpan(1)
            ])
            ->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title'),
                Tables\Columns\TextColumn::make('date')->date(),
                Tables\Columns\BadgeColumn::make('status')
                    ->enum(static::statusOptions())
                    ->colors(['success' => 'published'])
            ])
            ->defaultSort('updated_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(static::statusOptions()),
                Tables\Filters\SelectFilter::make('technical')
                    ->options([
                        true => 'Technical',
                        false => 'Non-Technical'
                    ])
                    ->default(0)
            ]);
    }

    protected static function statusOptions()
    {
        return [
            'idea' => '💡 Idea',
            'draft' => '🚧 Draft',
            'published' => '🌎 Published'
        ];
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}
