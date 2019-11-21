import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: '/comm/city/list',
        method: 'get',
        params: query
    });
};
