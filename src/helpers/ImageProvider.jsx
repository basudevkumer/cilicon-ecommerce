import Logo from "@images/logo.png";
import NavMiddleLogo from "@images/navMiddleLogo.png";
import WidgetImageOne from "@images/widget1.png";
import WidgetImageTwo from "@images/widget2.png";
import WidgetImageThree from "@images/widget3.png";
import DiscountImage1 from "@images/discountImages.png";
import Google from "@images/google.png";
import Amazon from "@images/amazon.png";
import Philips from "@images/philips.png";
import Toshiba from "@images/toshiba.png";
import Samsung from "@images/samsung.png";
import FooterLogo from "@images/footerLogo.png";
import MacAppStoreBannar from "@images/appleBannar.png";
import GoogleAppStoreBannar from "@images/googleBannar.png";
import GoogleAd from "@images/googleAd.png";
import XiamiAd from "@images/xiamiAd.png";
import ProductDetailPyment from "@images/paymen_ method.png";
import CheckMark from "@images/checkCircle.png"

export const allImages = {
  logo: Logo,
  navMiddle: NavMiddleLogo,
  widget1: WidgetImageOne,
  widget2: [
    { id: 1, src: WidgetImageTwo },
    { id: 2, src: WidgetImageThree },
  ],
  discountImages: [{ id: 1, src: DiscountImage1 }],
  subscribe: [
    { id: 1, src: Google },
    { id: 2, src: Amazon },
    { id: 3, src: Philips },
    { id: 4, src: Toshiba },
    { id: 5, src: Samsung },
  ],
  footerLogo: [{ id: 1, src: FooterLogo }],
  appStoreBannar: [
    { id: 1, src: GoogleAppStoreBannar },
    { id: 2, src: MacAppStoreBannar },
  ],
  homeAds: [
    { id: 1, src: GoogleAd },
    { id: 2, src: XiamiAd },
  ],
  pymentCardImage: ProductDetailPyment,
  checkMarkImage :  CheckMark
};
