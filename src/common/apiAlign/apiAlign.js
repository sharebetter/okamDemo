/**
 * Created By   : lilinxiang
 * Created Date : 2019/1/22
 * Description  : 用于各平台对齐Api
 */
import Okam from 'okam-core/src/base/base'
import Toast from './toast'
import Dialog from './dialog'
import Loading from './loading'
import Storage from './storage'
import Images from './images'
import Navigation from './navigation'


Okam.$apiAlign = Object.assign(
    Toast,
    Dialog,
    Loading,
    Storage,
    Images,
    Navigation
)
