import { Children } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from '../lib/appwrite'
import { BLEService } from '../services/index'
//import { BleManager, Characteristic, Device } from "react-native-ble-plx";
import BleManager, {
    BleDisconnectPeripheralEvent,
    BleManagerDidUpdateValueForCharacteristicEvent,
    BleScanCallbackType,
    BleScanMatchMode,
    BleScanMode,
    Peripheral,
    PeripheralInfo,
} from 'react-native-ble-manager';


const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);







const GlobalProvider = ({ children }) => {
    const [BLEService2] = useState(BLEService)
    const [connectedDevice, setConnectedDevice] = useState(BLEService2.getDevice())
    const [isConnected, setIsConnected] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [rightScore, setRightScore] = useState(0)
    const [leftScore, setLeftScore] = useState(0)
    const [expectedRightScore, setExpectedRightScore] = useState(0)
    const [expectedLeftScore, setExpectedLeftScore] = useState(0)
    const [isScanning, setIsScanning] = useState(false);
    const [timerMinutes, setTimerMinutes] = useState(0);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [timerStarted, setTimerStarted] = useState(0);
    const [alarmHour, setAlarmHour] = useState(0);
    const [alarmMinute, setAlarmMinute] = useState(0);
    const [alarmOn, setAlarmOn] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [setMilitaryTime, setSetMilitaryTime] = useState(0);
    const [peripherals, setPeripherals] = useState(
        new Map<Peripheral['id'], Peripheral>(),
    );
    const [bleManagerEmitter2, setBleManagerEmitter2] = useState(null)





    useEffect(() => {

    }, []);
    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn, setIsLoggedIn,
                user, setUser,
                isLoading, setIsLoading,
                isConnected, setIsConnected,
                BLEService2,
                connectedDevice, setConnectedDevice,
                rightScore, setRightScore,
                leftScore, setLeftScore,
                isScanning, setIsScanning,
                peripherals, setPeripherals,
                bleManagerEmitter2, setBleManagerEmitter2,
                expectedRightScore, setExpectedRightScore,
                expectedLeftScore, setExpectedLeftScore,
                timerSeconds, setTimerSeconds,
                timerMinutes, setTimerMinutes,
                timerStarted, setTimerStarted,
                alarmHour, setAlarmHour,
                alarmMinute, setAlarmMinute,
                alarmOn, setAlarmOn,
                hour, setHour,
                minute, setMinute,
                setMilitaryTime, setSetMilitaryTime,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}


export default GlobalProvider;