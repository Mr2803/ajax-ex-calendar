/* EX di oggi: primo Milestone ex calendar
NOME REPO:  ajax-ex-calendar
DESCRIZIONE:
 trovate la descrizione  e tutto il resto qui: https://docs.google.com/document/d/1OcSGrT3Snh_DXrDZ82DVY59eqvzNb_Nh_Db5z3qq2_k/edit
Per oggi però “solo” MIlestone:
stampare gennaio 2018 (E SOLO QUELLO) con caratterizzazione delle relative festività, recuperate interrogando l’API
 STEP:
Controllare quanti giorni ha il mese  formando così una lista;
Chiedere all’api quali sono le festività per il mese ;
Evidenziare le festività nella lista
BONUS :
per ora nulla, cercate solo di comprendere bene che fate passo passo, prima di passare allo step successivo.
NOTE:
vado passo passo, isolando una cosa alla volta (prima analisi, poi documentazione, quindi logica con semplici log e poi passo a stampare in pagina).
Buon pome e rimanete in ascolto su questo canale per comunicazioni possibili nel mezzo. :v:
 */
 /* ESEMPI NIKOLAS
 
 //Ottengo una data formattata del momento in cui si esegue questa riga
var date = moment().format('DD/MM/YYYY');

//Ottengo una data formattata : 02/02/2018
var date = moment('2018-02-02').format('DD/MM/YYYY');

//Ottengo una data interpretata male di moment : 02 Marzo 2018
var date = moment('03/02/2018').format('DD MMMM YYYY');

//Quando succede questo è importante "spiegare" a moment che formato abbiamo usato e come lo intendiamo
var date = moment('03/02/2018', 'DD/MM/YYYY').format('DD/MM/YYYY');

//Prendo il nome del mese : Marzo
var name = moment(3, 'M').format('MMMM');

//Ottengo il numero di giorni di quello specifico mese
var numeroDiGiorni = moment('01/01/2018', 'DD/MM/YYYY').daysInMonth();

//Eseguo un ciclo per creare ciascun giorno del mese nel mio html
for(var i = 1; i <= numeroDiGiorni; i++) {

        //Strutturo la data simile alla chiamata ajax
        var currentDate = moment('2018-01-'+i, 'YYYY-MM-D').format('YYYY-MM-DD');

        //Uso quella data per prendere le informazioni di quel giorno : numero e nome del giorno
        var currentDay = moment(currentDate).format('DD dddd');

        //Inserisco nell'html il mio div con attributo per eventuali selettori e la relativa data formattata
        $('.content').append('<div data-date="'+currentDate+'">'+currentDay+'</div>')
    } */


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

      var giornoCorrente = moment(dataCorrente).format("dddd DD");
      //stampo in pagina
      var primoGiornoMese = moment('2018-' + mese + '-' + i, 'YYYY-MM-D').day();
     /*  console.log(primoGiornoMese.valueOf()) */
      console.log("questo è il primo giorno del mese " + primoGiornoMese)
      /* var test = moment('2018-' + mese + '-' + i).day(); */
      /* console.log("questo è il giorno " + test); */
      if (i == 1){
         if(primoGiornoMese == 0){
            primoGiornoMese=7;
           
         }
         for (var y = 1; y < primoGiornoMese; y++) {
            
              
            $(".calendar").append('<div></div>');
            
      }
   }
      

         $(".calendar").append('<div data-date="' + dataCorrente + '">' + giornoCorrente + '</div>');
      
      
      //creo una variabile per il nome del mese
      var Nomese = moment().years("2018").month(mese - 1).format("MMMM YYYY");
      /* console.log(Nomese) */
      $("#meseNow").text(Nomese)
      
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
               /* console.log(data.response.length)
               console.log("queste sono le date delle festività " + data.response[i].date) */

               //imposto una variabile che ha valore date (chiave della mia api)
               var festivita = data.response[i].date
               //sostituisco in pagina gli elementi che hanno come attributo un valore uguale alla mia festività , li coloro di rosso e APPEND il nome della festività (altra chiave della mia api)
               $(".calendar [data-date='" + festivita + "']").addClass("holidays").append("<br> " + data.response[i].name)
               
            }

         }
      },
      error: function (richiesta, stato, errori) {
         alert("E' avvenuto un errore. " + " " + richiesta + " " + stato + " " + errori);
      }
   })
}

// TO DO : SE IL PRIMO GIORNO DEL MESE NON è LUNEDI IL DIV CHE CONTIENE IL GIORNO PARTIRà DAL GIORGNO CHE GLI APPARTIENE
//probabilmente dovrò effettuare un controllo sul primo giorno e controllare se ha valore lunedi (vedere documentazione di moment)


