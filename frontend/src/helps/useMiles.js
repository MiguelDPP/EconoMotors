
export const InputMilesKeyup = ( e ) => {
    var entrada = e.target.value.split('.').join('');
        entrada = entrada.split('').reverse();      
    var salida = [];
    var aux = '';
            
    var paginador = Math.ceil(entrada.length / 3);
            
    for(let i = 0; i < paginador; i++) {
        for(let j = 0; j < 3; j++) {
            if(entrada[j + (i*3)] != undefined) {
                aux += entrada[j + (i*3)];
            }
        }
        salida.push(aux);
        aux = '';
               
        e.target.value = salida.join('.').split("").reverse().join('');
    }
    
};

export const InputFormatMiles = ( num ) => {
    var cadena = ""; var aux;
  
    var cont = 1,m,k;
  
    if(num<0) aux=1; else aux=0;
    
    num=num.toString();
 
    for(m=num.length-1; m>=0; m--){

     cadena = num.charAt(m) + cadena;
    
     if(cont%3 == 0 && m >aux)  cadena = "." + cadena; else cadena = cadena;
   
     if(cont== 3) cont = 1; else cont++;
    
    }
    
    cadena = cadena.replace(/.,/,",");
    
    return cadena;
    
};


export const QuitFormatMiles = (num) => {
    return num.split('.').join('');
}