using Microsoft.Extensions.DependencyInjection;
using Innlevering3.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Innlevering3
{
    public class SporsmalIntilaizer
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<SporsmalContext>();
            context.Database.EnsureCreated();
            if (!context.TypeSporsmal.Any())
            {
                List<DBType> type = hentType();
                foreach (var t in type)
                {
                    context.TypeSporsmal.Add(t);
                }
                context.SaveChanges();
            }

        }
        private static List<DBType> hentType()
        {
            List<DBType> typeSpørmål = new List<DBType>();

            var t1 = new DBType { type = "Billetter", sporsmal = hentspørsmål1() };
            var t2 = new DBType { type = "Endring", sporsmal = hentspørsmål2() };
            var t3 = new DBType { type = "ruter", sporsmal = hentspørsmål3() };

            typeSpørmål.Add(t1);
            typeSpørmål.Add(t2);
            typeSpørmål.Add(t3);

            return typeSpørmål;
        }

        private static List<DBSporsmal> hentspørsmål1()
        {
            List<DBSporsmal> sp1 = new List<DBSporsmal>();
            var s1 = new DBSporsmal
            {
                sporsmal = "Hvordan kjøper jeg billett?",
                svar = "På vy.no får du kjøpt de fleste billetter " +
                 "ved å bruke reiseplanleggeren. " +
                 "Reiser du på Østlandet og i Hordaland," +
                 " kan du på visse strekninger kjøpe 7 og 30 dagers" +
                 " elektronisk periodebillett på vy.no. " +
                 "Reisende i Rogaland kan kjøpe " +
                 "elektronisk periodebillett i Vy-appen " +
                 "eller periodebillett på reisekort hos Kolumbus. " +
                 "En periodebillett med setereservasjon kan kun kjøpes i Vy-appen.",
                rating = 0,
            };
            var s2 = new DBSporsmal
            {
                sporsmal = "Hvordan henter jeg billetter kjøpt på vy.no?",
                svar = "Skriv ut billetten hjemme eller ha den digitalt" +
                      "Med PDF-billett kan du laste ned billetten din selv og ta den med på toget." +
                     " Du kan skrive den ut på papir eller ha den med på mobil, nettbrett eller PC.",
                rating = 0
            };
            var s3 = new DBSporsmal
            {
                sporsmal = "Jeg får feilmelding når jeg betaler på vy.no – hva gjør jeg? ",
                svar = "Det kan være mange årsaker til dette, som for eksempel:" +
             "Det er noe med nettleseren din som gjør at ikke kjøpsløsningen fungerer optimalt. Vi anbefaler at du prøver igjen med Chrome." +
              "Hvis profilen din er registrert med et telefonnummer som inneholder spesialtegnet +, så kan dette føre til feil ved betaling." +
              "Det kan være noe feil med det lagrede betalingskortet ditt. Prøv å slette dette og lagre det på nytt. ",
                rating = 0
            };
            var s4 = new DBSporsmal
            {
                sporsmal = "Hva er reisekort?",
                svar = "Med reisekort reiser du med elektronisk billett hos Vy og Ruter," +
                 " som samarbeider om kortsystemet elektronisk reisekort. Reisekortet gjelder i Oslo og Akershus." +
                              "Du kan kjøpe reisekort fra kundeservice eller på betjent stasjon.",
                rating = 0
            };
            sp1.Add(s1);
            sp1.Add(s2);
            sp1.Add(s3);
            sp1.Add(s4);
            return sp1;
        }

        private static List<DBSporsmal> hentspørsmål2()
        {

            List<DBSporsmal> sp2 = new List<DBSporsmal>();
            var S1 = new DBSporsmal
            {
                sporsmal = "Hvordan kan jeg endre eller refundere billetten?",
                svar = "Hvis du har enkeltbillett og vil endre eller refundere billetten din, " +
                 "så kan du gjøre det gratis frem til 24 timer før avgang. Ved mindre enn 24 timer før avgang må du betale et gebyr." +
                 " Miniprisbilletter kan ikke endres eller refunderes.",
                rating = 0
            };
            var s2 = new DBSporsmal
            {
                sporsmal = "Hvordan endrer jeg navn på billetten?",
                svar = "Når du kjøper billetter så er det navnet til den som bestiller som står på billettene. " +
                    "Det er altså ikke noe i veien for at det står samme navn på flere "
                      + ", så lenge personen som bestilte billettene skal være med på reisen.",
                rating = 0
            };
            var s3 = new DBSporsmal
            {
                sporsmal = "Jeg rakk ikke toget. Kan jeg få refundert billetten?",
                svar = "Alle billetter må refunderes før avgang, du vil ikke ha krav på refusjon " +
                "etter togavgangen dersom du ikke rekker toget ditt.",
                rating = 0
            };
            var s4 = new DBSporsmal
            {
                sporsmal = "Toget mitt var forsinket –" +
            " hvilken erstatning har jeg krav på og hvordan søker jeg om dette?",
                svar = "Du har rett til å få 50 prosent av billettprisen refundert ved:" +
          "Forsinkelse på over én time med Vys tog mellom Oslo og Trondheim, Oslo og Bergen.",
                rating = 0
            };

            sp2.Add(s2);
            sp2.Add(s3);
            sp2.Add(s4);
            return sp2;

        }

        private static List<DBSporsmal> hentspørsmål3()
        {

            List<DBSporsmal> sp3 = new List<DBSporsmal>();
            var s1 = new DBSporsmal
            {
                sporsmal = "Hvordan finner jeg ut om toget mitt er i rute?",
                svar = "Sjekk om toget ditt er i rute her på vy.no, søk på avgangen" +
                 " i appen eller abonner på pushvarsling om avvik i appen. Ellers skal " +
                 "du også få beskjed på tavler og over høyttaler" +
                 " på stasjonen om eventuelle avvik. Personalet om " +
                 "bord skal også holde deg informert.",
                rating = 0
            };
            var s2 = new DBSporsmal
            {
                sporsmal = "Hvordan finner jeg rutetidene?",
                svar = "Du kan raskt og enkelt gjøre et rutesøk i reiseplanleggeren ",
                rating = 0
            };
            var s3 = new DBSporsmal
            {
                sporsmal = "Du kan raskt og enkelt gjøre et rutesøk i reiseplanleggeren ",
                svar = "I rushtidene er alt vi har av tilgjengelig materiell i bruk. Vi forsøker" +
                  " å matche etterspørselen med «riktig» kapasitet så langt det lar seg gjøre," +
                  " likevel er det ikke mulig å tilby sitteplasser til alle. " +
                  "Vi får stadig flere togsett levert fra fabrikk så på " +
                  "sikt øker det muligheten til å kjøre flere avganger " +
                  "med doble togsett.Det kan imidlertid være mange grunner " +
                  "til at et tog er veldig fullt. For eksempel om en tidligere" +
                  " avgang ble forsinket eller innstilt kan det føre til at neste " +
                  "tog vil ha flere passasjerer enn vanlig. Noen ganger kan det " +
                  "også være uforutsette hendelser som gjør at vi ikke kan kjøre" +
                  " med det planlagte antall togsett eller vogner. " +
                  "Da blir det ofte satt opp buss i tillegg til toget.",
                rating = 0
            };

            sp3.Add(s1);
            sp3.Add(s2);
            sp3.Add(s3);

            return sp3;
        }
    }
}
