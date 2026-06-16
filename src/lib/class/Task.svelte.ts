import { randomId, randomRotation } from "$lib/helpers/random"
import type { taskStore } from "./TaskStore.svelte";

const palette = [
    { bg: "#FFF9C4", border: "#F9A825", fold: "#F57F17" },
    { bg: "#FCE4EC", border: "#E91E63", fold: "#880E4F" },
    { bg: "#E8F5E9", border: "#43A047", fold: "#1B5E20" },
    { bg: "#E3F2FD", border: "#1E88E5", fold: "#0D47A1" },
    { bg: "#F3E5F5", border: "#8E24AA", fold: "#4A148C" },
    { bg: "#FBE9E7", border: "#F4511E", fold: "#BF360C" },
    { bg: "#E0F7FA", border: "#00ACC1", fold: "#006064" },
];

function getRandomPalette() {
    return palette[Math.floor(Math.random() * palette.length)];
}

export class Task {
    id: string;
    text: string = '';
    done: boolean = $state(false);
    rotation: number;
    color: string;
    borderColor: string;
    foldColor: string;

    constructor(text: string,) {
        const p = getRandomPalette();

        this.text = text;

        this.id = randomId();
        this.rotation = randomRotation();
        this.color = p.bg;
        this.borderColor = p.border;
        this.foldColor = p.fold
    }

    toggleDone() {
        this.done = !this.done;
    }

    static fromJSON(data: ReturnType<Task['toJSON']>): Task {
        const task = new Task(data.text);
        task.id = data.id;
        task.done = data.done;
        task.rotation = data.rotation;
        task.color = data.color;
        task.borderColor = data.borderColor;
        task.foldColor = data.foldColor;
        return task;
    }

    toJSON() {
        return {
            id: this.id,
            text: this.text,
            done: this.done,
            rotation: this.rotation,
            color: this.color,
            borderColor: this.borderColor,
            foldColor: this.foldColor,
        };
    }
}

