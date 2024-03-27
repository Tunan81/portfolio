/*
/!**
 * 人性化时间
 * @param {*} timestamp
 * @returns
 *!/
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
*/
// util.time.js

export class TimeUtils {
    static formatTime(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
        let crtTime = new Date(date);
        let o = {
            "M+": crtTime.getMonth() + 1,               //月份
            "d+": crtTime.getDate(),                    //日
            "h+": crtTime.getHours(),                   //小时
            "m+": crtTime.getMinutes(),                 //分
            "s+": crtTime.getSeconds(),                 //秒
            "q+": Math.floor((crtTime.getMonth() + 3) / 3), //季度
            "S": crtTime.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (crtTime.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    static getDayOfWeekName(date) {
        const daysOfWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        const dayIndex = new Date(date).getDay(); // 获取星期几的索引（0 表示周日）
        return daysOfWeek[dayIndex];
    }

    static formatRelativeTime(date) {
        const now = new Date();
        const diff = now - new Date(date);

        if (diff < 60000) {
            return '刚刚';
        } else if (diff < 3600000) {
            const minutes = Math.floor(diff / 60000);
            return `${minutes} 分钟前`;
        } else if (diff < 86400000) {
            const hours = Math.floor(diff / 3600000);
            return `${hours} 小时前`;
        } else {
            return this.formatTime(date);
        }
    }
}

