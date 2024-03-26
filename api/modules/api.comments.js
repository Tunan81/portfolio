import service from '../server'

export const commentsList = (data) => {
    return service.post('/v1/blog/comments/client/list', data)
}
export const commentsCreate = (data) => {
    return service.post('/v1/blog/comments/client/create', data)
}
export const commentsReply = (data) => {
    return service.post('/v1/blog/comments/client/reply', data)
}
export const commentsLike = (data) => {
    return service.post('/v1/blog/comments/client/like', data)
}
export const commentsOpposeNum = (data) => {
    return service.post('/v1/blog/comments/client/opposeNum', data)
}
export const commentsRecent = (data) => {
    return service.post('/v1/blog/comments/client/recent', data)
}






