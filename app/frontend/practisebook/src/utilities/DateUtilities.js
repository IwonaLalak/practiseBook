export default{

    // todo add validation functions

    formatDateForInsert(date, time){
        return (date + " " + time + ':00')
    },

    getDateFromObject(obj){
        let day = obj.getDate();
        let month = obj.getMonth()+1;
        let year = obj.getFullYear();

        return year+'-'+month+'-'+day;
    },

    getTimeFromObject(obj){
        let h = obj.getHours();
        let m = obj.getMinutes();

        if(h<10){
            h= '0'+h;
        }
        if(m.toString().length == 1){
            m = m + '0';
        }

        return h+':'+m;
    },

    countWorkingTime(start,end){
        let date_start = new Date(Date.now());
        date_start.setHours(start.substr(0,2));
        date_start.setMinutes(start.substr(3,5));

        let date_end = new Date(Date.now());
        date_end.setHours(end.substr(0,2));
        date_end.setMinutes(end.substr(3,5));

        let time = (date_end - date_start) / (1000*60);
        // time in minutes
        return time
    },

    validateSelectedTime(time){
        let eariest = '07:00';
        let lastest = '19:00';

        return (eariest <= time && time <= lastest)

    }
}