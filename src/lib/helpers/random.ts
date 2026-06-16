export function randomId() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}


export function randomRotation() {
    return parseFloat((Math.random() * 10 - 5).toFixed(2));
}
