/**
 * Created By   : lilinxiang
 * Created Date : 2019/1/22
 * Description  : 网络请求模块
 */
import Okam from 'okam-core/src/base/base'
import CommonApi from './commonApi'
import BusinessApi from './businessApi'

Okam.$request = Object.assign(
    CommonApi,
    BusinessApi
)
