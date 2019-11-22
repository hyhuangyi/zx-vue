import request from '../utils/request';

export function menus() {
    return request({
        url: '/comm/menus',
        method: 'get'
    });
};
