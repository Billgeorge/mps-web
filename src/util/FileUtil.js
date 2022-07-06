export const downloadPDF = (data,fileName) => {
    const linkSource = `data:application/pdf;base64,${data}`
    const downloadLink = document.createElement('a')
    const finalName = `${fileName}.pdf`

    downloadLink.href = linkSource
    downloadLink.download = finalName
    downloadLink.click()
}