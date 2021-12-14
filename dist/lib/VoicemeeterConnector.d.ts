import { Device, VoiceMeeterTypes } from "../types/VoicemeeterTypes";
import { BusProperties, StripProperties, CommandProperties, StripAppProperties, CommandButtonProperties, CommandBusEQProperties, FXProperties, BusEQChannelCellProperties, PatchProperties, SystemProperties, SystemBusDelayProperties, PatchChannelProperties } from "./VoicemeeterConsts";
export default class Voicemeeter {
    /**
     * Initializes the voice meeter dll connection.
     * This call is neccessary to use the api. It returns a promise with a VoiceMeeter instance
     */
    static init(): Promise<Voicemeeter>;
    private isInitialised;
    private isConnected;
    private outputDevices;
    private inputDevices;
    private version;
    private type;
    private eventPool;
    /**
     * Starts a connection to VoiceMeeter
     */
    connect: () => void;
    /**
     * Getter $outputDevices
     * @return {Device[] }
     */
    get $outputDevices(): Device[];
    /**
     * Getter $inputDevices
     * @return {Device[] }
     */
    get $inputDevices(): Device[];
    /**
     * Getter $version
     * @return {string }
     */
    get $version(): string;
    /**
     * Getter $type
     * @return {VoiceMeeterTypes}
     */
    get $type(): VoiceMeeterTypes;
    /**
     * Terminates the connection to VoiceMeeter
     */
    disconnect: () => void;
    /**
     * Updates all input and ouput devices
     */
    updateDeviceList: () => void;
    /**
     * Returns wheter a parameter has been changed
     */
    isParametersDirty: () => any;
    /**
     * Gets a strip parameter
     * @param  {number} index Index of the strip
     * @param  {StripProperties} property Property which should be get
     */
    getStripParameter: (index: number, property: StripProperties) => any;
    /**
     * Sets a parameter of a strip.
     * @param  {number} index Strip number
     * @param  {StripProperties} property Propertyname which should be changed
     * @param  {any} value Property value
     */
    setStripParameter: (index: number, property: StripProperties, value: any) => Promise<any>;
    /**
     * Gets a bus parameter.
     * @param  {number} index Index of the bus
     * @param  {BusProperties} property Property which should be get
     */
    getBusParameter: (index: number, property: BusProperties) => any;
    /**
     * Sets a parameter of a bus.
     * @param  {number} index Bus number
     * @param  {StripProperties} property Propertyname which should be changed
     * @param  {any} value Property value
     */
    setBusParameter: (index: number, property: BusProperties, value: any) => Promise<any>;
    /**
     * Gets a strip gain layer parameter
     * @param  {number} index Index of the strip
     * @param  {number} bus Index of the bus
     */
    getStripGainLayerParameter: (index: number, bus: number) => any;
    /**
     * Sets a strip gain layer parameter
     * @param  {number} index Index of the strip
     * @param  {number} bus Index of the bus
     * @param  {any} value Property value
     */
    setStripGainLayerParameter: (index: number, bus: number, value: any) => Promise<any>;
    /**
     * Sets a strip app parameter (app parameters are write-only)
     * @param  {number} index Index of the strip
     * @param  {StripAppProperties} property Property which should be set
     * @param  {string} [app] Name of the app
     * @param  {any} value Property value
     */
    setStripAppParameter: (index: number, property: StripAppProperties | string, app: string, value: any) => Promise<any>;
    /**
     * Gets a bus eq channel cell value
     * @param  {number} index Index of the bus
     * @param  {number} channel the channel 0 based index
     * @param  {number} cell the cell 0 based index (0-5)
     * @param  {BusEQChannelCellProperties} property Property which should be get
     */
    getBusEQChannelCellParameter: (index: number, channel: number, cell: number, property: BusEQChannelCellProperties | string) => any;
    /**
     * Sets a bus eq channel cell value
     * @param  {number} index Index of the bus
     * @param  {number} channel the channel 0 based index
     * @param  {number} cell the cell 0 based index (0-5)
     * @param  {BusEQChannelCellProperties} property Property which should be set
     * @param  {any} value Property value
     */
    setBusEQChannelCellParameter: (index: number, channel: number, cell: number, property: BusEQChannelCellProperties | string, value: any) => Promise<any>;
    /**
     * Gets an fx parameter
     * @param  {FXProperties} property Property which should be get
     */
    getFXParameter: (property: FXProperties | string) => any;
    /**
     * Sets an fx parameter
     * @param  {FXProperties} property Property which should be set
     * @param  {any} value Property value
     */
    setFXParameter: (property: FXProperties | string, value: any) => Promise<any>;
    /**
     * Gets a patch parameter
     * @param  {PatchProperties} property Property which should be get
     */
    getPatchParameter: (property: PatchProperties | string) => any;
    /**
     * Sets a patch parameter
     * @param  {PatchProperties} property Property which should be set
     * @param  {any} value Property value
     */
    setPatchParamater: (property: PatchProperties | string, value: any) => Promise<any>;
    /**
     * Gets a patch channel parameter
     * @param  {number} index input channel zero based index (for physical strips only - 2 channels per strip)
     * @param  {PatchChannelProperties} property Property which should be get
     */
    getPatchChannelParameter: (index: number, property: PatchChannelProperties | string) => any;
    /**
     * Sets a patch channel parameter
     * @param  {number} index input channel zero based index (for physical strips only - 2 channels per strip)
     * @param  {PatchChannelProperties} property Property which should be set
     * @param  {any} value Property value
     */
    setPatchChannelParamater: (index: number, property: PatchChannelProperties | string, value: any) => Promise<any>;
    /**
     * Gets a system parameter
     * @param  {SystemProperties} property Property which should be get
     */
    getSystemParameter: (property: SystemProperties | string) => any;
    /**
     * Sets a system parameter
     * @param  {SystemProperties} property Property which should be set
     * @param  {any} value Property value
     */
    setSystemParameter: (property: SystemProperties | string, value: any) => Promise<any>;
    /**
     * Gets a system parameter
     * @param  {number} index Index of the bus
     * @param  {SystemProperties} property Property which should be get
     */
    getSystemBusDelayParameter: (index: number, property: SystemBusDelayProperties | string) => any;
    /**
     * Sets a system parameter
     * @param  {number} index Index of the bus
     * @param  {SystemProperties} property Property which should be set
     * @param  {any} value Property value
     */
    setSystemBusDelayParameter: (index: number, property: SystemBusDelayProperties | string, value: any) => Promise<any>;
    /**
     * Sets a command (write-only)
     * @param {CommandProperties} property Propertyname which should be executed
     * @param value Property value
     */
    setCommandParameter: (property: CommandProperties, value: any) => Promise<any>;
    /**
     * Sets a bus eq command (write-only)
     * @param {number} bus Index of the bus
     * @param {CommandBusEQProperties} property Propertyname which should be executed
     * @param value Property value
     */
    setCommandBusEQParamater: (bus: number, property: CommandBusEQProperties | string, value: any) => Promise<any>;
    /**
     * Sets a button command (write-only)
     * @param {number} button Index of the macro button
     * @param {CommandButtonProperties} property Propertyname which should be executed
     * @param value Property value
     */
    setCommandButtonParameter: (button: number, property: CommandButtonProperties | string, value: any) => Promise<any>;
    /**
     * @param  {()=>any} fn Function which should be called if something changes
     */
    attachChangeEvent: (fn: () => any) => void;
    /**
     * Checks whether properties has been changed and calls all event listeners
     */
    private checkPropertyChange;
    /**
     * Gets installed voicemeeter type.
     * Means Voicemeeter(normal,banana,potato)
     */
    private getVoicemeeterType;
    /**
     * Returns the installed voicemeeter version
     */
    private getVoicemeeterVersion;
    /**
     * Gets a parameter of voicemeeter
     * @param  {'Strip'|'Bus'} selector Strip or Bus
     * @param  {number} index Number of strip or bus
     * @param  {StripProperties|BusProperties} property Property which should be read
     */
    private getParameter;
    /**
     * Sets a parameter of a bus or Strip
     * @param  {'Strip'|'Bus'} selector
     * @param  {number} index Number of strip or bus
     * @param  {StripProperties|BusProperties} property Propertyname which should be changed
     * @param  {any} value Property value
     */
    private setParameter;
}
