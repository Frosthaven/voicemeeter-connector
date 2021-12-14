/* eslint-disable no-control-regex */
import ffi from "ffi-napi";
import refArray from "ref-array-napi";
import DLLHandler from "./DLLHandler";
import { Device, VMLibrary, VoiceMeeterTypes } from "../types/VoicemeeterTypes";
import {
	BusProperties,
	StripProperties,
	CommandProperties,
	StripGainLayerProperties,
	Replacers,
	StripAppProperties,
	CommandButtonProperties,
	CommandBusEQProperties,
	FXProperties,
	BusEQChannelCellProperties,
	PatchProperties,
	SystemProperties,
	SystemBusDelayProperties,
	PatchChannelProperties,
} from "./VoicemeeterConsts";
/**
 * @ignore
 */
const CharArray = refArray("char");
/**
 * @ignore
 */
const LongArray = refArray("long");
/**
 * @ignore
 */
const FloatArray = refArray("float");
/**
 * @ignore
 */
let libVM: VMLibrary;
/**
 * @ignore
 */
let instance: Voicemeeter;

export default class Voicemeeter {
	/**
	 * Initializes the voice meeter dll connection.
	 * This call is neccessary to use the api. It returns a promise with a VoiceMeeter instance
	 */
	public static async init(): Promise<Voicemeeter> {
		const dllPath = await DLLHandler.getDLLPath();

		return new Promise((resolve: (instance: Voicemeeter) => any) => {
			if (!instance) {
				instance = new Voicemeeter();
			}
			libVM = ffi.Library(`${dllPath}/VoicemeeterRemote64.dll`, {
				VBVMR_Login: ["long", []],
				VBVMR_Logout: ["long", []],
				VBVMR_RunVoicemeeter: ["long", ["long"]],
				VBVMR_IsParametersDirty: ["long", []],
				VBVMR_GetParameterFloat: ["long", [CharArray, FloatArray]],
				VBVMR_GetParameterStringA: ["long", [CharArray, CharArray]],
				VBVMR_SetParameters: ["long", [CharArray]],
				VBVMR_Output_GetDeviceNumber: ["long", []],
				VBVMR_Output_GetDeviceDescA: ["long", ["long", LongArray, CharArray, CharArray]],
				VBVMR_Input_GetDeviceNumber: ["long", []],
				VBVMR_Input_GetDeviceDescA: ["long", ["long", LongArray, CharArray, CharArray]],
				VBVMR_GetVoicemeeterType: ["long", [LongArray]],
				VBVMR_GetVoicemeeterVersion: ["long", [LongArray]],
			});
			instance.isInitialised = true;
			resolve(instance);
		});
	}

	private isInitialised = false;
	private isConnected = false;
	private outputDevices: Device[] = [];
	private inputDevices: Device[] = [];
	private version = "";
	private type: VoiceMeeterTypes;
	private eventPool = [] as Array<() => void>;

	/**
	 * Starts a connection to VoiceMeeter
	 */
	public connect = () => {
		if (!this.isInitialised) {
			throw new Error("Await the initialisation before connect");
		}
		if (this.isConnected) {
			return;
		}
		if (libVM.VBVMR_Login() === 0) {
			this.isConnected = true;
			this.type = this.getVoicemeeterType();
			this.version = this.getVoicemeeterVersion();
			setInterval(this.checkPropertyChange, 10);
			return;
		}
		this.isConnected = false;
		throw new Error("Connection failed");
	};

	/**
	 * Getter $outputDevices
	 * @return {Device[] }
	 */
	public get $outputDevices(): Device[] {
		return this.outputDevices;
	}

	/**
	 * Getter $inputDevices
	 * @return {Device[] }
	 */
	public get $inputDevices(): Device[] {
		return this.inputDevices;
	}

	/**
	 * Getter $version
	 * @return {string }
	 */
	public get $version(): string {
		return this.version;
	}

	/**
	 * Getter $type
	 * @return {VoiceMeeterTypes}
	 */
	public get $type(): VoiceMeeterTypes {
		return this.type;
	}

	/**
	 * Terminates the connection to VoiceMeeter
	 */
	public disconnect = () => {
		if (!this.isConnected) {
			throw new Error("Not connected ");
		}
		try {
			if (libVM.VBVMR_Logout() === 0) {
				this.isConnected = false;
				return;
			}
			throw new Error("Disconnect failed");
		} catch {
			throw new Error("Disconnect failed");
		}
	};

	/**
	 * Updates all input and ouput devices
	 */
	public updateDeviceList = () => {
		if (!this.isConnected) {
			throw new Error("Not connected ");
		}
		this.outputDevices = [];
		this.inputDevices = [];
		const outputDeviceNumber = libVM.VBVMR_Output_GetDeviceNumber();
		for (let i = 0; i < outputDeviceNumber; i++) {
			const hardwareIdPtr = new CharArray(256) as any;
			const namePtr = new CharArray(256) as any;
			const typePtr = new LongArray(1) as any;

			libVM.VBVMR_Output_GetDeviceDescA(i, typePtr, namePtr, hardwareIdPtr);
			this.outputDevices.push({
				name: String.fromCharCode(...namePtr.toArray()).replace(/\u0000+$/g, ""),
				hardwareId: String.fromCharCode(...hardwareIdPtr.toArray()).replace(/\u0000+$/g, ""),
				type: typePtr[0],
			});
		}

		const inputDeviceNumber = libVM.VBVMR_Input_GetDeviceNumber();
		for (let i = 0; i < inputDeviceNumber; i++) {
			const hardwareIdPtr = new CharArray(256) as any;
			const namePtr = new CharArray(256) as any;
			const typePtr = new LongArray(1) as any;

			libVM.VBVMR_Input_GetDeviceDescA(i, typePtr, namePtr, hardwareIdPtr);
			this.inputDevices.push({
				name: String.fromCharCode(...namePtr.toArray()).replace(/\u0000+$/g, ""),
				hardwareId: String.fromCharCode(...hardwareIdPtr.toArray()).replace(/\u0000+$/g, ""),
				type: typePtr[0],
			});
		}
	};

	/**
	 * Returns wheter a parameter has been changed
	 */
	public isParametersDirty = () => {
		return libVM.VBVMR_IsParametersDirty();
	};

	/* STRIP PARAMS ************************************************************
	 ************************************************************************ */

	/**
	 * Gets a strip parameter
	 * @param  {number} index Index of the strip
	 * @param  {StripProperties} property Property which should be get
	 */
	public getStripParameter = (index: number, property: StripProperties) => {
		return this.getParameter("Strip", index, property);
	};

	/**
	 * Sets a parameter of a strip.
	 * @param  {number} index Strip number
	 * @param  {StripProperties} property Propertyname which should be changed
	 * @param  {any} value Property value
	 */
	public setStripParameter = (index: number, property: StripProperties, value: any) => {
		return this.setParameter("Strip", index, property, value);
	};

	/* BUS PARAMS **************************************************************
	 ************************************************************************ */
	/**
	 * Gets a bus parameter.
	 * @param  {number} index Index of the bus
	 * @param  {BusProperties} property Property which should be get
	 */

	public getBusParameter = (index: number, property: BusProperties) => {
		return this.getParameter("Bus", index, property);
	};

	/**
	 * Sets a parameter of a bus.
	 * @param  {number} index Bus number
	 * @param  {StripProperties} property Propertyname which should be changed
	 * @param  {any} value Property value
	 */
	public setBusParameter = (index: number, property: BusProperties, value: any) => {
		return this.setParameter("Bus", index, property, value);
	};

	/* STRIP GAIN LAYER PARAMS *************************************************
	 ************************************************************************ */

	/**
	 * Gets a strip gain layer parameter
	 * @param  {number} index Index of the strip
	 * @param  {number} bus Index of the bus
	 */
	public getStripGainLayerParameter = (index: number, bus: number) => {
		const property = StripGainLayerProperties.GainLayer.replace(Replacers.Bus, `[${bus}]`);
		return this.getParameter("Strip", index, property);
	};

	/**
	 * Sets a strip gain layer parameter
	 * @param  {number} index Index of the strip
	 * @param  {number} bus Index of the bus
	 * @param  {any} value Property value
	 */
	public setStripGainLayerParameter = (index: number, bus: number, value: any) => {
		const property = StripGainLayerProperties.GainLayer.replace(Replacers.Bus, `[${bus}]`);
		return this.setParameter("Strip", index, property, value);
	};

	/* STRIP APP PARAMS ********************************************************
	 ************************************************************************ */

	/**
	 * Sets a strip app parameter (app parameters are write-only)
	 * @param  {number} index Index of the strip
	 * @param  {StripAppProperties} property Property which should be set
	 * @param  {string} [app] Name of the app
	 * @param  {any} value Property value
	 */
	public setStripAppParameter = (index: number, property: StripAppProperties | string, app: string, value: any) => {
		if (property.includes("[")) {
			// we are looking at an app that is starting with a name
			property = property.replace(Replacers.App, `[${app}]`);
		} else {
			// we are looking at an app with an exact name
			// AppGain, Appmute = ("appname", number)
			value = `("${app}",${value})`;
		}
		return this.setParameter("Strip", index, property, value);
	};

	/* BUS EQ CHANNEL CELL PARAMS **********************************************
	 ************************************************************************ */

	/**
	 * Gets a bus eq channel cell value
	 * @param  {number} index Index of the bus
	 * @param  {number} channel the channel 0 based index
	 * @param  {number} cell the cell 0 based index (0-5)
	 * @param  {BusEQChannelCellProperties} property Property which should be get
	 */
	public getBusEQChannelCellParameter = (index: number, channel: number, cell: number, property: BusEQChannelCellProperties | string) => {
		property = property.replace(Replacers.Channel, `[${channel}]`);
		property = property.replace(Replacers.Cell, `[${cell}]`);
		return this.getParameter("Bus", index, property);
	};

	/**
	 * Sets a bus eq channel cell value
	 * @param  {number} index Index of the bus
	 * @param  {number} channel the channel 0 based index
	 * @param  {number} cell the cell 0 based index (0-5)
	 * @param  {BusEQChannelCellProperties} property Property which should be set
	 * @param  {any} value Property value
	 */
	public setBusEQChannelCellParameter = (
		index: number,
		channel: number,
		cell: number,
		property: BusEQChannelCellProperties | string,
		value: any
	) => {
		property = property.replace(Replacers.Channel, `[${channel}]`);
		property = property.replace(Replacers.Cell, `[${cell}]`);
		return this.setParameter("Bus", index, property, value);
	};

	/* FX PARAMS ***************************************************************
	 ************************************************************************ */

	/**
	 * Gets an fx parameter
	 * @param  {FXProperties} property Property which should be get
	 */
	public getFXParameter = (property: FXProperties | string) => {
		return this.getParameter("Fx", null, property);
	};

	/**
	 * Sets an fx parameter
	 * @param  {FXProperties} property Property which should be set
	 * @param  {any} value Property value
	 */
	public setFXParameter = (property: FXProperties | string, value: any) => {
		return this.setParameter("Fx", null, property, value);
	};

	/* PATCH PARAMS ************************************************************
	 ************************************************************************ */

	/**
	 * Gets a patch parameter
	 * @param  {PatchProperties} property Property which should be get
	 */
	public getPatchParameter = (property: PatchProperties | string) => {
		return this.getParameter("Patch", null, property);
	};

	/**
	 * Sets a patch parameter
	 * @param  {PatchProperties} property Property which should be set
	 * @param  {any} value Property value
	 */
	public setPatchParamater = (property: PatchProperties | string, value: any) => {
		return this.setParameter("Patch", null, property, value);
	};

	/* PATCH PARAMS ************************************************************
	 ************************************************************************ */

	/**
	 * Gets a patch channel parameter
	 * @param  {number} index input channel zero based index (for physical strips only - 2 channels per strip)
	 * @param  {PatchChannelProperties} property Property which should be get
	 */
	public getPatchChannelParameter = (index: number, property: PatchChannelProperties | string) => {
		property = property.replace(Replacers.Channel, `[${index}]`);
		return this.getParameter("patch", null, property);
	};

	/**
	 * Sets a patch channel parameter
	 * @param  {number} index input channel zero based index (for physical strips only - 2 channels per strip)
	 * @param  {PatchChannelProperties} property Property which should be set
	 * @param  {any} value Property value
	 */
	public setPatchChannelParamater = (index: number, property: PatchChannelProperties | string, value: any) => {
		property = property.replace(Replacers.Channel, `[${index}]`);
		return this.setParameter("patch", null, property, value);
	};

	/* SYSTEM PARAMS ***********************************************************
	 ************************************************************************ */

	/**
	 * Gets a system parameter
	 * @param  {SystemProperties} property Property which should be get
	 */
	public getSystemParameter = (property: SystemProperties | string) => {
		return this.getParameter("Option", null, property);
	};

	/**
	 * Sets a system parameter
	 * @param  {SystemProperties} property Property which should be set
	 * @param  {any} value Property value
	 */
	public setSystemParameter = (property: SystemProperties | string, value: any) => {
		return this.setParameter("Option", null, property, value);
	};

	/* SYSTEM BUS DELAY PARAMS *************************************************
	 ************************************************************************ */

	/**
	 * Gets a system parameter
	 * @param  {number} index Index of the bus
	 * @param  {SystemProperties} property Property which should be get
	 */
	public getSystemBusDelayParameter = (index: number, property: SystemBusDelayProperties | string) => {
		property = property.replace(Replacers.Bus, `[${index}]`);
		return this.getParameter("Option", null, property);
	};

	/**
	 * Sets a system parameter
	 * @param  {number} index Index of the bus
	 * @param  {SystemProperties} property Property which should be set
	 * @param  {any} value Property value
	 */
	public setSystemBusDelayParameter = (index: number, property: SystemBusDelayProperties | string, value: any) => {
		property = property.replace(Replacers.Bus, `[${index}]`);
		return this.setParameter("Option", null, property, value);
	};

	/* COMMAND PARAMS **********************************************************
	 ************************************************************************ */

	/**
	 * Sets a command (write-only)
	 * @param {CommandProperties} property Propertyname which should be executed
	 * @param value Property value
	 */
	public setCommandParameter = (property: CommandProperties, value: any): Promise<any> => {
		if (!this.isConnected) {
			throw new Error("Not connected ");
		}
		const scriptString = `Command.${property}=${value};`;
		const script = Buffer.alloc(scriptString.length + 1);
		script.fill(0);
		script.write(scriptString);
		libVM.VBVMR_SetParameters(script);
		return new Promise((resolve) => setTimeout(resolve, 200));
	};

	/**
	 * Sets a bus eq command (write-only)
	 * @param {number} bus Index of the bus
	 * @param {CommandBusEQProperties} property Propertyname which should be executed
	 * @param value Property value
	 */
	public setCommandBusEQParamater = (bus: number, property: CommandBusEQProperties | string, value: any): Promise<any> => {
		if (!this.isConnected) {
			throw new Error("Not connected ");
		}
		property = property.replace(Replacers.Bus, `[${bus}]`);
		const scriptString = `Command.${property}=${value};`;
		const script = Buffer.alloc(scriptString.length + 1);
		script.fill(0);
		script.write(scriptString);
		libVM.VBVMR_SetParameters(script);
		return new Promise((resolve) => setTimeout(resolve, 200));
	};

	/**
	 * Sets a button command (write-only)
	 * @param {number} button Index of the macro button
	 * @param {CommandButtonProperties} property Propertyname which should be executed
	 * @param value Property value
	 */
	public setCommandButtonParameter = (button: number, property: CommandButtonProperties | string, value: any): Promise<any> => {
		if (!this.isConnected) {
			throw new Error("Not connected ");
		}
		property = property.replace(Replacers.Button, `[${button}]`);
		const scriptString = `Command.${property}=${value};`;
		const script = Buffer.alloc(scriptString.length + 1);
		script.fill(0);
		script.write(scriptString);
		libVM.VBVMR_SetParameters(script);
		return new Promise((resolve) => setTimeout(resolve, 200));
	};

	/* *************************************************************************
	 ************************************************************************ */

	/**
	 * @param  {()=>any} fn Function which should be called if something changes
	 */
	public attachChangeEvent = (fn: () => any) => {
		this.eventPool.push(fn);
	};

	/**
	 * Checks whether properties has been changed and calls all event listeners
	 */
	private checkPropertyChange = () => {
		if (this.isParametersDirty() === 1) {
			this.eventPool.forEach((eventListener) => {
				eventListener();
			});
		}
	};

	/**
	 * Gets installed voicemeeter type.
	 * Means Voicemeeter(normal,banana,potato)
	 */
	private getVoicemeeterType = (): VoiceMeeterTypes => {
		const typePtr = new LongArray(1);
		if (libVM.VBVMR_GetVoicemeeterType(typePtr) !== 0) {
			throw new Error("running failed");
		}
		switch (typePtr[0]) {
			case 1: // Voicemeeter
				return "voicemeeter";
			case 2: // Voicemeeter Banana
				return "voicemeeterBanana";
			case 3: // Voicemeeter Potato
				return "voicemeeterPotato";
			default:
				throw new Error("Voicemeeter seems not to be installed");
		}
	};

	/**
	 * Returns the installed voicemeeter version
	 */
	private getVoicemeeterVersion = () => {
		const versionPtr = new LongArray(1) as any;
		if (libVM.VBVMR_GetVoicemeeterVersion(versionPtr) !== 0) {
			throw new Error("running failed");
		}
		return versionPtr;
	};

	/**
	 * Gets a parameter of voicemeeter
	 * @param  {'Strip'|'Bus'} selector Strip or Bus
	 * @param  {number} index Number of strip or bus
	 * @param  {StripProperties|BusProperties} property Property which should be read
	 */
	private getParameter = (
		selector: "Strip" | "Bus" | "Fx" | "patch" | "Patch" | "Option",
		index: number | null,
		property: StripProperties | BusProperties | string
	) => {
		const parameterName = index !== null ? `${selector}[${index}].${property}` : `${selector}.${property}`;
		if (!this.isConnected) {
			throw new Error("Not correct connected ");
		}
		const hardwareIdPtr = Buffer.alloc(parameterName.length + 1);
		hardwareIdPtr.write(parameterName);
		let namePtr = null;
		if (["Label", "FadeTo", "FadeBy", "AppGain", "AppMute", "device.name"].indexOf(property) > -1) {
			namePtr = new CharArray(512);
			libVM.VBVMR_GetParameterStringA(hardwareIdPtr, namePtr);
			return String.fromCharCode
				.apply(null, namePtr)
				.split("")
				.filter((e: string) => {
					return e !== "\0";
				})
				.join("");
		}
		namePtr = new FloatArray(1);
		libVM.VBVMR_GetParameterFloat(hardwareIdPtr, namePtr);
		return namePtr[0];
	};

	/**
	 * Sets a parameter of a bus or Strip
	 * @param  {'Strip'|'Bus'} selector
	 * @param  {number} index Number of strip or bus
	 * @param  {StripProperties|BusProperties} property Propertyname which should be changed
	 * @param  {any} value Property value
	 */
	private setParameter = (
		selector: "Strip" | "Bus" | "Fx" | "patch" | "Patch" | "Option",
		index: number | null,
		property: StripProperties | BusProperties | string,
		value: any
	): Promise<any> => {
		if (!this.isConnected) {
			throw new Error("Not connected ");
		}
		const scriptString = index !== null ? `${selector}[${index}].${property}=${value};` : `${selector}.${property}=${value};`;
		const script = Buffer.alloc(scriptString.length + 1);
		script.fill(0);
		script.write(scriptString);
		libVM.VBVMR_SetParameters(script);
		return new Promise((resolve) => setTimeout(resolve, 200));
	};
}
