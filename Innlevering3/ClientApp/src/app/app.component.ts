import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { sporsmal, Isporsmal } from './Sporsmal';

import { HttpClient, HttpHeaders } from '@angular/common/http';




@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./StyleSheet.css']

})
export class AppComponent {
    title = 'app';
    VisType: boolean;
    laster: boolean;
    alleTyper: Array<sporsmal>;
    types: any;
    VisBilSp: boolean;
    etSp: sporsmal;
    alleSporsmal: Array<sporsmal>;
    etSv: sporsmal;
    visSvar: number;
    VisEnSp: boolean;
    visSkjema: boolean;
    ViRuSp: boolean;
    skjemaStatus: string;
    skjema: FormGroup;
    typeId: any;
    rating: number;
    bil: boolean;
    en: boolean;
    rut: boolean;
    visKontak: boolean;


    constructor(private _http: HttpClient, private fb: FormBuilder) {
        let regexpEmail =new RegExp('^[a-zåæøA-ZÅØÆ0-9._%+-]+@[a-zåøæA-ZÅØÆ0-9.-]+\.[a-zA-Z]{2,4}$')
        this.skjema = fb.group({
            Id: [""],
            sporsmal: [null, Validators.compose([Validators.required, Validators.pattern("^[a-zøæåA-ZØÆÅ. \\-]{2,200}$")])],
            svar: [""],
            rating: [0],
            typeId: [""],
            stemmer: [0],
            type: [""],
            fornavn: [null, Validators.compose([Validators.required, Validators.pattern("^[a-zøæåA-ZØÆÅ. \\-]{2,40}$")])],
            etternavn: [null, Validators.compose([Validators.required, Validators.pattern("^[a-zøæåA-ZØÆÅ. \\-]{2,40}$")])],
            epost: [null, Validators.compose([Validators.required, Validators.pattern(regexpEmail)])],
            kundeId:[""],
        });
    }

    ngOnInit() {
        this.laster = true;
        this.visSkjema = false;
        this.hentAlletyper();
        this.VisType = true;
        this.VisBilSp = false;
        this.ViRuSp = false;
        // this.visSvar = true;
        this.VisEnSp = false;

    }
    hentAlletyper() {
        this._http.get<Isporsmal[]>("api/Svar/")
            .subscribe(
                typer => {
                   // this.VisType = true;
                    this.alleTyper = typer;
                    this.laster = false;
                    this.visKontak = false;
                    //this.VisBilSp = false;
                    //this.ViRuSp = false;
                },
                error => alert(error)
            );
    };

    hentalleSporsmal(i: number) {
        
        this._http.get<Isporsmal[]>("api/Sporsmal/" + i)
            .subscribe(
                sporsmal => {
                    this.alleSporsmal = sporsmal;
                    
                    this.laster = false;
                    if (i == 1) {

                        this.visKontak = false;
                        this.bil = true;
                        this.rut = false;
                        this.en = false;
                        this.visSkjema = false;
                        this.VisBilSp = true;
                        this.VisType = false;
                        //     this.visSvar = false;

                    }
                    else if (i == 2) {
                        this.VisType = false;
                        this.visKontak = false;
                        this.bil = false;
                        this.rut = false;
                        this.en = true;
                        this.visSkjema = false;
                        this.VisBilSp = true;
                        //  this.visSvar = false;

                    }
                    else if (i == 3) {
                        this.visKontak = false;
                        this.bil = false;
                        this.rut = true;;
                        this.en = false;
                        this.visSkjema = false;
                        this.VisBilSp = true
                        this.VisType = false;
                        //   this.visSvar = false;
                    }
                   
                },
                error => alert(error)
            );


    }

    hentSvar(i) {

        this.visSvar = i;

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
     //   this.VisEnSp = false;
        this.VisBilSp = false;
     //   this.ViRuSp = false;

        this.visKontak = false;
        this.skjema.markAsPristine();
        this.hentAlletyper();
        this.skjemaStatus = "Registrere";

    }
    velgtype(i) {
        this.types = i;
    }


    lagresp() {

        var sp = new sporsmal();

        sp.sporsmal = this.skjema.value.sporsmal;
        sp.rating = 0;
        sp.stemmer = 0;
        sp.svar = "";
        sp.typeId = this.types;
        sp.fornavn = this.skjema.value.fornavn;
        sp.etternavn = this.skjema.value.etternavn;
        sp.epost = this.skjema.value.epost;

        const body: string = JSON.stringify(sp);

        const headers = new HttpHeaders({ "Content-Type": "application/json" })
        this._http.post("api/Svar", body, { headers: headers })
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


    }

    stemSpOpp(i,d) {
      
        const poeng = new sporsmal();
        poeng.id = i;
        poeng.typeId = d;
        const body: string = JSON.stringify(poeng);
        const headers = new HttpHeaders({ "Content-Type": "application/json" });

        this._http.put("api/Sporsmal/", body, { headers: headers }).subscribe
            (() => {
                this.visSvar = -1;
              //  this.hentalleSporsmal(poeng.typeId);
                // this.hentalleSporsmal(poeng.TypeId);
             
                if (poeng.id < 6) {
                   
                    this.hentalleSporsmal(poeng.typeId);
               
                } else if (poeng.id > 5 && poeng.id < 8) {

                    this.hentalleSporsmal(poeng.typeId);
                }
                else if (poeng.id > 7 && poeng.id < 11) {

                    this.hentalleSporsmal(poeng.typeId);
                } else {
                    this.VisType = true;
                    this.hentAlletyper();
                    this.bil = false;
                    this.rut = false;
                    this.en = false;

                }
                console.log("ferdig post-api/Sporsmal");
            },
                error => alert(error),
            );

    }

    stemSpned(i, d) {
       
        const poeng = new sporsmal();
        poeng.id = i;
        poeng.typeId = d;
        const body: string = JSON.stringify(poeng);
        const headers = new HttpHeaders({ "Content-Type": "application/json" });

        this._http.put("api/Svar/", body, { headers: headers }).subscribe
            (() => {
                // this.hentalleSporsmal(poeng.TypeId);
                this.visSvar = -1;
                if (poeng.id < 6) {
                    i = 0;
                  
                    this.hentalleSporsmal(poeng.typeId);
                

                } else if (poeng.id > 5 && poeng.id < 8) {

                    this.hentalleSporsmal(poeng.typeId);
                }
                else if (poeng.id > 7 && poeng.id < 12) {

                    this.hentalleSporsmal(poeng.typeId);
                } else {
                    this.hentAlletyper();
                    this.VisType = true;
                    this.bil = false;
                    this.rut = false;
                    this.en = false;
                }



               // this.visSvar = -1;
                console.log("ferdig post-api/Svar");
            },
                error => alert(error),
            );

    }
}
