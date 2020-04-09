import axios from 'axios'
import userStore from './stores/userStore'
import { apiUrl } from './config'

const requests = {

    get: (url, header = false) => {
        const defaultOption = {
            method: `get`,
            url: `${apiUrl}${url}`,
        }
        if (header) {
            return axios(
                Object.assign({}, defaultOption, {
                    headers: {
                        'Authorization': `Bearer ${userStore.token}`,
                    },
                }))
        } else {
            return axios(defaultOption)
        }
    },

    post: (url, body, header = false) => {
        const defaultOption = {
            method: `post`,
            url: `${apiUrl}${url}`,
            data: body,
        }
        if (body && header) {
            return axios(
                Object.assign({}, defaultOption, {
                    data: body,
                    headers: {
                        'Authorization': `Bearer ${userStore.token}`,
                    },
                }),
            )
        } else if (body && !header) {
            return axios(
                Object.assign({}, defaultOption, {
                    data: body,
                }),
            )
        } else if (!body && header) {
            return axios(
                Object.assign({}, defaultOption, {
                    headers: {
                        'Authorization': `Bearer ${userStore.token}`,
                    },
                }),
            )
        } else {
            return axios(defaultOption)
        }
    },

    delete: (url, header = false) => {
        const defaultOption = {
            method: `delete`,
            url: `${apiUrl}${url}`,
        }
        if (header) {
            return axios(
                Object.assign({}, defaultOption, {
                    headers: {
                        'Authorization': `Bearer ${userStore.token}`,
                    },
                }))
        } else {
            return axios(defaultOption)
        }
    },

    put: (url, body, header = false) => {
        const defaultOption = {
            method: `put`,
            url: `${apiUrl}${url}`,
        }
        if (body && header) {
            return axios(
                Object.assign({}, defaultOption, {
                    data: body,
                    headers: {
                        'Authorization': `Bearer ${userStore.token}`,
                    },
                }),
            )
        } else if (body && !header) {
            return axios(
                Object.assign({}, defaultOption, {
                    data: body,
                }),
            )
        } else if (!body && header) {
            return axios(
                Object.assign({}, defaultOption, {
                    headers: {
                        'Authorization': `Bearer ${userStore.token}`,
                    },
                }),
            )
        } else {
            return axios(defaultOption)
        }
    },
}

export const UserRequest = {
    userLogin: (identifier, password) =>
        requests.post(`/auth/local`, {
            identifier: identifier,
            password: password,
        }),
    userRegister: (username, email, password) =>
        requests.post(`/auth/local/register`, {
            username: username,
            email: email,
            password: password,
        }),
    checkCurrentUser: () =>
        requests.get(`/users/me`, true),
    updateUserInfo: (userId, info) =>
        requests.put(`/users/${userId}`, info, true),
    sendResetPassword: email =>
        requests.post(`/auth/forgot-password`, { email: email }),
    userSetNewPassword: (code, password, passwordConfirmation) =>
        requests.post(`/auth/reset-password`, {
            code: code,
            password: password,
            passwordConfirmation: passwordConfirmation,
        }),
}

export const FAQRequest = {
    getFAQData: () =>
        requests.get(`/faqs`, true),
    addFAQ: (title,content) => {
        requests.post(`/faqs`, {title:title,content:content})
    },
}
