<?php

namespace App\Filament\Resources\SofaPageResource\Pages;

use App\Filament\Resources\SofaPageResource;
use Filament\Resources\Pages\ListRecords;

class ListSofaPages extends ListRecords
{
    protected static string $resource = SofaPageResource::class;

    protected function isTablePaginationEnabled(): bool { return false; }
}
