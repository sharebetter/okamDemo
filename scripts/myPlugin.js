/**
 * Created By   : lilinxiang
 * Created Date : 2019/4/10
 * Description  :
 */

function compile(file, options) {
    let json5 = require('json5');

    /*let obj = json5.parse(file.content.toString())
    let result = JSON.stringify(obj, null, 4)*/
    /*let tt = file.content.toString().replace('common',"../common")
    let content = Buffer.from(tt)*/

    /*let content = Buffer.from('let a = 1;\n' + file.content.toString())
    console.log(content.toString())


    return {
        content: content
    }*/

    /*file.subFiles.forEach(item => {
        if (item.isTpl) {
            console.log(item)
        }
    })*/



    console.log(file.path)

}

module.exports = exports = compile
