export default function(value, f) {

    const date = new Date(value);
    // const date = new Date(get(value));
    let str = f ? f : 'y-m-d H:i:s';
    str = str.replace('y', date.getFullYear());
    str = str.replace('m', date.getMonth() + 1);
    str = str.replace('d', toDB(date.getDate()));
    str = str.replace('H', date.getHours());
    str = str.replace('i', toDB(date.getMinutes()));
    str = str.replace('s', toDB(date.getSeconds()));

    // function get(item) {
    //     return item.replace(/-/g, '/')
    // }
    return str;


    function toDB(nub) {
        return nub < 10 ? "0" + nub : "" + nub;
    }


}