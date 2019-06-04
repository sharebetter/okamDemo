import okam from 'okam-core/src/base/base'

export default {
    previewImage(imageURL, imageURLs) {
        switch (process.env.APP_TYPE) {
            case 'ant': {
                okam.$api.previewImage({
                    current: imageURLs.indexOf(imageURL),
                    urls: imageURLs
                })
                break
            }
            case 'wx':
            case 'swan':
            case 'tt': {
                okam.$api.previewImage({
                    current: imageURL,
                    urls: imageURLs
                })
                break
            }
            default: break
        }
    }
}
