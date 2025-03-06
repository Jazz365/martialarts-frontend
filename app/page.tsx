import HeroBanner from "@/features/Landing/sections/HeroBanner/HeroBanner";
import styles from "./page.module.css";
import NavigationBar from "@/layouts/NavigationBar/NavigationBar";
import Benefits from "@/features/Landing/sections/Benefits/Benefits";
import MartialArtsStyles from "@/features/Landing/sections/MartialArtsStyles/MartialArtsStyles";
import FeaturedStudios from "@/features/Landing/sections/FeaturedStudios/FeaturedStudios";
import FeaturedLocations from "@/features/Landing/sections/FeaturedLocations/FeaturedLocations";
import Banner from "@/features/Landing/sections/Banner/Banner";
import Blog from "@/features/Landing/sections/Blog/Blog";
import Footer from "@/layouts/Footer/Footer";
import IncludedGenders from "@/features/Landing/sections/IncludedGenders/IncludedGenders";
import Faqs from "@/features/Landing/sections/Faqs/Faqs";
// import MaintenanceScreen from "@/components/common/MaintenanceScreen/MaintenanceScreen";
// import { tempLandingAccessVal } from "@/utils/utils";

export default function Home() {
  return <>
    <NavigationBar />
    <main className={styles.main}>
      <HeroBanner />
      <Benefits />
      <IncludedGenders />
      <MartialArtsStyles />
      <FeaturedStudios />
      <FeaturedLocations />
      <Banner />
      <Blog />
      <Faqs />
    </main>

    <Footer />
  </>
}
