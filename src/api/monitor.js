import request from '../utils/request';

export function getServer() {
    return request({
        url: 'http://localhost:8087/zx/comm/monitor',
        method: 'get'
    });
};
