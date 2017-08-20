import axios from 'axios';

const base = 'http://localhost:4000/';

function post(path, body) {
    if(localStorage.getItem('JWT')) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('JWT');
    }
    return new Promise((resolve, reject) => {
        axios.post(base + path, body, { validateStatus: (status) => { return status < 500; }})
        .then((response) => {
            if(response.status === 401) {
                if(path !== 'user/login') window.location = "/";
                else resolve(response);
            } else {
                if(response.headers.Authorization)
                    localStorage.setItem('JWT', response.headers.Authorization);
                resolve(response);
            }
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
    }

function get(path) {
    if(localStorage.getItem('JWT')) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('JWT');
    }
    return new Promise((resolve, reject) => {
        axios.get(base + path, { validateStatus: (status) => { return status < 500; }})
        .then((response) => {
            if(response.status === 401) {
                window.location = "/";
            } else {
                if(response.headers.Authorization)
                    localStorage.setItem('JWT', response.headers.Authorization);
                resolve(response);
            }
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

function put(path, body) {
    if(localStorage.getItem('JWT')) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('JWT');
    }
    return new Promise((resolve, reject) => {
        axios.put(base + path, body, { validateStatus: (status) => { return status < 500; }})
        .then((response) => {
            if(response.status === 401) {
                window.location = "/";
            } else {
                if(response.headers.Authorization)
                    localStorage.setItem('JWT', response.headers.Authorization);
                resolve(response);
            }
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

function del(path, body) {
    if(localStorage.getItem('JWT')) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('JWT');
    }
    return new Promise((resolve, reject) => {
        axios.delete(base + path, body, { validateStatus: (status) => { return status < 500; }})
        .then((response) => {
            if(response.status === 401) {
                window.location = "/";
            } else {
                if(response.headers.Authorization)
                    localStorage.setItem('JWT', response.headers.Authorization);
                resolve(response);
            }
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

export default {
    post: post,
    get: get,
    put: put,
    del: del
}
