import { configureStore } from "@reduxjs/toolkit";
import shoppingReducer from "./slices/shopSlice";
import subTotalReducer from "./slices/subtotalSlice";
import discountReducer from "./slices/discountSlice";
import taxReducer from "./slices/taxSlice";
import activeReducer from "./slices/activeSlice";
import compareReducer from "./slices/compareSlice";
import whisReducer from "./slices/wishList";
import footerItemsReducer from "./slices/fotItemSlice";
import globalSearchReducer from "./slices/globalSearchSlice";

export const store = configureStore({
  reducer: {
    addCard: shoppingReducer,
    subTotal: subTotalReducer,
    totalDiscount: discountReducer,
    allTax: taxReducer,
    activeItems: activeReducer,
    compareItems: compareReducer,
    wishList: whisReducer,
    footerRtItems: footerItemsReducer,
    globalSearchItems: globalSearchReducer,
  },
});
