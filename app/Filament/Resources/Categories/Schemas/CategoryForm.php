<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('name')
                ->label('Name (French)')
                ->required()
                ->live(onBlur: true)
                ->afterStateUpdated(fn ($state, callable $set) =>
                    $set('slug', Str::slug($state))),

            TextInput::make('slug')
                ->required()
                ->unique(ignoreRecord: true),

            Textarea::make('description')
                ->label('Description (French)')
                ->columnSpanFull(),

            FileUpload::make('image')
                ->image()
                ->directory('categories')
                ->columnSpanFull(),

            Section::make('English Translation')->schema([
                TextInput::make('name_en')->label('Name (English)'),
                Textarea::make('description_en')
                    ->label('Description (English)')
                    ->columnSpanFull(),
            ])->columns(1)->collapsible()->collapsed(),

            Section::make('Arabic Translation')->schema([
                TextInput::make('name_ar')->label('Name (Arabic)'),
                Textarea::make('description_ar')
                    ->label('Description (Arabic)')
                    ->columnSpanFull(),
            ])->columns(1)->collapsible()->collapsed(),
        ]);
    }
}