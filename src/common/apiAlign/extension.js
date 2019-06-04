/**
 * Created By   : lilinxiang
 * Created Date : 2019/4/8
 * Description  :
 */
import Okam from 'okam-core/src/base/base'

// 页面跳转传值
Okam.ParamData = {}
Okam.$params = () => {
    let params = Okam.ParamData
    Okam.ParamData = {}
    return params
}

// 带参数回上个页面
Okam.ResultCode = -1
Okam.ResultData = {}
Okam.$setResult = (code, data) => {
    Okam.ResultCode = code
    Okam.ResultData = data
}
Okam.$onResultListener = ({success = (code, data) => {}}) => {
    if (Okam.ResultCode !== -1) {
        success(Okam.ResultCode, Okam.ResultData)
        Okam.ResultCode = -1
        Okam.ResultData = undefined
    }
}
