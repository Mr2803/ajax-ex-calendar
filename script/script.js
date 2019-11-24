$(document).ready(function () {
   var mese = 1;
   printDays(mese);
   $("#my_next").click(function(){
      if(mese == 12){
         mese = 1
         $(".calendar").html("")
         printDays(mese);
      } else{
         mese++;
         $(".calendar").html("")
         printDays(mese);
      }
   })
   $("#my_prev").click(function(){
      if(mese == 1){
         mese = 12;
         $(".calendar").html("")
         printDays(mese);
      }else {
      mese--;
      $(".calendar").html("")
      printDays(mese);
      }  
   })

   $(document).on("click", ".calendar div", function (event) {
      //creo una variabile per comodità per far riferimento a quell elemento
      $(".calendar div").removeClass("selected")
      var elem = $(this);
      if (elem.hasClass("disabled")){
         elem.parents(".container-fluid").find("#date").text("Hai selezionato una data non valida")
      } else{
         elem.addClass("selected");
         console.log("hai selezionato la data " + elem.attr("data-date"))
         //cerco all'interno di
         elem.parents(".container-fluid").find("#date").text("Hai selezionato la data " + elem.attr("data-date"));
      }
      

   });
})

//funzione per stampare i giorni del mese
function printDays(mese){
   //imposto una variabile , setto anno , mese e giorno di partenza e richiedo il conteggio dei giorni di quel mese
   var daysNumber = moment("2018-" + mese, "YYYY-MM").daysInMonth();
   //apro un ciclo for sulla lunghezza del mese che ho selezionato nella mia variabile
   for (var i = 1; i <= daysNumber; i++) {
      //imposto una variabile che ha valore della data corrente tranne il giorno che sarà definito dal mio index
      var dataCorrente = moment('2018-' + mese + '-' + i , 'YYYY-MM-D').format('YYYY-MM-DD');
      /* console.log(dataCorrente) */
      var giornoCorrente = moment(dataCorrente).format("DD");

      /* mondayOrNot(mese,i); */

      //imposto una variabile che mi rilascerà un valore numerico del giorno del primo mese (discriminante per i miei controlli successivi)
       var primoGiornoMese = moment('2018-' + mese, 'YYYY-MM').day();
      //condizione necessaria per far ripetere il ciclo interno solo 1 volta , altrimenti creerebbe div vuoti ad ogni giro 
      if (i == 1){
         console.log("questo è il primo giorno del mese " + primoGiornoMese)
         //condizione necessaria affinchè se il primo giorno del mese è domenica allora questo assuma valore 7 e non 0 (impostazione di moment) , altrimenti non ci sarebbe ciclo su domenica e quindi non stamperebbe i div vuoti
         if(primoGiornoMese == 0){
            primoGiornoMese=7;
         }
         //imposto il ciclo for con variabile y minore del valore del primo giorno mese , fino a che la mia var y non raggiunge lo stesso valore del primo giorno del mese verrà generato un div vuoto 
         for (var y = 1; y < primoGiornoMese; y++) {
            $(".calendar").append("<div class='disabled'></div>");
         }
      } 
      //stampo in pagina
      $(".calendar").append('<div data-date="' + dataCorrente + '">' + '<p>' + giornoCorrente + '</p>' + '</div>');
      
      //creo una variabile per il nome del mese
      var Nomese = moment().years("2018").month(mese - 1).format("MMMM YYYY");
      /* console.log(Nomese) */
      $("#meseNow").text(Nomese);
   }
   holidayOrNot(mese);
}

//funzione per effettuare la chiamata AJAX
function holidayOrNot(mese){
   $.ajax({
      url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=" + (mese - 1),
      method: "GET",
      success: function (data) {
         //imposto un controllo , se la lunghezza dell'array è minore di 0 , questa parte di codice non viene eseguita
         if (data.response.length > 0) {
            for (var i = 0; i < data.response.length; i++) {
               //imposto una variabile che ha valore date (chiave della mia api)
               var festivita = data.response[i].date
               //sostituisco in pagina gli elementi che hanno come attributo un valore uguale alla mia festività , li coloro di rosso e APPEND il nome della festività (altra chiave della mia api)
               $(".calendar [data-date='" + festivita + "']").addClass("holidays").append( "<p>" + data.response[i].name + "</p>")
            }
         }
      },
      error: function (richiesta, stato, errori) {
         alert("E' avvenuto un errore. " + " " + richiesta + " " + stato + " " + errori);
      }
   })
}

//funzione per generare div vuoti se il primo giorno del mese non è lunedì

/* function mondayOrNot(mese,x){
   //imposto una variabile che mi rilascerà un valore numerico del giorno del primo mese (discriminante per i miei controlli successivi)
   var primoGiornoMese = moment('2018-' + mese, 'YYYY-MM').day();
   //condizione necessaria per far ripetere il ciclo interno solo 1 volta , altrimenti creerebbe div vuoti ad ogni giro 
   if (x == 1) {
      console.log("questo è il primo giorno del mese " + primoGiornoMese)
      //condizione necessaria affinchè se il primo giorno del mese è domenica allora questo assuma valore 7 e non 0 (impostazione di moment) , altrimenti non ci sarebbe ciclo su domenica e quindi non stamperebbe i div vuoti
      if (primoGiornoMese == 0) {
         primoGiornoMese = 7;
      }
      //imposto il ciclo for con variabile y minore del valore del primo giorno mese , fino a che la mia var y non raggiunge lo stesso valore del primo giorno del mese verrà generato un div vuoto 
      for (var y = 1; y < primoGiornoMese; y++) {
         $(".calendar").append("<div class='disabled'></div>");
      }
   };
} */
