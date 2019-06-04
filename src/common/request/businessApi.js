/**
 * Created By   : lilinxiang
 * Created Date : 2019/4/10
 * Description  :
 */
import {$post} from './baseApi'
import Okam from 'okam-core/src/base/base'
let serviceUrl = Okam.$config.serviceUrl

export default {
    /**
     * 我的优惠券
     * @param callback
     */
    getPrimerizeList: (params, callback) => $post(`${serviceUrl.ycbUrl}/prize/getPrimerizeList`, params, callback),
    /**
     * 参保人列表
     * @param params
     * @param callback
     */
    findInsuredCard: (callback) => $post(`${serviceUrl.ycbUrl}/insuredNew/findInsuredCard`, {}, callback)
}
