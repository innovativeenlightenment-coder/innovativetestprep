import Image from "next/image";
import HeaderPage from "./component/HeaderPage";
import FeatureStrip from "./component/FeatureStrip";
import Slider from "./component/SliderPage";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import SliderPage from "./component/SliderPage";
import SubscriptionPage from "./component/SubscriptionPage";
import TestimonialsCarousel from "./component/TestimonialsCarousel";
import ToolBar from "./component/ToolBar"
import Footer from "./component/Footer";
import WhyUs from "./component/WhyUs";
import Contactinfo from "./component/ContactInfo"
import TestSeriesCTA from "./component/TestSeriesCTA";
import SEO from "./SEO"

export default function Home() {
  return (
    <>
     <SEO/>
      <ToolBar />
      <HeaderPage />
      <SliderPage />
          <WhyUs />
      {/* <FeatureStrip/>  */}
       <TestSeriesCTA/>
        <SubscriptionPage/> 
       <TestimonialsCarousel/>
      <Footer />
      <Contactinfo/>

      {/* <h1>saashdjk</h1> */}
      
    </>
  );
}
