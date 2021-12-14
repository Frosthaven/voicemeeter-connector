export declare const InterfaceTypes: {
    strip: number;
    bus: number;
};
export declare enum Replacers {
    App = "[app]",
    Bus = "[bus]",
    Button = "[button]",
    Cell = "[cell]",
    Channel = "[channel]",
    Strip = "[strip]"
}
export declare enum StripProperties {
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
    DeviceASIO = "device.asio"
}
export declare enum StripGainLayerProperties {
    GainLayer = "GainLayer[bus]"
}
export declare enum StripAppProperties {
    StripAppGain = "AppGain",
    StripAppMute = "AppMute",
    StripAppGainPartialMatch = "App[app].Gain",
    StripAppMutePartialMatch = "App[app].Mute"
}
export declare enum BusProperties {
    Mono = "Mono",
    Mute = "Mute",
    EQ = "EQ.on",
    EQAB = "EQ.AB",
    Gain = "Gain",
    Label = "Label",
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
    DeviceASIO = "device.asio"
}
export declare enum BusEQChannelCellProperties {
    EQChannelCellOn = "EQ.channel[channel].cell[cell].on",
    EQChannelCellType = "EQ.channel[channel].cell[cell].type",
    EQChannelCellF = "EQ.channel[channel].cell[cell].f",
    EQChannelCellGain = "EQ.channel[channel].cell[cell].gain",
    EQChannelCellQ = "EQ.channel[channel].cell[cell].q"
}
export declare enum CommandProperties {
    Shutdown = "Shutdown",
    Show = "Show",
    Restart = "Restart",
    Eject = "Eject",
    Reset = "Reset",
    Save = "Save",
    Load = "Load",
    DialogShowVBANCHAT = "DialogShow.VBANCHAT"
}
export declare enum CommandBusEQProperties {
    LoadBUSEQ = "LoadBUSEQ[bus]",
    SaveBUSEQ = "SaveBUSEQ[bus]"
}
export declare enum CommandButtonProperties {
    ButtonState = "Button[button].State",
    ButtonStateOnly = "Button[button].StateOnly",
    ButtonTrigger = "Button[button].Trigger"
}
export declare enum FXProperties {
    ReverbOn = "Reverb.On",
    ReverbAB = "Reverb.AB",
    DelayOn = "Delay.On",
    DelayAB = "Delay.AB"
}
export declare enum PatchProperties {
    PostFaderComposite = "PostFaderComposite",
    PostFxInsert = "PostFxInsert"
}
export declare enum PatchChannelProperties {
    Asio = "asio[channel]",
    OutA2 = "OutA2[channel]",
    OutA3 = "OutA3[channel]",
    OutA4 = "OutA4[channel]",
    OutA5 = "OutA5[channel]"
}
export declare enum PatchCompositeProperties {
    Composite = "composite[channel]"
}
export declare enum PatchInsertProperties {
    Insert = "insert[channel]"
}
export declare enum SystemProperties {
    SR = "sr",
    ASIOSR = "ASIOsr",
    BufferMME = "buffer.mme",
    BufferWDM = "buffer.wdm",
    BufferKS = "buffer.ks",
    BufferASIO = "buffer.asio",
    ModeExclusif = "mode.exclusif",
    ModeSwift = "mode.swift",
    MonitorOnSEL = "MonitorOnSEL"
}
export declare enum SystemBusDelayProperties {
    Delay = "delay[bus]"
}
export declare enum RecorderProperties {
}
export declare enum VBANProperties {
}
