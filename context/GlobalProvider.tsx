import { Children } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from '../lib/appwrite'
import { BLEService } from '../services/index'
import { BleManager, Characteristic, Device } from "react-native-ble-plx";


const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);







const GlobalProvider = ({ children }) => {
    const [BLEService2] = useState(BLEService)
    const [connectedDevice, setConnectedDevice] = useState(BLEService2.getDevice())
    const [isConnected, setIsConnected] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [rightScore, setRightScore] = useState(-1)
    const [leftScore, setLeftScore] = useState(-1)





    useEffect(() => {
        setConnectedDevice(BLEService2.getDevice())
        if (connectedDevice === null) {
            setIsConnected(false)
        }
        else {
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
                rightScore,
                setRightScore,
                leftScore,
                setLeftScore,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}


export default GlobalProvider;