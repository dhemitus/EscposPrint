/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {BluetoothManager,BluetoothEscposPrinter,BluetoothTscPrinter} from 'react-native-bluetooth-escpos-printer';

class App extends Component {
  _listeners = [];

  constructor() {
    super()
    this.state = {
      enabled: false
    }
  }

  componentDidMount() {
    BluetoothManager.isBluetoothEnabled().then((r)=> {
      alert(r)
    }, (err)=> {
        alert(err)
    })
  }


  scan() {
    BluetoothManager.scanDevices()
    .then(s => {
      alert(s)
    }).catch(e => {
      alert(JSON.stringify(e))
    })
  }

  enable() {
    BluetoothManager.enableBluetooth()
    .then(r => {
      this.setState({enabled: true})
      alert(r)
    }).catch(e =>{
      alert(e)
    })
  }

  disable() {
    BluetoothManager.disableBluetooth()
    .then(r => {
      this.setState({enabled: false})
      alert(r)
    }).catch(e =>{
      alert(e)
    })
  }

  async test () {
    await BluetoothEscposPrinter.printerInit()
    await BluetoothEscposPrinter.printBarCode("9876543210", BluetoothEscposPrinter.BARCODETYPE.JAN13, 3, 120, 0, 2)
    await  BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {})
    await  BluetoothEscposPrinter.printQRCode("OTUCHAT", 280, BluetoothEscposPrinter.ERROR_CORRECTION.L)
    await  BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {})
    await  BluetoothEscposPrinter.printText("OTU CHAT", {})
  }

  render() {
    return (
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      >
        <View style={{margin: 5}}>
          <Button title={this.state.enabled ? 'disabled' : 'enable'} onPress={() => this.state.enabled ? this.disable() : this.enable()} />
        </View>
        {this.state.enabled && 
          <View style={{margin: 5}}>
            <Button title='scan' onPress={() => this.scan()} />
          </View>
        }
        {this.state.enabled && 
          <View style={{margin: 5}}>
            <Button title='print' onPress={() => this.test()} />
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
