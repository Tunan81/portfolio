//全局基础URL
const BASEURL = "https://www.zhouyi.run:3089";  //全局后台服务器请求地址

const handleRequestError =(error)=>{
    if (error.response) {}
    else if (error.request) {
        // 请求未收到响应
        console.error('请求未收到响应:', error.request);
        // 在这里可以进行错误处理逻辑，例如弹出错误提示、记录错误日志等
    }
    else {
        // 请求配置出错
        console.error('请求配置出错:', error.message);
        // 在这里可以进行错误处理逻辑，例如弹出错误提示、记录错误日志等
    }
}

class HttpService {
    constructor() {
        this.BASEURL = BASEURL;
    }

    async get(uri, query) {
        try {
            return new Promise(async (resolve, reject) => {
                await useFetch(this.BASEURL + uri, {
                    method: 'GET',
                    lazy: true,
                    server: false, // 仅在客户端执行
                    query,
                    onRequest({request, options}) {
                        options.headers = options.headers || {};
                        // You can set authorization token here if required
                        // const token = useCookie('token');
                        // options.headers.Authorization = token.value || null;
                    },
                    onRequestError({request, options, error}) {
                        console.log("Server connection failed!");
                        throw error;
                    },
                    onResponse({request, response, options}) {
                        resolve(response._data || {});
                    },
                    onResponseError({request, response, options}) {
                        throw new Error('Response error');
                    }
                });
            })
        } catch (error) {
            throw error;
        }
    }

    async post(uri, body) {
        try {
            return new Promise(async (resolve, reject) => {
                await useFetch(this.BASEURL + uri, {
                    method: 'POST',
                    lazy: true,
                    server: false, // 仅在客户端执行
                    body,
                    onRequest({request, options}) {
                        options.headers = options.headers || {};
                        // You can set authorization token here if required
                        // const token = useCookie('token');
                        // options.headers.Authorization = token.value || null;
                    },
                    onRequestError({request, options, error}) {
                        console.log("Server connection failed!");
                        reject(error)
                    },
                    onResponse({request, response, options}) {
                        resolve(response._data || {});
                    },

                });
            })
        } catch (error) {
            throw error;
        }
    }
}

export default new HttpService();
