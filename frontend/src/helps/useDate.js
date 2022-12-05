export const dateNow = (expresion) =>{
    var dates = new Date(); //Fecha actual
    var month = dates.getMonth()+1; //obteniendo mes
    var day = dates.getDate(); //obteniendo dia
    var year = dates.getFullYear(); //obteniendo año
    if(day<10)
        day='0'+day; //agrega cero si el menor de 10
    if(month<10)
        month='0'+month //agrega cero si el menor de 10
    return year+expresion+month+expresion+day;
}