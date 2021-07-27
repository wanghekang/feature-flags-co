export function getAuth() {
    const auth = localStorage.getItem('auth');
    if (!auth) return null;
    return JSON.parse(auth);
}

