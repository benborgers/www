<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SofaPageResource\Pages;
use App\Filament\Resources\SofaPageResource\RelationManagers;
use App\Models\SofaPage;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;

class SofaPageResource extends Resource
{
    protected static ?string $model = SofaPage::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-duplicate';
    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Card::make()
                    ->schema([
                        Forms\Components\MarkdownEditor::make('body')
                    ])
                    ->columnSpan(2),
                Forms\Components\Card::make()
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->disableAutocomplete()
                            ->autofocus(),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->unique()
                            ->reactive()
                            ->afterStateUpdated(fn ($state, $set) => $set('slug',
                                str($state)->replaceMatches('/ /', '-')->lower()
                            ))
                            ->helperText(fn ($state) => str($state)->isNotEmpty() ? "/s/$state" : null)
                            ->disableAutocomplete()
                    ])
                    ->columnSpan(1)
            ])
            ->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title'),
                Tables\Columns\TextColumn::make('slug')
            ])
            ->defaultSort('updated_at', 'desc')
            ->filters([
                //
            ]);
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
            'index' => Pages\ListSofaPages::route('/'),
            'create' => Pages\CreateSofaPage::route('/create'),
            'edit' => Pages\EditSofaPage::route('/{record}/edit'),
        ];
    }
}
