<?php

namespace App\Filament\Resources\Products\Schemas;

use App\Models\Category;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('General Info')->schema([
                TextInput::make('name')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($state, callable $set) =>
                        $set('slug', Str::slug($state))),

                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),

                Select::make('category_id')
                    ->label('Category')
                    ->options(Category::pluck('name', 'id'))
                    ->required(),

                TextInput::make('model_number')
                    ->label('Model Number'),

                TextInput::make('price')
                    ->numeric()
                    ->prefix('MAD'),

                Toggle::make('is_featured')->label('Featured'),
                Toggle::make('is_active')->label('Active')->default(true),

                Textarea::make('description')
                    ->label('Description (English)')
                    ->columnSpanFull(),

                FileUpload::make('images')
                    ->image()
                    ->multiple()
                    ->reorderable()
                    ->directory('products')
                    ->imageResizeMode('cover')
                    ->imageCropAspectRatio('16:9')
                    ->maxFiles(10)
                    ->columnSpanFull(),

            ])->columns(2),

            Section::make('French Translation')->schema([
                TextInput::make('name_fr')->label('Name (French)'),
                Textarea::make('description_fr')
                    ->label('Description (French)')
                    ->columnSpanFull(),
            ])->columns(1)->collapsible()->collapsed(),

            Section::make('Arabic Translation')->schema([
                TextInput::make('name_ar')->label('Name (Arabic)'),
                Textarea::make('description_ar')
                    ->label('Description (Arabic)')
                    ->columnSpanFull(),
            ])->columns(1)->collapsible()->collapsed(),

            Section::make('Technical Specs')->schema([
                Repeater::make('specs')
                    ->relationship()
                    ->schema([
                        TextInput::make('label')
                            ->required()
                            ->placeholder('e.g. Power Output'),
                        TextInput::make('value')
                            ->required()
                            ->placeholder('e.g. 7.5 KW'),
                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                    ])
                    ->columns(3)
                    ->orderColumn('sort_order'),
            ]),
        ]);
    }
}