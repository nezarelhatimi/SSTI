<?php

namespace App\Filament\Resources\ContactMessages\Tables;

use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ContactMessagesTable
{
    public static function configure(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('name')->searchable(),
            TextColumn::make('email'),
            TextColumn::make('phone'),
            TextColumn::make('subject'),
            IconColumn::make('is_read')->boolean()->label('Read'),
            TextColumn::make('created_at')->dateTime()->sortable(),
        ])
        ->defaultSort('created_at', 'desc')
        ->actions([
            ViewAction::make(),
            DeleteAction::make(),
        ]);
    }
}