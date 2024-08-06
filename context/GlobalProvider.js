import { Children } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from '../lib/appwrite.js'
import { BLEService } from '../services'
import { BleManager, Device } from "react-native-ble-plx";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [BLEService2] = useState(BLEService)
    const [connectedDevice, setConnectedDevice] = useState(BLEService2.getDevice())
    const [isConnected, setIsConnected] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
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