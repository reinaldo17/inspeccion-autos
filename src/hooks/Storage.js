const Storage = {
    getSessionToken: () => {
        return JSON.parse(sessionStorage.getItem('TOKEN'));
    },
    getSessionData: (key) => {
        return JSON.parse(sessionStorage.getItem(key));
    },
    setSessionToken: (token) => {
        sessionStorage.setItem('TOKEN', JSON.stringify(token));
    },
    setSessionItem: (key, data) => {
        sessionStorage.setItem(key, JSON.stringify(data));
    },
    tokenSessionExist: () => {
        if(sessionStorage.getItem('TOKEN')) {
            return true;
        }
        return false;
    },
    dataSessionExist: (key) => {
        if(sessionStorage.getItem(key)) {
            return true;
        }
        return false;
    },
    clearSessionData: () => {
        sessionStorage.clear();
    }
};

export default Storage;