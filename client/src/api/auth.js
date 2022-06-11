
import { post } from './index';

export const signIn = ({ email, password }) => {
    return post({
        url: '/auth/signin',
        body: {
            email, password
        }
    })
}




export const signUp = ({ email, password }) => {
    return post({
        url: '/auth/signup',
        body: {
            email, password
        }
    })
}