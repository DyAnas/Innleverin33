import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { sporsmal, Isporsmal } from './Sporsmal';

import { HttpClient, HttpHeaders } from '@angular/common/http';




@Component({
  selector: 'app-root',
    templateUrl: './app.component.html',
  
})
export class AppComponent {
    title = 'app';
    VisType: boolean;
    laster: boolean;
    alleTyper: Array<sporsmal>;
  
    VisBilSp: boolean;
    etSp: sporsmal;
    alleSporsmal: Array<sporsmal>;
    etSv: sporsmal;
    visSvar: boolean;
    VisEnSp: boolean;
    visSkjema: boolean;
    ViRuSp: boolean;
    skjemaStatus: string;
    skjema: FormGroup;
    TypeId: string;
    rating: number;
    



    constructor(private _http: HttpClient, private fb: FormBuilder) {
        this.skjema = fb.group({
            Id: [""],
            sporsmal: [null, Validators.compose([Validators.required, Validators.pattern("^[a-zøæåA-ZØÆÅ. \\-]{2,200}$")])],
            svar: [""],
            rating: [0],
            TypeId: [""],
            stemmer: [0],
            type: [""],
        });
    }

    ngOnInit() {
        this.laster = true;
        this.visSkjema = false;
        this.hentAlletyper();
        this.VisType = true;
        this.VisBilSp = false;
        this.ViRuSp = false;
        this.visSvar = true;
        this.VisEnSp = false;
    
    }
    hentAlletyper() {
        this._http.get<Isporsmal[]>("api/Svar/")
            .subscribe(
                typer => {
                    
                    this.alleTyper = typer;
                    this.laster = false;
                    this.VisBilSp = false;
                    this.ViRuSp = false;
                },
                error => alert(error)
            );
    };

    hentalleSporsmal(i:number) {
        i =i+ 1;
        this._http.get<Isporsmal[]>("api/Sporsmal/" + i)
            .subscribe(
                sporsmal => {
                    this.alleSporsmal = sporsmal;
                    this.laster = false;
                    if (i == 1) {


                        this.VisEnSp = false;
                        this.ViRuSp = false;
                        this.visSkjema = false;
                        this.VisBilSp = true;
                        this.VisType = false;
                        this.visSvar = false;

                    }
                    else if (i == 2) {
                        this.VisType = false;
                        this.VisEnSp = true;
                        this.ViRuSp = false;
                        this.visSkjema = false;
                        this.VisBilSp = false;
                        this.visSvar = false;

                    }
                    else if (i == 3) {
                    this.VisEnSp = false;
                    this.ViRuSp = true;
                    this.visSkjema = false;
                    this.VisBilSp = false
                    this.VisType = false;
                    this.visSvar = false;
                    }
                },
                error => alert(error)
        );
     
       
    }
   /*hentSvar(i: number) {
       i = 0;
       i = i + 1;
        this._http.get("api/Svar/" + i)
            .subscribe(
                sp => {

                    this.etSv.svar = sp.toString();
                    this.visSvar = true;
                    
                }
            );
    }*/
    hentSvar() {
        this.visSvar = true;
    }


    visTypeView() {
        this.laster = true;
        
        this.VisType = false;
        this.laster = true;
    }

   vedSubmit() {
       if (this.skjemaStatus == "Registrere") {

             this.lagresp();
        }

        else {
            alert("Feil i applikasjonen!");
        }
    }
    registrerSp() {
        this.visSkjema = true;
        this.VisType = false;
        this.VisEnSp = false;
        this.VisBilSp = false;
        this.ViRuSp = false;
        this.skjema.markAsPristine();
        this.hentAlletyper();
        this.skjemaStatus = "Registrere";

    }

  

    lagresp() {
        
        var sp = new sporsmal();
        
        sp.sporsmal = this.skjema.value.sporsmal;
        sp.rating = 0;
        sp.stemmer = 0;
        sp.svar = " ";
      sp.TypeId = this.skjema.value.TypeId ;
        
        const body: string = JSON.stringify(sp);

        const headers = new HttpHeaders({ "Content-Type": "application/json" })
        this._http.post("api/Svar" , body, { headers: headers })
            .subscribe(
                () => {
                    this.hentAlletyper();
                    this.visSkjema = false;
                    this.VisType = true;
                   
                    console.log("ferdig post-api/Svar");
                },
                error => alert(error)
            );
    };
    tilbakeTilListe() {
        this.VisType = true;
        this.visSkjema = false;
        this.VisBilSp = false;
        this.VisEnSp = false;
        this.ViRuSp = false;

    }

    stemSpOpp(i: number) {
        i = i + 1;
        const poeng = new sporsmal();
        poeng.Id = i;
        poeng.TypeId = 1;
        const body: string = JSON.stringify(poeng);
        const headers = new HttpHeaders({ "Content-Type": "application/json" });

        this._http.put("api/Sporsmal/", body, { headers: headers }).subscribe
           ( ()=> {
              // this.hentalleSporsmal(poeng.TypeId);
               if (poeng.Id < 6) {
                   this.hentalleSporsmal(0);
               } else if (poeng.Id > 5 && poeng.Id < 8) {
                
                   this.hentalleSporsmal(1);
               }
               else if (poeng.Id > 8 && poeng.Id < 12) {
             
                   this.hentalleSporsmal(2);
               } else {

                   this.VisType = true;
               }
               
                
               this.visSvar = false;
               console.log("ferdig post-api/Sporsmal");
           },
               error => alert(error),
           );
           
    }

    stemSpned(i: number) {
        i = i + 1;
        const poeng = new sporsmal();
        poeng.Id = i;
        
        const body: string = JSON.stringify(poeng);
        const headers = new HttpHeaders({ "Content-Type": "application/json" });

        this._http.put("api/Svar/", body, { headers: headers }).subscribe
            (() => {
              // this.hentalleSporsmal(poeng.TypeId);
                 if (poeng.Id < 6) {
                   this.hentalleSporsmal(0);
               } else if (poeng.Id > 5 && poeng.Id < 8) {
                
                   this.hentalleSporsmal(1);
               }
               else if (poeng.Id > 8 && poeng.Id < 12) {
             
                   this.hentalleSporsmal(2);
               } else {

                   this.VisType = true;
               }



                this.visSvar = false;
                console.log("ferdig post-api/Svar");
            },
                error => alert(error),
            );

    }
}
