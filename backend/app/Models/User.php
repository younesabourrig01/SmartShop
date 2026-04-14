<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Review;
use App\Models\Wishlist;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    // for sanctum (auth systeme)
    use HasApiTokens, HasFactory, Notifiable;

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'adress',
        'phone_number',
        'image',
    ];

    protected $appends = ['url'];

    public function getUrlAttribute()
    {
        return $this->image ? \Illuminate\Support\Facades\Storage::disk('public')->url($this->image) : null;
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function cart(): HasOne
    {
        return $this->hasOne(Cart::class);
    }
    public function wishlist(): HasOne
    {
        return $this->hasOne(Wishlist::class);
    }
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function getBadge(): string
    {
        $ordersCount = $this->orders()->count();

        if ($ordersCount < 3) {
            return 'none';
        } elseif ($ordersCount <= 7) {
            return 'normal';
        } elseif ($ordersCount <= 27) {
            return 'medium';
        } elseif ($ordersCount <= 34) {
            return 'premium';
        } else {
            return 'master';
        }
    }

    public function getShippingDiscount(): float
    {
        $badge = $this->getBadge();
        switch ($badge) {
            case 'master':
                return 0.50; // 50%
            case 'premium':
                return 0.10; // 10%
            case 'medium':
                return 0.05; // 5%
            case 'normal':
                return 0.015; // 1.5%
            case 'none':
            default:
                return 0; // 0%
        }
    }
}
