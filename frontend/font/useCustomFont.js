// useCustomFont.js
import * as Font from "expo-font";
import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

function useCustomFont(fontFileName) {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        customFont: fontFileName,
      });
      setIsFontLoaded(true);
      await SplashScreen.hideAsync();
    }

    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFont();
      } catch (e) {
        // handle errors
      }
    }

    prepare();
  }, [fontFileName]);

  return isFontLoaded;
}

export default useCustomFont;