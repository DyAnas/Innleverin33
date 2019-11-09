"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/map");

var sp = require("./sporsmal");
var http_2 = require("@angular/http");

var SPA = (function () {
    this._http = _http;
    this.fb = fb;
    this.skjema = fb.group({
        Id: [""],
        sporsmal: [null, Validators.compose([Validators.required, Validators.pattern("^[a-zøæåA-ZØÆÅ. \\-]{2,200}$")])],
        svar: [""],
        rating: [0],
        stemmer:[0],
        TypeId: [""],
        type: [""],
    });
 


SPA.prototype.ngOnInit = function () {
    this.laster = true;
    this.visSkjema = false;
    this.hentAlletyper();
    this.VisType = true;
    this.VisBilSp = false;
    this.ViRuSp = false;
    this.visSvar = true;
    this.VisEnSp = false;
};
SPA.prototype.hentAlletyper = function () {
    var _this = this;
    this._http.get("api/Svar").map(function (returData) {
        var JsonData = returData.json();
        return JsonData;
    }).subscribe(function (JsonData){
        _this.alleTyper = [];
        if (JsonDta) {
            for (var _i = 0, JsonData_1 = JsonData; _i < JsonData_1.length; _i++) {
                var typeObjekt = JsonData_1[_i];
                _this.alleTyper.push(typeObjekt);
                _this.laster = false;
            }
        };
    }, function (error) { return alert(error); }, function() {
        return console.log("ferdig get-api/Svar");
    });
};

SPA.prototype.hentalleSporsmal = function (i) {
    var _this = this;
    this._http.get("api/"api / Sporsmal / " + i")
        .map(function (returData) {
            var JsonData = returData.Json();
            return returData;
        })
        .subscribe(function (JsonData) {
            _this.alleSporsmal = [];

            if (JsonData) {
                for (var _i = 0, JsonData_1 = JsonData; _i < JsonData_1.length; i++) {
                    var spObjekt = JsonData_1[_i];
                    _this.alleSporsmal.push(spObjekt);
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
                }

            }
            ;
      }, function (error) { return alert(error); }, function () {
            return console.log("ferdig get-api/Svar");
        });
};

SPA.prototype.hentSvar = function () {
    this.visSvar = true;
};
SPA.prototype.visTypeView = function () {
    this.laster = true;
    this.VisType = false;
    this.laster = true;
};
SPA.prototype.vedSubmit = function () {
    if (this.skjemaStatus == "Registrere") {
        this.lagresp();
    } else {
        alert("Fei i applikasjon");
    }
};
SPA.prototype.registrerSp = function () {
    this.visSkjema = true;
    this.VisType = false;
    this.VisEnSp = false;
    this.VisBilSp = false;
    this.ViRuSp = false;
    this.hentAlletyper();
}

SPA.prototype.lagresp = function () {
    var _this = this;
    let i = this.skjema.value.TypeId + 1;
    var lagresp = new sp.sporsmal();
    lagresp.sporsmal = this.skjema.value.sporsmal;
    lagresp.rating = 0;
    lagresp.stemmer = 0;
    lagresp.svar = " ";
    lagresp.TypeId = this.skjema.value.TypeId;


    var body = JSON.stringify(sp);
    var headers = new http_2.Headers({ "Content-Type": "application/json" });
    this._http.post("api/Svar", body, { headers: headers })
        .map(function (returData) { return returData.toString(); })
        .subscribe(function (retur) {
            _this.hentAlletyper();
        }, function (error) { return alert(error); }, function () { return console.log("ferdig post-api/Svar/"); });

};

SPA.prototype.tilbakeTilListe = function () {
    this.VisType = true;
    this.visSkjema = false;
    this.VisBilSp = false;
    this.VisEnSp = false;
    this.ViRuSp = false;
    };

    SPA.prototype.stemSpOpp = function (i) {
        var _this = this;
        var nyrating = new sp.sporsmal();
        i = i + 1;
        nyrating.Id = i;
        nyrating.TypeId = 1;
        var body = JSON.stringify(nyrating);
        var headers = new http_2.Headers({ "Content-Type": "application/json" });
        this._http.put("api/Sporsmal/", body, { headers: headers })
            .map(function (returData) {
                return returData.toString();
            }).subscribe(function (retur) {
                this.hentalleSporsmal(nyrating.TypeId);
                this.VisEnSp = true;
                this.visSvar = false;


            }, function (error) { return alert(error); }, function () { return console.log("ferdig post-api/Sporsmal"); }
            );

    };
return SPA;
} ());

SPA = __decorate([
    core_1.Component({
        selector: "min-app",
        templateUrl: "./app/app.component.html"
    }),
    __metadata("design:paramtypes", [http_1.Http, forms_1.FormBuilder])
], SPA);
exports.SPA = SPA;
