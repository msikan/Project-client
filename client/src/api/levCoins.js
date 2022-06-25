
import { post, get } from './index';


export const updateLevCoins = ({ coins }) => {
    return post({
        url: '/levcoins',
        body: {
            coins
        }
    })
}


export const getLevCoins = ({ coins }) => {
    return get({
        url: '/levcoins'
    })
}
