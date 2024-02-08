import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { PrismicRichText, PrismicLink } from "@prismicio/react";
import Slider from "react-slick";
import { PrismicNextImage } from "@prismicio/next";

const Index = ({ page, slider_items}) => {
  console.log(slider_items)

  var settings = {
    dots: true,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerPadding: "25%",
    slidesToScroll: 1,
  };
  return (
    <Layout>
      {/* <Head>
        <title>{prismicH.asText(settings.data.siteTitle)}</title>
        <meta name="description" content={settings.data.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={prismicH.asText(settings.data.siteTitle)} />
        <meta property="og:description" content={settings.data.description} />
        <meta property="og:image" content={settings.data.image.url} />
      </Head> */}
      <div className="container">
        <Slider {...settings} className="slider">
          {slider_items.map((item, i) => {
            return(
              <div className="slider-item" key={`slide${i}`}>
                <PrismicNextImage field={item.data.image}/>
                <div className="flex-wrapper">
                  <div className="info-left">
                    <h2>{item.data.title}</h2>
                    <PrismicRichText field={item.data.description}/>
                  </div>
                  <div className="info-right">
                    <PrismicLink className="button" field={item.data.button_link}>{item.data.button_text}</PrismicLink>
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

  const page = await client.getByUID("page", "home");
  const slider_items = await client.getAllByType("slider_item");


  return {
    props: {
      slider_items,
      page
    },
  };
}
