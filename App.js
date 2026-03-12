import React from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

export default function App() {
  // O Expo descobre automaticamente qual é o IP da sua máquina
  const debuggerHost = Constants.expoConfig?.hostUri;
  const address = debuggerHost?.split(':')[0]; // Extrai apenas os números do IP
  
  // Monta a URL: Se achar o IP dinâmico, usa ele. Se falhar, usa o padrão do Emulador Android
  const karteriaUrl = address ? `http://${address}:8080/` : 'http://10.0.2.2:8080/';

  console.log("Conectando automaticamente em:", karteriaUrl);

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
          // Deixei o tratamento de erro para você ver exatamente qual IP ele tentou acessar se falhar
          renderError={(errorName) => (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Erro ao carregar o sistema.</Text>
              <Text>Motivo: {errorName}</Text>
              <Text style={{ marginTop: 10 }}>Tentou acessar:</Text>
              <Text style={{ fontWeight: 'bold' }}>{karteriaUrl}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  webview: { flex: 1 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#dc3545' }
});