export const InterfaceTypes = {
	strip: 0,
	bus: 1,
};

/* @todo - probably through a different method
	Strip[i].GainLayer[j]
*/
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

/* @todo - probably through a different method
	Bus[i].EQ.channel[j].cell[k].on
	Bus[i].EQ.channel[j].cell[k].type
	Bus[i].EQ.channel[j].cell[k].f
	Bus[i].EQ.channel[j].cell[k].gain
	Bus[i].EQ.channel[j].cell[k].q
*/
export enum BusProperties {
	Mono = "Mono",
	Mute = "Mute",
	EQ = "EQ.on",
	EQAB = "EQ.AB",
	Gain = "Gain",
	Label = "Label", // not listed in api doc, but exists
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

export enum CommandProperties {
	Shutdown = "Shutdown",
	Show = "Show",
	Restart = "Restart",
	Eject = "Eject",
	Reset = "Reset",
	Save = "Save",
	Load = "Load",
}
