export function cutString(str: any, len: number) {
    if (str) {
        if (str.length > len) {
            return str.substring(0, len) + "...";
        }
        return str;
    }
    return ""
}

export function transContent(item: any) {
    let show_text = item.content;
    let replace_text = item.mentioned;
    for (let i = 0; i < replace_text.length; i++) {
        let replaceString = '<span style="color:#0370d1">' + replace_text[i] + "</span>";
        show_text = show_text.replace(RegExp(replace_text[i]), replaceString);
    }
    item.content = show_text;
}


//年-月-日 时：分：秒 获取当前时间
export function getNowDate() {
    let date = new Date();
    let sign2 = ":";
    let year = date.getFullYear() // 年
    let month = date.getMonth() + 1; // 月
    let day = date.getDate(); // 日
    let hour = date.getHours(); // 时
    let minutes = date.getMinutes(); // 分
    let seconds = date.getSeconds() //秒
    // 给一位数的数据前面加 “0”
    if (month >= 1 && month <= 9) {
        // @ts-ignore
        month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        // @ts-ignore
        day = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
        // @ts-ignore
        hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
        // @ts-ignore
        minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        // @ts-ignore
        seconds = "0" + seconds;
    }
    return year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
}

export function monthAndDate(param: any) {
    let tt = new Date(Date.parse(param.replace(/-/g, "/")));
    let days = (new Date().getTime() - tt.getTime()) / 86400000;
    let today = new Date().getDate();
    let year = tt.getFullYear();
    let temp1 = tt.getMonth() + 1
    let mouth = ((temp1 < 10) ? '0' : '') + temp1;
    let temp2 = tt.getDate();
    let day = tt.getDate();
    let resultDay = ((temp2 < 10) ? '0' : '') + temp2;
    let time = tt.getHours() < 10 ? "0" + tt.getHours() : tt.getHours();
    let min = tt.getMinutes() < 10 ? "0" + tt.getMinutes() : tt.getMinutes();
    let result, offset;
    //offset = Math.abs(today - day);
    offset = Math.round(days)
    result = year + "-" + mouth + "-" + resultDay
    return result
}

//时-分格式
export function hourAndMinute(param: any) {
    let tt = new Date(Date.parse(param.replace(/-/g, "/")));
    let days = (new Date().getTime() - tt.getTime()) / 86400000;
    let today = new Date().getDate();
    let year = tt.getFullYear();
    let temp1 = tt.getMonth() + 1
    let mouth = ((temp1 < 10) ? '0' : '') + temp1;
    let temp2 = tt.getDate();
    let day = tt.getDate();
    let resultDay = ((temp2 < 10) ? '0' : '') + temp2;
    let time = tt.getHours() < 10 ? "0" + tt.getHours() : tt.getHours();
    let min = tt.getMinutes() < 10 ? "0" + tt.getMinutes() : tt.getMinutes();
    let result, offset;
    //offset = Math.abs(today - day);
    offset = Math.round(days)
    result = time + ":" + min;
    return result
}


export function getDistance(start: any, end: any) {
    const lat1 = (Math.PI / 180) * start.lat;
    const lat2 = (Math.PI / 180) * end.lat;
    const lon1 = (Math.PI / 180) * start.lng;
    const lon2 = (Math.PI / 180) * start.lng;
    const r = 6371;
    const d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)) * r;
    return d;
}

export function formattedTime(originalTime: any) {
    const dateObj = new Date(originalTime);
    const currentDate = new Date();
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    if (dateObj.toDateString() === currentDate.toDateString()) {
        return `${hours}:${minutes}`;
    } else if (year === currentDate.getFullYear()) {
        return `${month}-${day} ${hours}:${minutes}`;
    } else {
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
}

export function getDate(originalTime: any) {
    const dateObj = new Date(originalTime);
    const currentDate = new Date();
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    return `${month}-${day}`;
}
