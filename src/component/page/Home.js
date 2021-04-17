import React from "react";
import {
  Link,
} from "react-router-dom";
import Hero from "../Hero";

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: [
        { img: require('../../img/szechenyi_furdo_2.jpg'), title: 'Széchényi fürdő felújítás', description: 'A greener city' },
        { img: require('../../img/szechenyi_furdo_2.jpg'), title: 'Social', description: 'Circular economy' },
        { img: require('../../img/szechenyi_furdo_2.jpg'), title: 'General', description: 'Reorganise Cambronne place' }
      ],
      links: [
        { img: require('../../img/szechenyi_furdo_2.jpg'), title: 'Széchényi fürdő felújítás', btnLink: 'https://index.hu', btn: 'index.hu' },
        { img: require('../../img/szechenyi_furdo_2.jpg'), title: 'Social', btnLink: 'https://hvg.hu', btn: 'hvg.hu' },
        { img: require('../../img/szechenyi_furdo_2.jpg'), title: 'General', btnLink: 'https://budapest.hu', btn: 'budapest.hu' }
      ]
    };
  }

  render() {
    return (
      <div className="home">
        <Hero />

        <div className="content">
          <div className="project-news-wrapper light-section">
            <div className="container">
              <h2 className="widget-title">Hírek a projektekről!</h2>

              <div className="news-box-wrapper">

                <div className="row">
                  {this.state.articles.map((article, i) => {
                    return (
                      <div key={i.toString()} className="col-sm-12 col-md-6 col-lg-4">
                        <article key={i.toString()} className="news-box-elem">
                          <img src={article.img} />
                          <div className="article-title">{ article.title }</div>
                          <div className="article-content">
                            <div className="article-desctiption">{article.description}</div>

                            <div className="article-button-wrapper btn-wrapper">
                              <a href="#" className="btn btn-secondary">Projekt bemutatása</a>
                            </div>
                          </div>
                        </article>
                      </div>
                    )
                  })}
                </div>

                <div className="focus-title">Vessen egy pillantást a fejlesztés alatt álló projektekre!</div>

                <div className="btn-wrapper">
                  <a href="#" className="btn btn-secondary">Összes projekt bemutatása</a>
                </div>

              </div>
            </div>
          </div>

          {/* <div className="news-wrapper dark-section">
            <div className="container">
              <h2 className="section-title">Hírek!</h2>

              <div className="news-box-wrapper">

                <div className="row">
                  {this.state.links.map((article, i) => {
                    return (
                      <div key={i.toString()} className="col-sm-12 col-md-6 col-lg-4">
                        <article key={i.toString()} className="news-box-elem article-news">
                          <img src={article.img} />
                          <div className="article-title">{article.title}</div>
                          <div className="article-content">
                            <div className="article-button-wrapper btn-wrapper">
                              <a href={article.btnLink} className="btn btn-tertiary" target="_blank">{article.btn}</a>
                            </div>
                          </div>
                        </article>
                      </div>
                    )
                  })}
                </div>

              </div>
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}
