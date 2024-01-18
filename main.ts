radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        ACtimer = 10
    }
})
// Button A
input.onButtonPressed(Button.A, function () {
    if (alarm == 1 && (silence == 0 && ack == 0)) {
        ack = 1
    } else if (alarm == 0 && (silence == 0 && (ack == 0 && (trouble == 1 && troublesilence == 0)))) {
        troublesilence = 1
    }
})
function Display (_1: string, _2: string, _3: string, _4: string, _1align: number, _2align: number, _3align: number, _4align: number) {
    if (_1 != display1 || _2 != display2 || (_3 != display3 || _4 != display4)) {
        makerbit.clearLcd2004()
        basic.pause(100)
        if (_1align == 0) {
            makerbit.showStringOnLcd2004(_1, makerbit.position2004(LcdPosition2004.Pos1), 20, TextOption.AlignLeft)
        } else if (_1align == 1) {
            makerbit.showStringOnLcd2004(_1, makerbit.position2004(LcdPosition2004.Pos1), 20, TextOption.AlignRight)
        } else if (_1align == 2) {
            makerbit.showStringOnLcd2004(_1, makerbit.position2004(LcdPosition2004.Pos1), 20, TextOption.AlignCenter)
        } else if (_1align == 2) {
            makerbit.showStringOnLcd2004(_1, makerbit.position2004(LcdPosition2004.Pos1), 20, TextOption.PadWithZeros)
        } else {
            makerbit.showStringOnLcd2004(_1, makerbit.position2004(LcdPosition2004.Pos1), 20, TextOption.AlignLeft)
        }
        if (_2align == 0) {
            makerbit.showStringOnLcd2004(_2, makerbit.position2004(LcdPosition2004.Pos21), 20, TextOption.AlignLeft)
        } else if (_2align == 1) {
            makerbit.showStringOnLcd2004(_2, makerbit.position2004(LcdPosition2004.Pos21), 20, TextOption.AlignRight)
        } else if (_2align == 2) {
            makerbit.showStringOnLcd2004(_2, makerbit.position2004(LcdPosition2004.Pos21), 20, TextOption.AlignCenter)
        } else if (_2align == 2) {
            makerbit.showStringOnLcd2004(_2, makerbit.position2004(LcdPosition2004.Pos21), 20, TextOption.PadWithZeros)
        } else {
            makerbit.showStringOnLcd2004(_2, makerbit.position2004(LcdPosition2004.Pos21), 20, TextOption.AlignLeft)
        }
        if (_3align == 0) {
            makerbit.showStringOnLcd2004(_3, makerbit.position2004(LcdPosition2004.Pos41), 20, TextOption.AlignLeft)
        } else if (_3align == 1) {
            makerbit.showStringOnLcd2004(_3, makerbit.position2004(LcdPosition2004.Pos41), 20, TextOption.AlignRight)
        } else if (_3align == 2) {
            makerbit.showStringOnLcd2004(_3, makerbit.position2004(LcdPosition2004.Pos41), 20, TextOption.AlignCenter)
        } else if (_3align == 2) {
            makerbit.showStringOnLcd2004(_3, makerbit.position2004(LcdPosition2004.Pos41), 20, TextOption.PadWithZeros)
        } else {
            makerbit.showStringOnLcd2004(_3, makerbit.position2004(LcdPosition2004.Pos41), 20, TextOption.AlignLeft)
        }
        if (_4align == 0) {
            makerbit.showStringOnLcd2004(_4, makerbit.position2004(LcdPosition2004.Pos61), 20, TextOption.AlignLeft)
        } else if (_4align == 1) {
            makerbit.showStringOnLcd2004(_4, makerbit.position2004(LcdPosition2004.Pos61), 20, TextOption.AlignRight)
        } else if (_4align == 2) {
            makerbit.showStringOnLcd2004(_4, makerbit.position2004(LcdPosition2004.Pos61), 20, TextOption.AlignCenter)
        } else if (_4align == 2) {
            makerbit.showStringOnLcd2004(_4, makerbit.position2004(LcdPosition2004.Pos61), 20, TextOption.PadWithZeros)
        } else {
            makerbit.showStringOnLcd2004(_4, makerbit.position2004(LcdPosition2004.Pos61), 20, TextOption.AlignLeft)
        }
        display1 = _1
        display2 = _2
        display3 = _3
        display4 = _4
    } else {
    	
    }
}
// Button AB reset
input.onButtonPressed(Button.AB, function () {
    if (input.pinIsPressed(TouchPin.P0) || (input.pinIsPressed(TouchPin.P1) || input.pinIsPressed(TouchPin.P2))) {
        resetmessage = 1
        LCDbacklight(1)
        Display("Can't reset", "Zone(s) in alarm", "", "", 2, 2, 0, 0)
        basic.pause(2000)
        resetmessage = 0
    } else {
        makerbit.clearLcd2004()
        control.reset()
    }
})
// Button B
input.onButtonPressed(Button.B, function () {
    if (alarm == 1 && (silence == 0 && ack == 1)) {
        silence = 1
        pins.digitalWritePin(DigitalPin.P15, 0)
    }
})
function LCDbacklight (disableenable: number) {
    if (disableenable == 0 && backlight != 0) {
        backlight = 0
        makerbit.setLcdBacklight(LcdBacklight.Off)
    } else if (disableenable == 1 && backlight != 1) {
        backlight = 1
        makerbit.setLcdBacklight(LcdBacklight.On)
    }
}
let noac = 0
let zone3 = 0
let zone2 = 0
let zone1 = 0
let resetmessage = 0
let troublesilence = 0
let trouble = 0
let ack = 0
let silence = 0
let alarm = 0
let ACtimer = 0
let display4 = ""
let display3 = ""
let display2 = ""
let display1 = ""
let backlight = 0
led.enable(false)
let boot = 1
makerbit.connectLcd(39)
backlight = 1
display1 = ""
display2 = ""
display3 = ""
display4 = ""
pins.setAudioPin(AnalogPin.P16)
radio.setGroup(86)
makerbit.showStringOnLcd2004("####################", makerbit.position2004(LcdPosition2004.Pos1), 20)
makerbit.showStringOnLcd2004("####################", makerbit.position2004(LcdPosition2004.Pos21), 20)
makerbit.showStringOnLcd2004("####################", makerbit.position2004(LcdPosition2004.Pos41), 20)
makerbit.showStringOnLcd2004("####################", makerbit.position2004(LcdPosition2004.Pos61), 20)
pins.digitalWritePin(DigitalPin.P3, 1)
pins.digitalWritePin(DigitalPin.P6, 1)
pins.digitalWritePin(DigitalPin.P8, 1)
pins.digitalWritePin(DigitalPin.P10, 1)
pins.digitalWritePin(DigitalPin.P13, 1)
pins.digitalWritePin(DigitalPin.P14, 1)
pins.digitalWritePin(DigitalPin.P16, 1)
basic.pause(2000)
pins.digitalWritePin(DigitalPin.P3, 0)
pins.digitalWritePin(DigitalPin.P6, 0)
pins.digitalWritePin(DigitalPin.P8, 0)
pins.digitalWritePin(DigitalPin.P10, 0)
pins.digitalWritePin(DigitalPin.P13, 0)
pins.digitalWritePin(DigitalPin.P14, 0)
pins.digitalWritePin(DigitalPin.P16, 0)
makerbit.clearLcd2004()
boot = 0
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P7) == 1) {
        basic.pause(2000)
        if (pins.digitalReadPin(DigitalPin.P7) == 1) {
            if (input.pinIsPressed(TouchPin.P0) || (input.pinIsPressed(TouchPin.P1) || input.pinIsPressed(TouchPin.P2))) {
                resetmessage = 1
                Display("Can't reset", "Zone(s) in alarm", "", "", 2, 2, 0, 0)
                basic.pause(2000)
                resetmessage = 0
            } else {
                makerbit.clearLcd2004()
                control.reset()
            }
        }
    } else if (pins.digitalReadPin(DigitalPin.P9) == 1) {
        basic.pause(5000)
        if (pins.digitalReadPin(DigitalPin.P9) == 1) {
            alarm = 1
            zone1 = 1
            zone2 = 1
            zone3 = 1
        }
    }
})
basic.forever(function () {
    if (alarm == 0 && (silence == 0 && (ack == 0 && trouble == 0))) {
        if (resetmessage == 0) {
            Display("System normal", "", "", "", 2, 0, 0, 0)
        }
    } else if (alarm == 1 && (silence == 0 && ack == 0)) {
        LCDbacklight(1)
        if (resetmessage == 0) {
            if (zone1 == 1 && (zone2 == 0 && zone3 == 0)) {
                Display("FIRE ALARM", "1", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 0 && (zone2 == 1 && zone3 == 0)) {
                pins.digitalWritePin(DigitalPin.P14, 1)
                Display("FIRE ALARM", "2", "", "", 2, 0, 0, 0)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("FIRE ALARM", "3", "", "", 2, 0, 0, 0)
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 0)) {
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
                Display("FIRE ALARM", "1,2", "", "", 2, 0, 0, 0)
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 1)) {
                Display("FIRE ALARM", "1,2,3", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
            } else if (zone1 == 1 && (zone2 == 0 && zone3 == 1)) {
                Display("FIRE ALARM", "1,3", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("FIRE ALARM", "2,3", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P14, 1)
            }
        }
        pins.digitalWritePin(DigitalPin.P3, 1)
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(100)
        LCDbacklight(1)
        if (resetmessage == 0) {
            if (zone1 == 1 && (zone2 == 0 && zone3 == 0)) {
                Display("FIRE ALARM", "1", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P13, 0)
            } else if (zone1 == 0 && (zone2 == 1 && zone3 == 0)) {
                pins.digitalWritePin(DigitalPin.P14, 0)
                Display("FIRE ALARM", "2", "", "", 2, 0, 0, 0)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("FIRE ALARM", "3", "", "", 2, 0, 0, 0)
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 0)) {
                pins.digitalWritePin(DigitalPin.P13, 0)
                pins.digitalWritePin(DigitalPin.P14, 0)
                Display("FIRE ALARM", "1,2", "", "", 2, 0, 0, 0)
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 1)) {
                Display("FIRE ALARM", "1,2,3", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P13, 0)
                pins.digitalWritePin(DigitalPin.P14, 0)
            } else if (zone1 == 1 && (zone2 == 0 && zone3 == 1)) {
                Display("FIRE ALARM", "1,3", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P13, 0)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("FIRE ALARM", "2,3", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P14, 0)
            }
        }
        pins.digitalWritePin(DigitalPin.P3, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
        basic.pause(100)
    } else if (alarm == 1 && (silence == 0 && ack == 1)) {
        LCDbacklight(1)
        if (resetmessage == 0) {
            if (zone1 == 1 && (zone2 == 0 && zone3 == 0)) {
                Display("ALARM ACK", "1", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 0 && (zone2 == 1 && zone3 == 0)) {
                pins.digitalWritePin(DigitalPin.P14, 1)
                Display("ALARM ACK", "2", "", "", 2, 0, 0, 0)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("ALARM ACK", "3", "", "", 2, 0, 0, 0)
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 0)) {
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
                Display("ALARM ACK", "1,2", "", "", 2, 0, 0, 0)
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 1)) {
                Display("ALARM ACK", "1,2,3", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
            } else if (zone1 == 1 && (zone2 == 0 && zone3 == 1)) {
                Display("ALARM ACK", "1,3", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("ALARM ACK", "2,3", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P14, 1)
            }
        }
    } else if (alarm == 1 && (silence == 1 && ack == 1)) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        LCDbacklight(1)
        if (resetmessage == 0) {
            if (zone1 == 1 && (zone2 == 0 && zone3 == 0)) {
                Display("ALARM SILENCED", "1", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 0 && (zone2 == 1 && zone3 == 0)) {
                Display("ALARM SILENCED", "2", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P14, 1)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("ALARM SILENCED", "3", "", "", 2, 0, 0, 0)
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 0)) {
                Display("ALARM SILENCED", "1,2", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 1)) {
                Display("ALARM SILENCED", "1,2,3", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P14, 1)
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 1 && (zone2 == 0 && zone3 == 1)) {
                Display("ALARM SILENCED", "1,3", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("ALARM SILENCED", "2,3", "", "", 2, 0, 0, 0)
                pins.digitalWritePin(DigitalPin.P14, 1)
            }
        }
    }
    if (alarm == 0 && (silence == 0 && (ack == 0 && (trouble == 1 && troublesilence == 0)))) {
        LCDbacklight(1)
        if (noac == 1) {
            Display("System in fault", "NO AC POWER", "", "", 2, 2, 0, 0)
        } else {
            Display("System in fault", "", "", "", 2, 0, 0, 0)
        }
        pins.digitalWritePin(DigitalPin.P10, 1)
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(1000)
        pins.digitalWritePin(DigitalPin.P10, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
        basic.pause(1000)
    } else if (alarm == 0 && (silence == 0 && (ack == 0 && (trouble == 1 && troublesilence == 1)))) {
        LCDbacklight(1)
        pins.digitalWritePin(DigitalPin.P16, 0)
        pins.digitalWritePin(DigitalPin.P10, 1)
        if (noac == 1) {
            Display("Fault silenced", "NO AC POWER", "", "", 2, 2, 0, 0)
        } else {
            Display("Fault silenced", "", "", "", 2, 0, 0, 0)
        }
    } else if (trouble == 1 && alarm == 1) {
        pins.digitalWritePin(DigitalPin.P10, 1)
    }
})
basic.forever(function () {
    if (ACtimer != 0) {
        ACtimer += -1
        basic.pause(1000)
        noac = 0
    } else {
        noac = 1
        trouble = 1
    }
    if (noac == 0) {
        trouble = 0
    }
})
basic.forever(function () {
    if (boot == 0) {
        if (input.pinIsPressed(TouchPin.P0)) {
            if (zone1 == 0) {
                alarm = 1
                zone1 = 1
                ack = 0
                silence = 0
            }
        } else if (input.pinIsPressed(TouchPin.P1)) {
            if (zone2 == 0) {
                alarm = 1
                zone2 = 1
                ack = 0
                silence = 0
            }
        } else if (input.pinIsPressed(TouchPin.P2)) {
            if (zone3 == 0) {
                alarm = 1
                zone3 = 1
                ack = 0
                silence = 0
            }
        }
    }
})
basic.forever(function () {
    if (serial.readLine() == "reset") {
        if (input.pinIsPressed(TouchPin.P0) || (input.pinIsPressed(TouchPin.P1) || input.pinIsPressed(TouchPin.P2))) {
            serial.writeLine("503 Service Unavailable")
            resetmessage = 1
            LCDbacklight(1)
            Display("Can't reset", "Zone(s) in alarm", "", "", 2, 2, 0, 0)
            basic.pause(2000)
            resetmessage = 0
        } else {
            serial.writeLine("200 OK")
            makerbit.clearLcd2004()
            control.reset()
        }
    } else if (serial.readLine() == "forcereset") {
        serial.writeLine("200 OK")
        makerbit.clearLcd2004()
        control.reset()
    } else if (serial.readLine() == "alarm") {
        alarm = 1
        zone1 = 1
        zone2 = 1
        zone3 = 1
        ack = 0
        silence = 0
        serial.writeLine("200 OK")
    } else if (serial.readLine() == "ack") {
        if (alarm == 1 && (silence == 0 && ack == 0)) {
            ack = 1
            serial.writeLine("200 OK")
        } else if (alarm == 0 && (silence == 0 && (ack == 0 && (trouble == 1 && troublesilence == 0)))) {
            troublesilence = 1
            serial.writeLine("200 OK")
        }
    } else if (serial.readLine() == "silence") {
        if (alarm == 1 && (silence == 0 && ack == 1)) {
            silence = 1
            pins.digitalWritePin(DigitalPin.P15, 0)
            serial.writeLine("200 OK")
        }
    } else {
    	
    }
})
