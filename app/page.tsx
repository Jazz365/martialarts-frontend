import HeroBanner from "@/features/Landing/sections/HeroBanner/HeroBanner";
import styles from "./page.module.css";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import Benefits from "@/features/Landing/sections/Benefits/Benefits";
import MartialArtsStyles from "@/features/Landing/sections/MartialArtsStyles/MartialArtsStyles";
import FeaturedItems from "@/features/Landing/sections/FeaturedItems/FeaturedItems";
import FeaturedLocations from "@/features/Landing/sections/FeaturedLocations/FeaturedLocations";
import Banner from "@/features/Landing/sections/Banner/Banner";
import Blog from "@/features/Landing/sections/Blog/Blog";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return <>
    <main className={styles.main}>
      <NavigationBar />
      <HeroBanner />
      <Benefits />
      <MartialArtsStyles />
      <FeaturedItems />
      <FeaturedLocations />
      <Banner />
      <Blog />
    </main>

    <Footer />
  </>
}
