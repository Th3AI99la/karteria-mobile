import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  // O IP da sua máquina na rede Wi-Fi local
  const MEU_IP = '192.168.15.54'; 
  const karteriaUrl = `http://${MEU_IP}:8080/`;

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de status no topo do celular adaptada para o Karteria */}
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <WebView 
        source={{ uri: karteriaUrl }} 
        style={styles.webview}
        showsVerticalScrollIndicator={false}
        bounces={false}
        javaScriptEnabled={true} 
      />
    </SafeAreaView>
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