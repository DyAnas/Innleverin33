import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { sporsmal, Isporsmal } from './Sporsmal';
import { type, Itype } from './Type';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'app';
    VisType: boolean;
    laster: boolean;
    alleTyper: Array<sporsmal>;
    enType: type;
    VisBilSp: boolean;
    etSp: sporsmal;
    alleSporsmal: Array<sporsmal>;
    etSv: any;
    visSvar: boolean;
    VisEnSp: boolean;
    visSkjema: boolean;
    ViRuSp: boolean;
    skjemaStatus: string;
    skjema: FormGroup;
    TypeId: sporsmal;


    constructor(private _http: HttpClient, private fb: FormBuilder) {
        this.skjema = fb.group({
            Id: [""],
            sporsmal: [null, Validators.compose([Validators.required, Validators.pattern("^[a-zøæåA-ZØÆÅ. \\-]{2,200}$")])],
            svar: [null, Validators.compose([Validators.required, Validators.pattern("^[a-zøæåA-ZØÆÅ. \\-]{2,200}$")])],
            rating: [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]$")])],
            stemmer: [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]$")])],
        });
    }

    ngOnInit() {
        this.laster = true;
        this.visSkjema = true;
        this.hentAlletyper();
        this.VisType = true;
        this.VisBilSp = false;
      
    }
    hentAlletyper() {
        this._http.get<Isporsmal[]>("api/Svar/")
            .subscribe(
                typer => {
                    
                    this.alleTyper = typer;
                    this.laster = false;
                    
                },
                error => alert(error)
            );
    };

    hentalleSporsmal(TypeId:number) {
    
        this._http.get<Isporsmal[]>("api/Sporsmal/" )
            .subscribe(
                sporsmal => {
                    this.alleSporsmal = sporsmal;
                   
                   
                  //  this.alleTyper = sp;
               
                    //if () {
                    
                       /* this.laster = true;
                        this.VisEnSp = false;
                        this.ViRuSp = false;*/
                  //  }
                /*    else if (TypeId == 2) {
                        this.VisEnSp = true;
                        this.VisBilSp = false;
                        this.ViRuSp = false;
                    }
                    else if (TypeId == 3)
                        this.ViRuSp = true;
                    this.VisEnSp = false;
                    this.VisBilSp = false;*/

                },
                error => alert(error)
        );
        this.laster = false;
        this.VisBilSp = true;
        this.VisType = false;
    }
    hentSvar(Id: number) {
        this._http.get("api/Svar/" + Id)
            .subscribe(
                sp => {
                    this.etSv.svar = sp;
                    this.visSvar = true;
                }
            );
    }

    visTypeView() {
        this.laster = true;
        
        this.VisType = false;
        this.laster = true;
    }

    vedSubmit() {
        if (this.skjemaStatus == "Registrere") {

            //this.lagresp();
        }

        else {
            alert("Feil i applikasjonen!");
        }
    }
    /*
    lagresp() {
        var sp = new sporsmal();
        sp.sporsmal = this.skjema.value.spørmål;
        sp.rating = 0;
        sp.stemmer = 0;
        sp.svar = "";
        sp.TypeId = this.skjema.value.TypeId;

        const body: string = JSON.stringify(sp);

        const headers = new HttpHeaders({ "Content-Type": "application/json" })
        this._http.post("api/Sporsmal", body, { headers: headers })
            .subscribe(
                () => {
                    this.hentalleSporsmal(TypeId);
                    this.visSkjema = false;
                    this.VisType = true;
                    console.log("ferdig post-api/Sporsmal");
                },
                error => alert(error)
            );
    };
    tilbakeTilListe() {
        this.VisType = true;
        this.visSkjema = false;
        this.VisBilSp = false;
    }*/

    stemSpOpp(Id: number) {
        this._http.get("api/Sporsmal/" + Id)
            .subscribe(
                returData => {
                  //  let res = returData.json();

                }
            )
    }

}
