export const InterfaceTypes = {
	strip: 0,
	bus: 1,
};

export enum Replacers {
	App = "[app]",
	Bus = "[bus]",
	Button = "[button]",
	Cell = "[cell]",
	Channel = "[channel]",
	Strip = "[strip]",
}

/* STRIP ***********************************************************************
 **************************************************************************** */

export enum StripProperties {
	Mono = "Mono",
	Mute = "Mute",
	Solo = "Solo",
	MC = "MC",
	Gain = "Gain",
	Pan_x = "Pan_x",
	Pan_y = "Pan_y",
	Color_x = "Color_x",
	Color_y = "Color_y",
	fx_x = "fx_x",
	fx_y = "fx_y",
	Audibility = "Audibility",
	Comp = "Comp",
	Gate = "Gate",
	Karaoke = "Karaoke",
	Limit = "Limit",
	EQGain1 = "EQGain1",
	EQGain2 = "EQGain2",
	EQGain3 = "EQGain3",
	Label = "Label",
	A1 = "A1",
	A2 = "A2",
	A3 = "A3",
	A4 = "A4",
	A5 = "A5",
	B1 = "B1",
	B2 = "B2",
	B3 = "B3",
	FadeTo = "FadeTo",
	FadeBy = "FadeBy",
	Reverb = "Reverb",
	Delay = "Delay",
	Fx1 = "Fx1",
	Fx2 = "Fx2",
	PostReverb = "PostReverb",
	PostDelay = "PostDelay",
	PostFx1 = "PostFx1",
	PostFx2 = "PostFx2",
	DeviceName = "device.name",
	DeviceSR = "device.sr",
	DeviceWDM = "device.wdm",
	DeviceKS = "device.ks",
	DeviceMME = "device.mme",
	DeviceASIO = "device.asio",
}

export enum StripGainLayerProperties {
	GainLayer = "GainLayer[bus]",
}

export enum StripAppProperties {
	StripAppGain = "AppGain",
	StripAppMute = "AppMute",
	StripAppGainPartialMatch = "App[app].Gain",
	StripAppMutePartialMatch = "App[app].Mute",
}

/* BUS *************************************************************************
 **************************************************************************** */

export enum BusProperties {
	Mono = "Mono",
	Mute = "Mute",
	EQ = "EQ.on",
	EQAB = "EQ.AB",
	Gain = "Gain",
	Label = "Label", // not listed in api doc, but exists in newer versions
	ModeNormal = "mode.normal",
	ModeAmix = "mode.Amix",
	ModeBmix = "mode.Bmix",
	ModeRepeat = "mode.Repeat",
	ModeComposite = "mode.Composite",
	ModeTVMix = "mode.TVMix",
	ModeUpMix21 = "mode.UpMix21",
	ModeUpMix41 = "mode.UpMix41",
	ModeUpMix61 = "mode.UpMix61",
	ModeCenterOnly = "mode.CenterOnly",
	ModeLFEOnly = "mode.LFEOnly",
	FadeTo = "FadeTo",
	FadeBy = "FadeBy",
	Sel = "Sel",
	ReturnReverb = "ReturnReverb",
	ReturnDelay = "ReturnDelay",
	ReturnFx1 = "ReturnFx1",
	ReturnFx2 = "ReturnFx2",
	Monitor = "Monitor",
	DeviceName = "device.name",
	DeviceSR = "device.sr",
	DeviceWDM = "device.wdm",
	DeviceKS = "device.ks",
	DeviceMME = "device.mme",
	DeviceASIO = "device.asio",
}

export enum BusEQChannelCellProperties {
	EQChannelCellOn = "EQ.channel[channel].cell[cell].on",
	EQChannelCellType = "EQ.channel[channel].cell[cell].type",
	EQChannelCellF = "EQ.channel[channel].cell[cell].f",
	EQChannelCellGain = "EQ.channel[channel].cell[cell].gain",
	EQChannelCellQ = "EQ.channel[channel].cell[cell].q",
}

/* COMMAND *********************************************************************
 **************************************************************************** */

export enum CommandProperties {
	Shutdown = "Shutdown",
	Show = "Show",
	Restart = "Restart",
	Eject = "Eject",
	Reset = "Reset",
	Save = "Save",
	Load = "Load",
	DialogShowVBANCHAT = "DialogShow.VBANCHAT",
}

/* BUSEQ ***********************************************************************
 **************************************************************************** */

export enum CommandBusEQProperties {
	LoadBUSEQ = "LoadBUSEQ[bus]",
	SaveBUSEQ = "SaveBUSEQ[bus]",
}

/* BUTTON **********************************************************************
 **************************************************************************** */

export enum CommandButtonProperties {
	ButtonState = "Button[button].State",
	ButtonStateOnly = "Button[button].StateOnly",
	ButtonTrigger = "Button[button].Trigger",
}

/* FX **************************************************************************
 **************************************************************************** */

export enum FXProperties {
	ReverbOn = "Reverb.On",
	ReverbAB = "Reverb.AB",
	DelayOn = "Delay.On",
	DelayAB = "Delay.AB",
}

/* PATCH ***********************************************************************
 **************************************************************************** */

/* @todo
patch.asio[i] 0 to ASIO input ASIO Patch 1
patch.OutA2[i] 0 to ASIO output channel ASIO Patch A2 Bus 2
patch.OutA3[i] 0 to ASIO output channel ASIO Patch A3 Bus 2
patch.OutA4[i] 0 to ASIO output channel ASIO Patch A4 Bus 3
patch.OutA5[i] 0 to ASIO output channel ASIO Patch A5 Bus 3
Patch.composite[j] 0 to 22 (1 = first channel) 0 = default BUS 2
Patch.insert[k] 0 (off) or 1 (on) Virtual ASIO insert 2
Patch.PostFaderComposite 0 (PRE) or 1 (POST) COMPOSITE Mode 2
Patch.PostFxInsert 0 (PRE) or 1 (POST) Virtual INSERT Point 2

i= input channel zero based index (for physical strips only – 2 channels per strip).
j= composite channel zero based index (0 to 7) COMPOSITE mode is made of 8 channels.
k= input channel zero based index (0 to 21).
*/
export enum PatchProperties {
	PostFaderComposite = "PostFaderComposite",
	PostFxInsert = "PostFxInsert",
}

export enum PatchChannelProperties {
	Asio = "asio[channel]",
	OutA2 = "OutA2[channel]",
	OutA3 = "OutA3[channel]",
	OutA4 = "OutA4[channel]",
	OutA5 = "OutA5[channel]",
}

// @todo the following 2 patch properties
export enum PatchCompositeProperties {
	Composite = "composite[channel]",
}

export enum PatchInsertProperties {
	Insert = "insert[channel]",
}

/* SYSTEM **********************************************************************
 **************************************************************************** */

export enum SystemProperties {
	SR = "sr",
	ASIOSR = "ASIOsr",
	BufferMME = "buffer.mme",
	BufferWDM = "buffer.wdm",
	BufferKS = "buffer.ks",
	BufferASIO = "buffer.asio",
	ModeExclusif = "mode.exclusif",
	ModeSwift = "mode.swift",
	MonitorOnSEL = "MonitorOnSEL",
}

export enum SystemBusDelayProperties {
	Delay = "delay[bus]",
}

/* RECORDER ********************************************************************
 **************************************************************************** */

// @todo
export enum RecorderProperties {}

/* VBAN ************************************************************************
 **************************************************************************** */

// @todo
export enum VBANProperties {}
