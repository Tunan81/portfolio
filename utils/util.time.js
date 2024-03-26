/**
 * 人性化时间
 * @param {*} timestamp 
 * @returns 
 */
export function getHumanizedTime(timestamp) {
    function padZero(value) {
        return value.toString().padStart(2, '0')
    }
    function formatDate(date, format) {
        const year = date.getFullYear()
        const month = padZero(date.getMonth() + 1)
        const day = padZero(date.getDate())
        const hours = padZero(date.getHours())
        const minutes = padZero(date.getMinutes())

        return format.replace('YYYY', year).replace('MM', month).replace('DD', day).replace('HH', hours).replace('mm', minutes)
    }

    const currentDate = new Date()
    const targetDate = new Date(timestamp)

    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()

    const targetYear = targetDate.getFullYear()
    const targetMonth = targetDate.getMonth()
    const targetDay = targetDate.getDate()

    if (currentYear === targetYear && currentMonth === targetMonth && currentDay === targetDay) {
        // 今天
        return `今天 ${formatDate(targetDate, 'HH:mm')}`
    }
    else if (currentYear === targetYear && currentMonth === targetMonth && currentDay - targetDay === 1) {
        // 昨天
        return `昨天 ${formatDate(targetDate, 'HH:mm')}`
    }
    else if (currentYear === targetYear && currentMonth === targetMonth && currentDay - targetDay <= 7) {
        // 7天内
        const weekday = ['日', '一', '二', '三', '四', '五', '六'][targetDate.getDay()]
        return `星期${weekday} ${formatDate(targetDate, 'HH:mm')}`
    }
    else {
        // 更早
        return formatDate(targetDate, 'YYYY-MM-DD HH:mm')
    }
}
