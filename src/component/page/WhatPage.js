import React, { useEffect } from 'react'
import HeroPage from '../common/HeroPage'
import InfoZigZag from '../common/InfoZigZag'
import NewsletterArea from '../common/NewsletterArea'
import IllustrationTodo from '../../img/illustration-todo.svg'
import IllustrationIdea from '../../img/illustration-idea.svg'
import IllustrationPuzzle from '../../img/illustration-puzzle.svg'
import IllustrationTalk from '../../img/illustration-talk.svg'

export default function ZigZagPage() {
  useEffect(() => {
    setTimeout(() => {
      const scrollContent = document.getElementById(window.location.hash.toString().replace('#', ''))

      if (scrollContent) {
        window.scrollTo({
          top: scrollContent.offsetTop,
          left: 0,
          behavior: 'smooth'
        })
      }
    }, 100)
  }, [])

  useEffect(() => {
    document.body.classList.add('page-what')

    return () => {
      document.body.classList.remove('page-what')
    }
  }, [])

  return (
    <div className="page-what-section">
      <HeroPage title="Mi történik most?" />

      <InfoZigZag image={IllustrationTodo} imageAlt="Illusztráció egy listáról" bgColor="">
        <h3 className="single">Szakmai ellenőrzés</h3>

        <p>A Fővárosi Önkormányzat szakmai főosztályai megvizsgálják a hozzájuk tartozó ötleteket. Ha a döntéshez kerületi önkormányzat engedélye kell, ők is megvizsgálják. Egy ötlet véleményezésében részt vehet akár több önkormányzati osztály vagy cég is (pl. Főkert, BKK).</p>

        <p><b>Ekkor kiderül, hogy:</b></p>
        <ul>
          <li>az ötlet műszakilag megvalósítható-e a rendelkezésre álló keretösszegből,</li>
          <li>megfelel-e a jog és a közösségi költségvetés szabályainak,</li>
          <li>egyezik-e önkormányzati tervekkel.</li>
        </ul>

        <p>Ha az ötlet nem felelt meg, az elutasítás rövid indoklása a honlapra is felkerül.</p>

        <a href="#" className="btn btn-secondary">Mi történik ez után?</a>
      </InfoZigZag>

      <InfoZigZag image={IllustrationIdea} imageAlt="Illusztráció egy listáról" bgColor="yellow" orient="right">
        <h3 className="single">Ötletfejlesztés</h3>

        <p>Az ötleteket a szakmai visszajelzések alapján fejlesztjük. Ez azt jelenti, hogy ha a szakmai jóváhagyáshoz szükséges, akkor módosítjuk a tartalmukat.</p>

        <p><b>Ez jelentheti:</b></p>
        <ul>
          <li>a fejlesztési tartalom rövidítését,</li>
          <li>egyes elemek törlését,</li>
          <li>bizonyos leíró részletek elhagyását, ha nem garantálható, hogy a fejlesztés pont abban a formában megvalósítható.</li>
        </ul>

        <p>Ha az ötletgazda által leírt pontos helyszín nem alkalmas egy szakmailag támogatott fejlesztésnél, akkor általánosabbra vehetjük a hely meghatározását. Szintén ebben a fázisban dől el, hogy a hasonló ötleteket összevonjuk-e. Ez azért fontos, hogy ne versenyezzenek egymással közel azonos javaslatok.</p>

        <p><b>Valamennyi ötlet szövegét egységes stílusra és terjedelemre igazítjuk. Ez azért szükséges, hogy a szavazólapra közérthető megfogalmazású ötletek kerüljenek. Innentől kezdve nem “beküldött ötletekről”, hanem “feldolgozott ötletekről” beszélünk; a honlapon mindkét verziót megtalálod.</b></p>

        <a href="#" className="btn btn-primary">Mi a következő fázis?</a>
      </InfoZigZag>

      <InfoZigZag image={IllustrationPuzzle} imageAlt="Illusztráció puzzlet fogó emberekről" bgColor="">
        <h3 className="single">Konzultációk</h3>

        <p>Ha az ötletfejlesztési szakaszban jelentős változások történtek, értesítjük az ötletgazdát és konzultációs lehetőségeket ajánlunk fel. Ez különösen hasznos olyan témákban, amikre több ötlet is vonatkozik és ahol erős érdeklődés érezhető.</p>

        <a href="#" className="btn btn-secondary">Mi történik a konzultáció után?</a>
      </InfoZigZag>

      <InfoZigZag image={IllustrationTalk} imageAlt="Illusztráció beszélgető embererekről" bgColor="blue" orient="right">
        <h3 className="single">Utolsó körös ellenőrzés</h3>

        <p>Az ötleteket a szavazólapra kerülésük előtt a Fővárosi Önkormányzat Jogi- és Közbeszerzési Főosztálya nézi át. A szavazólapra csak olyan ötlet kerülhet, ami jogi és közbeszerzési értelemben szabályosan megvalósítható.</p>

        <p>Végül az Önkormányzat főpolgármesteri döntést hoz a feldolgozott ötletek szavazólapra kerüléséről. Ekkor a főpolgármesteri kabinet és a főpolgármester-helyettesi irodák megkapják a szavazólapra kerülő, és az elutasított ötleteket is.</p>

        <a href="#" className="btn btn-primary">Megnézem az ötleteket!</a>
      </InfoZigZag>

      <NewsletterArea />

    </div>
  )
}