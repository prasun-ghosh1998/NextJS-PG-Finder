

import Banner from "@/components/landingPage/Banner"
import CTA from "@/components/landingPage/CTA"
import JourneySteps from "@/components/landingPage/jurneySteps"
import PropartyListings from "@/components/landingPage/PropertyListings"
import TrustBar from "@/components/landingPage/Trustbar"


const Discover = () => {
  return (
    <>
    <Banner/>
    <TrustBar/>
    <PropartyListings/>
    <JourneySteps/>
    {/* <FeaturesBar/> */}
    <CTA/>
    </>
  )
}

export default Discover