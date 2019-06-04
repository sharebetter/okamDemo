/**
 * Created By   : lilinxiang
 * Created Date : 2019/5/13
 * Description  : 用于存放全局变量
 * 在vue页面，直接：this.$globalVariable 取值
 * 在js中，导入Okam包：Okam.$globalVariable
 */
import Okam from 'okam-core/src/base/base'

Okam.$globalVariable = {
    channel: '' // 进入渠道(ETK)
}
