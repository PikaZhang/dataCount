export default function(value) {
    console.log(value)
    var arr = []
    arr.push(value)
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
            }
        }
    }
    return arr;

}