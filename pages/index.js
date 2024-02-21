import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { PrismicRichText, PrismicLink } from "@prismicio/react";
import Slider from "react-slick";
import { PrismicNextImage } from "@prismicio/next";
import Collapsible from 'react-collapsible';

const Index = ({ page, settings}) => {
  console.log(settings)
  // initialSlide

  var sliderSettings = {
    dots: true,
    centerMode: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    centerPadding: "20%",
    slidesToScroll: 1,
    cssEase: 'ease',
    easing: 'ease',
    dots: false,
    lazyLoad: 'progressive',
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          centerPadding: "1%",
        }
      },
    ]
  };
  
  return (
    <Layout>
      <Head>
        <title>{settings.data.site_title}</title>
        <meta name="description" content={settings.data.site_description[0].text} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={settings.data.site_title} />
        <meta property="og:description" content={settings.data.site_description[0].text} />
        <meta property="og:image" content={settings.data.image.url} />
      </Head>
      <div className="container">
        <div className="top-bar">
          {settings.data.socials.map((item, i) => {
            return(
              <div className="social-icon" key={`social${i}`}>
                <PrismicLink field={item.link}>
                  <div style={{"maskImage": `url(${item.image.url})`}}></div>
                </PrismicLink>
              </div>
            )
          })}
        </div>
        <Collapsible>
          <PrismicRichText field={page.data.description}/>
        </Collapsible>
        <Slider {...sliderSettings} className="slider">
          {page.data.slider_items.map((item, i) => {
            return(
              <div className="slider-item" key={`slide${i}`}>
                <PrismicNextImage field={item.slider_item.data.image}/>
                <div className="flex-wrapper">
                  <div className="info-left">
                    <h2>{item.slider_item.data.title}</h2>
                    <PrismicRichText field={item.slider_item.data.description}/>
                  </div>
                  <div className="info-right">
                    <PrismicLink className="button" field={item.slider_item.data.button_link}>{item.slider_item.data.button_text}</PrismicLink>
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  // const page = await client.getByUID("page", "home");
  const settings = await client.getSingle("settings");
  const page = await client.getByUID("page", "home", {
    fetchLinks: `slider_item.image, slider_item.description, slider_item.title, slider_item.button_link, slider_item.button_text`
  });

  



  return {
    props: {
      page,
      settings
    },
  };
}
