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

/* var giorniMese = moment("2019-02", "YYYY-MM").daysInMonth(); */
/* var genuary = moment("2018-01" , "YYYY-MM");
console.log("questa variabile indica il mese di gennaio 2018" + genuary)

var day1 = genuary.format("DD")
console.log(day1) */
   var meseAnno = moment("2018-01", "YYYY-MM");
console.log("questo è il valore del mese che mi serve " + meseAnno);




for (i = 1; i <= meseAnno.daysInMonth(); i++) {
   console.log("giorno", i , "di", meseAnno.format("MMMM"))
}

//2015-10-31





   $.ajax({
      url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
      method: "GET",
      success: function (data, stato) {

      },
      error: function (richiesta, stato, errori) {
         alert("E' avvenuto un errore. " + " " + richiesta + " " + stato + " " + errori);
      }
   });

})