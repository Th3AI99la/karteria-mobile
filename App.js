import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

export default function App() {
  // Pega o endereço do servidor Metro (que é o seu PC) automaticamente
  const debuggerHost = Constants.expoConfig?.hostUri;
  const address = debuggerHost?.split(':')[0]; // Extrai apenas o IP, removendo a porta do Metro
  
  // Monta a URL dinâmica. Se falhar, tenta o localhost (para emuladores)
  const karteriaUrl = address ? `http://${address}:8080/` : 'http://10.0.2.2:8080/';

  console.log("Conectando em:", karteriaUrl);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
        
        <WebView 
          source={{ uri: karteriaUrl }} 
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          showsVerticalScrollIndicator={false}
          // Se der erro de novo, ele mostra o erro na tela do celular para sabermos
          renderError={(errorName) => <View><Text>Erro: {errorName}</Text></View>}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  webview: {
    flex: 1,
  },
});