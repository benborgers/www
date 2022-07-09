<?php

namespace App\Http\Livewire;

use App\Models\Subscriber;
use Illuminate\Support\Facades\Mail;
use Livewire\Component;

class NewsletterSignup extends Component
{
    public $email;

    public $success = false;

    protected $rules = [
        'email' => 'required|email|unique:subscribers',
    ];

    protected $messages = [
        'email.unique' => 'You’re already subscribed!',
    ];

    public function submit()
    {
        $this->email = str($this->email)->trim()->lower();

        $this->validate();

        Subscriber::updateOrCreate([
            'email' => $this->email,
        ]);

        Mail::raw('', function ($message) {
            $message->from('www@elk.sh', 'benborgers.com');
            $message->to('benborgers@hey.com');
            $message->subject("New subscriber! {$this->email}");
        });

        $this->success = true;
    }
}
