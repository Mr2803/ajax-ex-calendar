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

$(document).ready(function () {






   $.ajax({
      url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
      method: "GET",
      success: function (data) {
         console.log(data.response)

         var daysNumber = moment("2018-01-01", "YYYY-MM-DD").daysInMonth();
         
         for (i = 1; i <= daysNumber; i++) {
            var dataCorrente = "2018-01-" + i;
            var formatoData = moment(dataCorrente).format("YYYY-MM-DD")
            var giornoCorrente = moment(dataCorrente).format("DD MMMM");
            $(".calendar").append('<li data-date="' + formatoData +'">'+ giornoCorrente +'</li>');
         }
         for (var i = 0; i < data.response.length; i++) {
            console.log("queste sono le date delle festività " + data.response[i].date)

            var festivita = data.response[i].date  
            $(".calendar [data-date='" + festivita + "']").css("color","red").append(" "+data.response[i].name)
               /* $(".calendar").append('<li data-date="' + dataCorrente + '">' + giornoCorrente + '</li>').css("color","red") */

            
         }

         


      },
      error: function (richiesta, stato, errori) {
         alert("E' avvenuto un errore. " + " " + richiesta + " " + stato + " " + errori);
      }
   });

})