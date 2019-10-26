import React, {PureComponent} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';

class App extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permissão de uso da câmera',
            message: 'Permissão de uso da câmera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancelar',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permissão para gravar áudio',
            message: 'Permissão para gravar áudio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancelar',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
          }}
        />
        <View style={styles.button}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Icon name="car" size={36} color="#999" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  createFormData = photo => {
    const data = new FormData();

    data.append('images', {
      uri: photo.uri,
      name: 'image.jpg',
      type: 'image/jpg',
    });

    return data;
  };

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const photo = await this.camera.takePictureAsync(options);

      fetch('http://aee5a704.ngrok.io/predict', {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: this.createFormData(photo),
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          if (response.predictions.length > 0) {
            const brand = response.predictions[0].brand;
            const car = response.predictions[0].car;

            Alert.alert(brand, car, [{text: 'OK', onPress: () => {}}]);
          }
        });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {flex: 0, flexDirection: 'row', justifyContent: 'center'},
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default App;
