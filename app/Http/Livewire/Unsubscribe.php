<?php

namespace App\Http\Livewire;

use App\Models\Subscriber;
use Livewire\Component;

class Unsubscribe extends Component
{
    public $email;

    public $success = false;

    protected function rules()
    {
        return [
            'email' => ['required', 'email', function ($attribute, $value, $fail) {
                if (Subscriber::where('email', $value)->doesntExist()) {
                    $fail('This email address isn’t subscribed.');
                }
            }],
        ];
    }

    public function submit()
    {
        $this->email = str($this->email)->trim()->lower();

        $this->validate();

        Subscriber::where('email', $this->email)->delete();

        $this->success = true;
    }

    public function render()
    {
        return view('livewire.unsubscribe')
            ->layoutData([
                'title' => 'Unsubscribe',
                'bg' => 'bg-zinc-200',
                'livewire' => true,
            ]);
    }
}
