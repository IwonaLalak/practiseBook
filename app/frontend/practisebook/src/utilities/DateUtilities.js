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
    }
}