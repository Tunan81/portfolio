import service from '../server'

export const visitorsCreate = (data) => {
    return service.post('/v1/sys/visitors/create', data)
}
export const frontendsetups = (data) => {
    return service.post('/v1/blog/frontendsetups/client/list', data)
}
export const dictionariesList = (data) => {
    return service.post('/v1/sys/dictionaries/client/list', data)
}

export const visitorsCount = (data) => {
    return service.get('/v1/sys/visitors/count', data)
}
// 主页公告列表
export const anouncementsHomeList = (data) => {
    return service.post('/v1/blog/anouncements/client/home/list', data)
}
// 公告板列表
export const anouncementsList = (data) => {
    return service.post('/v1/blog/anouncements/client/list', data)
}
// 根据IP查询用户信息
export const getUserinfo = (data) => {
    return service.get('/v1/sys/users/getUserinfo', data)
}





