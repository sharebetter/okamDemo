/**
 * Created By   : lilinxiang
 * Created Date : 2019/4/10
 * Description  :
 */
import okam from 'okam-core/src/base/base'

export default {
    setNavigationBarTitle(content) {
        switch (process.env.APP_TYPE) {
            case 'ant': {
                okam.$api.setNavigationBar({
                    title: content
                })
                break
            }
            case 'wx':
            case 'swan':
            case 'tt': {
                okam.$api.setNavigationBarTitle({
                    title: content
                })
                break
            }
            default: break
        }
    }
}
