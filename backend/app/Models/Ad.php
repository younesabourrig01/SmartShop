<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Ad extends Model
{
    protected $fillable = [
        'title',
        'image',
        'position',
        'description',
    ];

    protected $appends = ['url'];

    /**
     * Append a full public URL for the image.
     */
    public function getUrlAttribute(): ?string
    {
        return $this->image
            ? Storage::disk('public')->url($this->image)
            : null;
    }
}
