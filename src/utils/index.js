const TOKEN_KEY = 'jwt';

export const loginAuth = () => {
    localStorage.setItem(TOKEN_KEY, 'TestLogin');
}

export const logoutAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLoginAuth = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}