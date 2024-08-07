import { Children } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from '../lib/appwrite'
import { BLEService } from '../services/index'
import { BleManager, Characteristic, Device } from "react-native-ble-plx";
import base64 from 'react-native-base64'

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

function convertStringToByteArray(str) {                                                                                                                                      
    var bytes = [];                                                                                                                                                             
    for (var i = 0; i < str.length; ++i) {                                                                                                                                      
      bytes.push(str.charCodeAt(i));                                                                                                                                            
    }                                                                                                                                                                           
    return bytes                                                                                                                                                                
  }

export const monitorSetup = async(BLEManager: any,deviceId: string) => {
    return await BLEManager.monitorCharacteristicForDevice(deviceId,"6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400003-b5a3-f393-e0a9-e50e24dcca9e",(error, characteristic) => {
        console.log(convertStringToByteArray(base64.decode(characteristic.value))[0])
    })
}



const GlobalProvider = ({ children }) => {
    const [BLEService2] = useState(BLEService)
    const [connectedDevice, setConnectedDevice] = useState(BLEService2.getDevice())
    const [isConnected, setIsConnected] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setConnectedDevice(BLEService2.getDevice())
        if(connectedDevice===null){
            setIsConnected(false)
        }
        else{
            setIsConnected(true)
        }
    }, []);
    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
                setIsLoading,
                isConnected,
                setIsConnected,
                BLEService2,
                connectedDevice,
                setConnectedDevice,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;