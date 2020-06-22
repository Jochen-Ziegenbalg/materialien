
// Globale Variable: 
var obergrenze = 200;
var gefunden = 0; 
var SiebArray = new Array(obergrenze);
var NaechsteStreichzahl = 2;
var SiebString = "";    
var PrimzahlString = "";
var spaltenzahl = 18; 
var LayerLinks = 10;
var LayerOben = 100;  
var NumberOfColours = 10; 
var ColorArray = new Array("olive",   "blue",   "yellow", "red",    "silver", 
                           "black",   "lime",   "green",   "navy",  "fuchsia"); 
var StreichFarbenIndex = 0;  
var StreichFarbe = ColorArray[StreichFarbenIndex]; 	
var StreichFeldArray = new Array("&nbsp;&nbsp;***", "&nbsp;&nbsp;---", "&nbsp;&nbsp;///", 
                                 "&nbsp;&nbsp;...", "&nbsp;&nbsp;+++", 
                                 "&nbsp;&nbsp;###", "&nbsp;&nbsp;===", 
                                 "&nbsp;&nbsp;%%%", "&nbsp;&nbsp;:::", "&nbsp;&nbsp;$$$"); 
var StreichFeldIndex = 0;
var StreichFeld = StreichFeldArray[StreichFeldIndex]; 
var initialisiertP = 17; 
var gestoppt = 0; 

var Sprache = 1;
var naechsteZahl = new Array("Naechste zu verarbeitende Zahl: &nbsp;&nbsp; ", 
							 "Next number to be processed: &nbsp;&nbsp; "); 
var Wurzelueberschritten = new Array("Die Wurzel ist ueberschritten. &nbsp;&nbsp; ", 
					    			 "You have passed the square root. &nbsp;&nbsp; "); 
var Wurzelerreicht1 = new Array("Die Wurzel ist erreicht. &nbsp;&nbsp; ", 
							 "You have reached the square root. &nbsp;&nbsp; "); 
var Wurzelerreicht2 = new Array("(Sie wird im naechsten Schritt verarbeitet.) ", 
							 "(It will be processed in the next step.) "); 
var Obergrenzeerreicht = new Array("Die Obergrenze ist erreicht. ", 
						   	       "You have reached the upper limit. "); 
var Fertig = new Array("Ende des Verfahrens. ", 
					   "Done. "); 
var gefundenePrimzahlen = new Array("Gefundene Primzahlen: &nbsp;&nbsp; ", 
							 "Primes found: &nbsp;&nbsp; "); 
var AnzahlderPrimzahlen = new Array("Anzahl der gefundenen Primzahlen: &nbsp;&nbsp; ", 
							 "The number of the primes found: &nbsp;&nbsp; "); 
var abgebrochen = new Array("Das Verfahren wurde vorzeitig abgebrochen. &nbsp;&nbsp; ", 
				  		    "The process was stopped prematurely. &nbsp;&nbsp; "); 

function Ausgabe(ziel, ausgabeobjekt){
  //document.getElementById(ziel).firstChild.nodeValue =  ausgabeobjekt;
  document.getElementById(ziel).innerHTML =  ausgabeobjekt;
}

function rechtsbuendig(Zeichenkette, Stellenzahl) {
  var l = Zeichenkette.length;
  while(l < Stellenzahl) {
    Zeichenkette = "&nbsp;" + Zeichenkette; 
		l=l+1
  }
  return Zeichenkette.fixed()
}

function SiebArrayToString(){
  var s = "&nbsp; <br>";
	for (var i=1; i <= obergrenze; i=i+1) {
	  s = s + rechtsbuendig(SiebArray[i]+"", 5);
		if ((i % spaltenzahl) == 0) {
		  s = s + "<br>";
		}	
	} 
  return s; 
}

function PrimzahlenSammeln(){
  var ps = "";   // Primzahl-String 
  gefunden = 0;
	for (var i=1; i <= obergrenze; i = i+1) {
	  if (! isNaN(parseInt(SiebArray[i]))){	
  	  ps = ps + rechtsbuendig(SiebArray[i]+"", 5);
			gefunden = gefunden+1; 
  		if ((gefunden % spaltenzahl) == 0) {ps = ps + "<br>";
			}
		}	
	}  
	return ps; 
}

function SiebVielfacheStreichen(NaechsteStreichzahl){
  
  if (StreichFarbenIndex == NumberOfColours - 1) {StreichFeldIndex = (StreichFeldIndex + 1) % 10 ;  
                                StreichFeld = StreichFeldArray[StreichFeldIndex] };
    
  StreichFarbenIndex = (StreichFarbenIndex + 1) % NumberOfColours; 
  StreichFarbe = ColorArray[StreichFarbenIndex]; 
	if(SiebArray[NaechsteStreichzahl] != "***"){
	  for (var i=2; i*NaechsteStreichzahl <= obergrenze; i = i+1){
	     SiebArray[i*NaechsteStreichzahl] = StreichFeld.fontcolor(StreichFarbe)      
		}
  }	
}	

function SiebNext() {
  if (NaechsteStreichzahl<obergrenze) {NaechsteStreichzahl = NaechsteStreichzahl+1}; 
  while( (NaechsteStreichzahl < obergrenze) && (isNaN(parseInt(SiebArray[NaechsteStreichzahl]))) ) 
	  {NaechsteStreichzahl = NaechsteStreichzahl+1}; 	
 	KriterienPruefen(NaechsteStreichzahl)
}	

function SiebWeiter() { 
  if (gestoppt == 1) {SiebStart()}; 
  if (! (initialisiertP == 1)) {SiebStart()}; 
  if( ! (document.Eratosthenes.grenze.value > 2)) {
	  SiebStart()}; 
  if( ! (document.Eratosthenes.spaltenzhl.value > 0)) {
	  SiebStart()}; 
  if( ! (document.Eratosthenes.grenze.value == obergrenze)) {
	  SiebStart()}; 
  if( ! (document.Eratosthenes.spaltenzhl.value == spaltenzahl)) {
	  SiebStart()}; 
  AktualisiereDokument(); 
	SiebVielfacheStreichen(NaechsteStreichzahl);
	SiebString = SiebArrayToString(); 
  AktualisiereDokument(); 
  SiebNext()  
}	

function AusgabePrimzahlen() {
    PrimzahlString = PrimzahlenSammeln(SiebArray); 
	 Ausgabe("Layer1", SiebString  + "<br>" + "<br>" + gefundenePrimzahlen[Sprache] + "<br>" 
		+ PrimzahlString + "<br>" + "<br>" 
		+ AnzahlderPrimzahlen[Sprache] + "&nbsp;" + "&nbsp;" +  gefunden + "&nbsp;" )
}

function KriterienPruefen(NaechsteStreichzahl){
  Ausgabe("Layer2", naechsteZahl[Sprache] + NaechsteStreichzahl); 
	if(NaechsteStreichzahl ==  Math.sqrt(obergrenze)) {
	  Ausgabe("Layer3", Wurzelerreicht1[Sprache] + "<br>" +  "&nbsp;" + Wurzelerreicht2[Sprache])
	}; 
	if(NaechsteStreichzahl >  Math.sqrt(obergrenze)) {
	  Ausgabe("Layer3",   Wurzelueberschritten[Sprache] )
	}; 
	if(NaechsteStreichzahl == obergrenze) {Ausgabe("Layer4", Obergrenzeerreicht[Sprache]); 
	Ausgabe("Layer2", Fertig[Sprache] ); 
     AusgabePrimzahlen()}
}

function AktualisiereDokument(){
	Ausgabe("Layer1", SiebString);
	Ausgabe("Layer2", " "); 
	Ausgabe("Layer3", " "); 
	Ausgabe("Layer4", " "); 
}

function SiebArrayInitialisierung() {
	for (var i=0; i <= obergrenze; i = i+1) {SiebArray[i] = i}; 
	SiebArray[1] = "&nbsp;&nbsp;***".fontcolor("white"); 
	initialisiertP = 1 
}

function SiebStart() {
  if( ! (document.Eratosthenes.grenze.value > 2)) {
	  document.Eratosthenes.grenze.value = 200}; 
	  obergrenze = document.Eratosthenes.grenze.value; 
	if( ! (document.Eratosthenes.spaltenzhl.value > 0)) { 
		  document.Eratosthenes.spaltenzhl.value = 18};
		spaltenzahl = document.Eratosthenes.spaltenzhl.value;	
	gestoppt = 0;
	gefunden = 0;	
	NumberOfColours = 10; 
	NaechsteStreichzahl = 2; 
	SiebString = "";
	StreichFarbenIndex = 0;  
	StreichFarbe = ColorArray[StreichFarbenIndex]; 		
	StreichFeldIndex = 0;
    StreichFeld = StreichFeldArray[StreichFeldIndex]; 										  
	SiebArrayInitialisierung(); 
	SiebString = SiebArrayToString(); 
	AktualisiereDokument();
	KriterienPruefen(NaechsteStreichzahl);
	SiebArray[1] = "&nbsp;&nbsp;***".fontcolor("white") 
}

function SiebStop() { 
	AusgabePrimzahlen();  
	if(NaechsteStreichzahl <=  Math.sqrt(obergrenze)) {
		 Ausgabe("Layer1", SiebString  + "<br>" + "<br>" + abgebrochen[Sprache] )
	  	 };  
	gestoppt=1;   	 
}
