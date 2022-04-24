<x-filament::page>
    <form wire:submit.prevent="save">
        {{ $this->form }}

        <button
            wire:target="save"
            wire:loading.attr="disabled"
            wire:loading.class="opacity-70 cursor-wait"
            class="font-medium tracking-tight rounded-lg transition-colors px-4 py-2 bg-primary-600 hover:bg-primary-500 focus:bg-primary-700 text-white mt-10"
        >
        <span wire:target="save" wire:loading.remove>
            Save
        </span>
        <span wire:target="save" wire:loading>
            Saving...
        </span>
        </button>
    </form>
</x-filament::page>
