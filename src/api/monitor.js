import request from '../utils/request';

export function getServer() {
    return request({
        url: '/comm/monitor',
        method: 'get'
    });
};
