/* eslint-disable import/prefer-default-export */
import Voicemeeter from "./lib/VoicemeeterConnector";
import * as constants from "./lib/VoicemeeterConsts";
import * as types from "./types/VoicemeeterTypes";

const {
	InterfaceTypes,
	StripProperties,
	BusProperties,
	BusEQChannelCellProperties,
	FXProperties,
	CommandProperties,
	PatchProperties,
	PatchChannelProperties,
	PatchCompositeProperties,
	PatchInsertProperties,
	SystemProperties,
	SystemBusDelayProperties,
	RecorderProperties,
	VBANProperties,
} = constants;

export {
	Voicemeeter,
	InterfaceTypes,
	StripProperties,
	BusProperties,
	BusEQChannelCellProperties,
	FXProperties,
	CommandProperties,
	PatchProperties,
	PatchChannelProperties,
	PatchCompositeProperties,
	PatchInsertProperties,
	SystemProperties,
	SystemBusDelayProperties,
	RecorderProperties,
	VBANProperties,
	types,
};
