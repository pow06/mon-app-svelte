import { browser } from "$app/environment";

function localState<T>(key: string, initial: T) {
    const stored = browser ? localStorage.getItem(key) : null;
    let value = $state<T>(stored ? JSON.parse(stored) : initial);

    return {
        get value() { return value; },
        set value(v: T) {
            value = v;
            if (browser) {
                localStorage.setItem(key, JSON.stringify(v));
            }
        }
    };
}

export const taskStore = localState('task', [])