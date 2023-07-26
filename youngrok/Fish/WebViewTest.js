import * as React from 'react';
import { WebView } from 'react-native-webview';
import { Alert } from 'react-native';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('CHECK!')`;
const html = `
    <div>TEST</div>
`;


export default function WebViewTest() {
  return (
    <WebView
      source={{html}}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      onMessage={(event)=> Alert.alert(event.nativeEvent.data) }
    />
  );
}