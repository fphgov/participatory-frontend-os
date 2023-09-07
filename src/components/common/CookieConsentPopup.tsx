'use client'

import React, { useEffect, useState } from 'react'
import 'vanilla-cookieconsent'
import 'vanilla-cookieconsent/dist/cookieconsent.css'
import { init } from '@socialgouv/matomo-next'
import { useRouter } from 'next/navigation'

function CookieConsentPopup({}): JSX.Element {
  const router = useRouter()
  const [popup, setPopup] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const cc = initCookieConsent()

    setPopup(document.getElementById('cc--main'))

    if (popup) { popup.remove() }

    cc.run({
      autorun: true,
      current_lang: 'hu',
      autoclear_cookies: false,
      page_scripts: true,

      onAccept: function (){
        if (cc.allowedCategory('analytics')) {
          init({
            url: (process.env.NEXT_PUBLIC_MATOMO_URL || '').toString(),
            siteId: (process.env.NEXT_PUBLIC_MATOMO_SITE_ID || '').toString()
          })
        }
      },

      onChange: function (){},

      languages: {
        'hu': {
          consent_modal: {
            title: 'Kedves Látogató!',
            description: `<p><span class="cc_bold">Adataid védelme fontos számunkra.</span></p>
            <p>A(z) otlet.budapest.hu által használt alapvető sütik a weboldal megfelelő működését biztosítják, ahhoz elengedhetetlenek. Ezen kívül a felhasználói élmény javításához szükséges sütiket <span class="cc_bold">csak a Te hozzájárulásod esetén állítjuk be</span>, ezek közül a lenti linken választhatsz.</p>
            <p>A hozzájáruláshoz kötött sütik használatának elfogadásával kijelented, hogy az <a href="/files/adatkezelesi_tajekoztato.pdf">adatkezelési tájékoztató</a>ban foglaltakat megismerted, és az ott írtakat tudomásul véve hozzájárulsz az adott cookie-k használatával járó adatkezeléshez.</p>
              <button type="button" data-cc="c-settings" class="cc-link">Választok a sütik közül</button>`,
            primary_btn: {
              text: 'Elfogadom mindet',
              role: 'accept_all'
            },
            secondary_btn: {
              text: 'Elutasítom mindet',
              role: 'accept_necessary'
            }
          },
          settings_modal: {
            title: 'Süti tájékoztatás',
            save_settings_btn: 'Beállítások mentése',
            accept_all_btn: 'Elfogadom mindet',
            reject_all_btn: 'Elutasítom mindet',
            close_btn_label: 'Bezárás',
            cookie_table_headers: [
              { col1: 'Név' },
              { col2: 'Felhasználás, kezelt adatok köre' },
              { col3: 'Domain' },
              { col4: 'Lejárati idő' },
              { col5: 'Típus' }
            ],
            blocks: [
              {
                title: 'Sütik kezelése',
                description: `<p>Kedves Látogató!</p>
                <p><b>Adataid védelme fontos számunkra.</b></p>
                <p>Az alábbi tájékoztatás az otlet.budapest.hu weboldalon alkalmazott sütikről szól.</p>
                <p>A weboldalon használt alapvető sütik a weboldal megfelelő működését biztosítják, ahhoz elengedhetetlenek.</p>
                <p>Ezen kívül a felhasználói élmény javításához szükséges sütiket <span class="cc_bold">csak a Te hozzájárulásod esetén állítjuk be</span>. Ezen hozzájáruláshoz kötött sütik vonatkozásában az alábbi választási lehetőségekkel élhetsz:</p>

                <p><span class="cc_bold">ELUTASÍTOM MINDET</span> - a felhasználói élmény javításához szükséges sütik alkalmazását nem engedélyezed.</p>
                <p><span class="cc_bold">ELFOGADOM MINDET</span> - hozzájárulásod adod a felhasználói élmény javításához szükséges sütik alkalmazásához.</p>
                <p><span class="cc_bold">VÁLASZTOK A SÜTIKATEGÓRIÁK KÖZÜL</span> - az alábbi választási lehetőségek közül választva eldöntheted, hogy mely sütik alkalmazásához adod hozzájárulásod.</p>

                <p>A hozzájáruláshoz kötött sütik használatának elfogadásával kijelented, hogy az <a href="/files/adatkezelesi_tajekoztato.pdf">adatkezelési tájékoztatóban</a> foglaltakat megismerted, és az ott írtakat tudomásul véve hozzájárulsz az adott cookie-k használatával járó adatkezeléshez.</p>
                <p><span class="cc_bold">Mi az a süti?</span><br />
                A felhasználók számítógépére mentett kis fájl, amely megkönnyíti a meglátogatott webhelyeken alkalmazott beállítások és egyéb információk tárolását. A süti általában tartalmazza annak a webhelynek a nevét, ahonnan érkezett, a süti értékét, azaz egy véletlenszerűen generált egyedi számot, valamint a süti élettartamát, vagyis hogy mennyi ideig tárolódik az eszközön. A süti a felhasználó eszközének háttértárjában egy fájlban tárolódik.</p>
                <p><span class="cc_bold">Milyen sütiket és mire használunk?</span><br>
                A weboldal működéséhez <span class="cc_highlight">elengedhetetlenül szükséges sütik</span>, amelyek elhelyezéséhez nincs szükség a felhasználó hozzájárulására.<br>
                <span class="cc_highlight">Előzetes felhasználói hozzájárulást igénylő sütik</span>, amelyek a felhasználói élmény javításához, vagy a kommunikációs tevékenység optimalizálása érdekében szükségesek. Amennyiben a felhasználó nem járul hozzá ezen sütik elhelyezéséhez, úgy elfogadja, hogy hozzájárulásának hiányában a honlap működése nem minden tekintetben lesz szándékainknak megfelelően biztosított. A felhasználóknak azonban a későbbiekben lehetőségük van bármikor a hozzájárulást igénylő sütik elhelyezésére vonatkozó korábbi döntésük megváltoztatására. Hozzájárulását a láblécen folyamatosan elérhető “Sütibeállítások” menüpontban később is megadhatja.<br>
                <p><span class="cc_bold">Elsődleges süti</span><br>
                Az elsődleges sütiket az otlet.budapest.hu oldal helyezi el a felhasználó eszközén annak érdekében, hogy a weboldal használatához kapcsolódó információkat tárolja benne.</p>
                <p><span class="cc_bold">Harmadik féltől származó sütik</span><br>
                A harmadik féltől származó sütiket más webhelyek hozzák létre és helyezik el a felhasználó eszközén, amelynek segítségével információkat szerezhetnek a felhasználó által meglátogatott weboldalon végzett böngészésekről. Ez esetben a sütiben tárolt és a süti által közvetített információkhoz a sütit elhelyező harmadik fél fér csak hozzá.
                </p>
                <p><span class="cc_bold">Hogyan tudod törölni a sütiket?</span><br>
                A sütik kezelésével kapcsolatos beállításait bármikor megváltoztathatod. Amennyiben az otlet.budapest.hu oldal látogatása során az <span class="cc_bold">ELFOGADOM MINDET</span> vagy a <span class="cc_bold">VÁLASZTOK A SÜTIKATEGÓRIÁK KÖZÜL</span> gombra kattintva elfogadtad a sütik alkalmazását és ezen változtatni szeretnél, azt egyszerűen a böngésződben, a böngészési előzmények törlésével teheted meg.<br>
                A leggyakoribb böngészőkben (Chrome, Edge, Safari, Firefox, Internet Explorer) ezt az alábbiak szerint tudod megtenni:</p>
                <p>- <a href="https://support.google.com/accounts/answer/61416?hl=hu" target="_blank">Google Chrome</a><br>
                -	<a href="https://support.microsoft.com/hu-hu/windows/a-microsoft-edge-a-b%C3%B6ng%C3%A9sz%C3%A9si-adatok-%C3%A9s-az-adatv%C3%A9delem-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank">Microsoft Edge</a><br>
                -	<a href="https://support.apple.com/hu-hu/guide/safari/sfri11471/mac" target="_blank">Safari</a><br>
                -	<a href="https://support.mozilla.org/hu/kb/sutik-informacio-amelyet-weboldalak-tarolnak-szami" target="_blank">Firefox</a><br>
                -	<a href="https://support.microsoft.com/hu-hu/windows/cookie-k-t%C3%B6rl%C3%A9se-%C3%A9s-kezel%C3%A9se-168dab11-0753-043d-7c16-ede5947fc64d#ie=ie-11" target="_blank">Internet Explorer</a></p>
                </p>
                `
              }, {
                title: 'A weboldal működéséhez elengedhetetlenül szükséges sütik',
                description: 'Olyan sütik, amelyek a weboldal technikai működőképességéhez elengedhetetlenül szükségesek, vagy amelyek az ön által igényelt szolgáltatást nyújtják. A honlap ezen sütik nélkül nem tud megfelelően működni, így ezek elhelyezéséhez nincs szükség a felhasználó beleegyezésére. Például a sütik engedélyezésével kapcsolatban megtett felhasználói beállítások megjegyzése.',
                toggle: {
                  value: 'necessary',
                  enabled: true,
                  readonly: true
                },
                cookie_table: [
                  {
                    col1: 'cc_cookie',
                    col2: 'A cookie beállításra kerül amikor a felhasználó elfogadja a cookie-k használatát. Kezelt adatok köre: Felhasználó sütibeállításainak tárolása',
                    col3: '.otlet.budapest.hu',
                    col4: '6 hónap',
                    col5: 'HTTP'
                  },
                  {
                    col1: 'cookiesession1',
                    col2: 'Az oldal védelmére szolgáló tűzfal által létrehozott cookie.<br><br>Kezelt adatok köre: A munkamenet-cookie lehetővé teszi a böngésző számára, hogy újra azonosítsa magát azon egyetlen, egyedi szerveren, amelyre az ügyfél korábban hitelesített.',
                    col3: '.otlet.budapest.hu',
                    col4: 'Munkamenet (kilépés után)',
                    col5: 'HTTP'
                  },
                  {
                    col1: 'token',
                    col2: 'Az oldalon a bejelentkezési funkcióhoz nélkülözhetetlen cookie.<br><br>Kezelt adatok köre: Felhasználó és a szerver közötti kommunikációs során létrehozott egyedi kulcs, amely segítségével hitelesíthető a két fél kommunikációja.',
                    col3: `.otlet.budapest.hu`,
                    col4: '1 óra',
                    col5: 'HTTP'
                  },
                ]
              }, {
                title: 'A weboldal teljesítményének elemzését szolgáló statisztikai sütik',
                description: `
                <p>Olyan sütik, amelyek a weboldal teljesítményének elemzését szolgálják. Ezek arról adnak tájékoztatást, hogy hány felhasználó, mikor, milyen időtartamban, a weboldalunk mely részét látogatta. Ezek az adatok abban segítenek nekünk, hogy a látogatók igényeinek megfelelően fejlesszük a weboldalunkat. A látogatói statisztikai méréseket a Főpolgármesteri Hivatal maga végzi. A látogatói statisztikai méréseket a Budapest Főváros Főpolgármesteri Hivatal (elérhetősége: 1052 Budapest, Városház utca 9-11., web: <a href="http://budapest.hu/Lapok/default.aspx" target="_blank">www.budapest.hu</a>) a saját maga által üzemeltett Matomo Analytics nevű szoftver segítségével végzi. <span class="bb_class">Ezeket a sütiket <span class="cc_underline">csak felhasználó hozzájárulása esetén állítjuk be</span></span>.</p>
                <p>A Matomo Analyticsről részletesebben itt olvashat:</p>
                <a href="https://matomo.org/faq/general/faq_146/" target="_blank">https://matomo.org/faq/general/faq_146/</a>
                  `,
                toggle: {
                  value: 'analytics',
                  enabled: false,
                  readonly: false
                },
                cookie_table: [
                  {
                    col1: '_pk_id',
                    col2: 'Matomo Analytics  cookie-k melyek segítenek adatokat gyűjteni arról, hogy a látogató milyen módon használja a webhelye Kezelt adatok köre: Felhasználói egyedi azonosító a felhasználók egymástól való megkülönböztetésére, de nem azonosítására.',
                    col3: 'otlet.budapest.hu',
                    col4: '13 hónap',
                    col5: 'HTTP'
                  },
                  {
                    col1: '_pk_ses,<br>_pk_cvar,<br>_pk_hsr',
                    col2: 'Matomo Analytics  cookie-k melyek segítenek adatokat gyűjteni arról, hogy a látogató milyen módon használja a webhelyet. Kezelt adatok köre: Felhasználó munkamenetazonosító',
                    col3: 'otlet.budapest.hu',
                    col4: '30 perc',
                    col5: 'HTTP'
                  },
                  {
                    col1: '_pk_ref',
                    col2: 'Matomo Analytics  cookie-k melyek segítenek adatokat gyűjteni arról, hogy a látogató milyen módon használja a webhelyet. Kezelt adatok köre: Munkamenetek összekapcsolása',
                    col3: 'otlet.budapest.hu',
                    col4: '6 hónap',
                    col5: 'HTTP'
                  },
                  {
                    col1: '_pk_testcookie',
                    col2: 'Matomo Analytics süti létrehozhatóság tesztelésére szolgál.',
                    col3: 'otlet.budapest.hu',
                    col4: 'Azonnal',
                    col5: 'HTTP'
                  }
                ]
              }, {
                title: 'Marketing sütik a hatékonyabb kommunikáció, tájékoztatás érdekében',
                description: `
                  <p>Olyan sütik, amelyek célja, hogy a böngészése alapján a felhasználót leginkább érdeklő, számára releváns tartalmak jelenjenek meg más webhelyeken. Ezek a sütik a célcsoportkeresést támogatják, segítségükkel mérhetővé válik az online kommunikáció hatékonysága. Gyakran összekapcsolva működnek más, harmadik fél által biztosított honlapszolgáltatásokkal. <span class="cc_highlight">A felhasználó hozzájárulást adhat</span>, hogy harmadik fél a saját cookie-tájékoztatója alapján sütiket helyezzen el a látogatók eszközén.</p>
                  <p><span class="cc_highlight">Közösségi média felhasználók megcélzását szolgáló sütik - Facebook Pixel</span><br>
                  A Facebook közösségi oldalon futó a közösség tájékoztatását célzó fizetett megjelenéseink  optimalizálása érdekében Facebook Pixelt (Facebook képpont) alkalmazunk. A Facebook Pixel információt szolgáltat arról, hogy mi történik azt követően, hogy valaki a hirdetésünket, kommunikációnkat látva a weboldalra kattint, azaz a weboldalon történő egyes események adatait (a látogatás ténye, az oldalon eltöltött idő és a használt eszköz) összegyűjti és adatokat szolgáltat annak érdekében, hogy a jövőben még hatékonyabb fizetett megjelenéseket hozhassunk létre.</p>
                  <p>A Facebook Pixelről részletesebben itt olvashat:<br>
                  <a href="https://hu-hu.facebook.com/business/help/742478679120153?id=1205376682832142" target="_blank">https://hu-hu.facebook.com/business/help/742478679120153?id=1205376682832142</a></p>
                  <p>A Facebook sütik részletes tájékoztatója az alábbi linken érhető el: <a href="https://www.facebook.com/help/cookies/" target="_blank">https://www.facebook.com/help/cookies/</a></p>
                  <p>A Facebook Pixel által gyűjtött adatokról a következő linken tud rendelkezni:<br>
                  <a href="https://www.facebook.com/privacy/policies/cookies/?subpage=subpage-4.1" target="_blank">https://www.facebook.com/privacy/policies/cookies/?subpage=subpage-4.1</a></p>
                  `,
                toggle: {
                  value: 'marketing',
                  enabled: false,
                  readonly: false
                },
                cookie_table: [
                  {
                    col1: '_fbp',
                    col2: 'A Facebook használja különböző hirdetési termékeinek biztosításához, például valós idejű ajánlatok harmadik féltől származó hirdetőktől. Kezelt adatok köre: látogatás ténye, oldalon eltöltött idő',
                    col3: '.otlet.budapest.hu',
                    col4: '3 hónap',
                    col5: 'HTTP'
                  }, {
                    col1: 'fr',
                    col2: 'A Facebook használja különböző hirdetési termékeinek biztosításához, például valós idejű ajánlatok harmadik féltől származó hirdetőktől. Kezelt adatok köre: látogatás ténye, oldalon eltöltött idő',
                    col3: '.otlet.budapest.hu',
                    col4: '3 hónap',
                    col5: 'HTTP'
                  }, {
                    col1: 'tr',
                    col2: 'A Facebook használja különböző hirdetési termékeinek biztosításához, például valós idejű ajánlatok harmadik féltől származó hirdetőktől. Kezelt adatok köre: látogatás ténye, oldalon eltöltött idő',
                    col3: '.otlet.budapest.hu',
                    col4: 'Munkamenet',
                    col5: 'HTTP'
                  }
                ]
              }
            ]
          }
        },
      }
    })
  }, [router])

  return (
    <></>
  )
}

export default CookieConsentPopup
