/**
 * @Description: 工具函数
 * @author liuwenhua@tianli.com
 * @date 2019-09-11
*/

/**
 * base64数据导出文件，文件下载
 * @param filename
 * @param data
 */
export function downloadFile (filename, data) {
    let DownloadLink = document.createElement('a')

    if ( DownloadLink ){
        document.body.appendChild(DownloadLink)
        DownloadLink.style = 'display: none'
        DownloadLink.download = filename
        DownloadLink.href = data

        if ( document.createEvent ){
            let DownloadEvt = document.createEvent('MouseEvents')

            DownloadEvt.initEvent('click', true, false)
            DownloadLink.dispatchEvent(DownloadEvt)
        }
        else if ( document.createEventObject )
            DownloadLink.fireEvent('onclick')
        else if (typeof DownloadLink.onclick == 'function' )
            DownloadLink.onclick()

        document.body.removeChild(DownloadLink)
    }
}
