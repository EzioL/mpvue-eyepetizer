import wx from 'wx'
import Fly from 'flyio'

const request = new Fly()

request.interceptors.request.use((request) => {
    //wx.showNavigationBarLoading()
    console.log("request",request)
    return request
})

request.interceptors.response.use(
    (response, promise) => {
        //wx.hideNavigationBarLoading()
        console.log("response",response)
        return promise.resolve(response.data)
    },
    (err, promise) => {
       // wx.hideNavigationBarLoading()
        wx.showToast({
            title: err.message,
            icon: 'none'
        })
        return promise.resolve()
    }
)

export default request