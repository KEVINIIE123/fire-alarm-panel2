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
function Display (_1: string, _2: string) {
    if (_1 != display1 || _2 != display2) {
        makerbit.showStringOnLcd1602(_1, makerbit.position1602(LcdPosition1602.Pos1), 16)
        makerbit.showStringOnLcd1602(_2, makerbit.position1602(LcdPosition1602.Pos17), 16)
        display1 = _1
        display2 = _2
    } else {
    	
    }
}
// Button AB reset
input.onButtonPressed(Button.AB, function () {
    if (input.pinIsPressed(TouchPin.P0) || (input.pinIsPressed(TouchPin.P1) || input.pinIsPressed(TouchPin.P2))) {
        resetmessage = 1
        LCDbacklight(1)
        Display("Can't reset     ", "Zone(s) in alarm")
        basic.pause(2000)
        resetmessage = 0
    } else {
        makerbit.clearLcd1602()
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
let display2 = ""
let display1 = ""
let backlight = 0
led.enable(false)
let boot = 1
makerbit.connectLcd(39)
makerbit.showStringOnLcd1602("Booting...", makerbit.position1602(LcdPosition1602.Pos1), 16)
makerbit.showStringOnLcd1602("Setting variable", makerbit.position1602(LcdPosition1602.Pos17), 16)
backlight = 1
display1 = ""
display2 = ""
pins.setAudioPin(AnalogPin.P16)
makerbit.showStringOnLcd1602("Setting radio...", makerbit.position1602(LcdPosition1602.Pos1), 16)
radio.setGroup(86)
makerbit.showStringOnLcd1602("################", makerbit.position1602(LcdPosition1602.Pos1), 16)
makerbit.showStringOnLcd1602("################", makerbit.position1602(LcdPosition1602.Pos17), 16)
pins.digitalWritePin(DigitalPin.P3, 1)
pins.digitalWritePin(DigitalPin.P6, 1)
pins.digitalWritePin(DigitalPin.P8, 1)
pins.digitalWritePin(DigitalPin.P10, 1)
pins.digitalWritePin(DigitalPin.P13, 1)
pins.digitalWritePin(DigitalPin.P14, 1)
pins.digitalWritePin(DigitalPin.P16, 1)
basic.pause(500)
pins.digitalWritePin(DigitalPin.P3, 0)
pins.digitalWritePin(DigitalPin.P6, 0)
pins.digitalWritePin(DigitalPin.P8, 0)
pins.digitalWritePin(DigitalPin.P10, 0)
pins.digitalWritePin(DigitalPin.P13, 0)
pins.digitalWritePin(DigitalPin.P14, 0)
pins.digitalWritePin(DigitalPin.P16, 0)
makerbit.clearLcd1602()
boot = 0
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P7) == 1) {
        basic.pause(2000)
        if (pins.digitalReadPin(DigitalPin.P7) == 1) {
            if (input.pinIsPressed(TouchPin.P0) || (input.pinIsPressed(TouchPin.P1) || input.pinIsPressed(TouchPin.P2))) {
                resetmessage = 1
                Display("Can't reset     ", "Zone(s) in alarm")
                basic.pause(2000)
                resetmessage = 0
            } else {
                makerbit.clearLcd1602()
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
        LCDbacklight(0)
        if (resetmessage == 0) {
            Display("System normal   ", "                ")
        }
    } else if (alarm == 1 && (silence == 0 && ack == 0)) {
        LCDbacklight(1)
        if (resetmessage == 0) {
            if (zone1 == 1 && (zone2 == 0 && zone3 == 0)) {
                Display("FIRE ALARM      ", "1               ")
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 0 && (zone2 == 1 && zone3 == 0)) {
                pins.digitalWritePin(DigitalPin.P14, 1)
                Display("FIRE ALARM      ", "2               ")
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("FIRE ALARM      ", "3               ")
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 0)) {
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
                Display("FIRE ALARM      ", "1,2             ")
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 1)) {
                Display("FIRE ALARM      ", "1,2,3           ")
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
            } else if (zone1 == 1 && (zone2 == 0 && zone3 == 1)) {
                Display("FIRE ALARM      ", "1,3             ")
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("FIRE ALARM      ", "2,3             ")
                pins.digitalWritePin(DigitalPin.P14, 1)
            }
        }
        pins.digitalWritePin(DigitalPin.P3, 1)
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(100)
        LCDbacklight(1)
        if (resetmessage == 0) {
            if (zone1 == 1 && (zone2 == 0 && zone3 == 0)) {
                Display("FIRE ALARM      ", "1               ")
                pins.digitalWritePin(DigitalPin.P13, 0)
            } else if (zone1 == 0 && (zone2 == 1 && zone3 == 0)) {
                pins.digitalWritePin(DigitalPin.P14, 0)
                Display("FIRE ALARM      ", "2               ")
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("FIRE ALARM      ", "3               ")
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 0)) {
                pins.digitalWritePin(DigitalPin.P13, 0)
                pins.digitalWritePin(DigitalPin.P14, 0)
                Display("FIRE ALARM      ", "1,2             ")
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 1)) {
                Display("FIRE ALARM      ", "1,2,3           ")
                pins.digitalWritePin(DigitalPin.P13, 0)
                pins.digitalWritePin(DigitalPin.P14, 0)
            } else if (zone1 == 1 && (zone2 == 0 && zone3 == 1)) {
                Display("FIRE ALARM      ", "1,3             ")
                pins.digitalWritePin(DigitalPin.P13, 0)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("FIRE ALARM      ", "2,3             ")
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
                Display("ALARM ACK       ", "1               ")
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 0 && (zone2 == 1 && zone3 == 0)) {
                pins.digitalWritePin(DigitalPin.P14, 1)
                Display("ALARM ACK       ", "2               ")
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("ALARM ACK       ", "3               ")
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 0)) {
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
                Display("ALARM ACK       ", "1,2             ")
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 1)) {
                Display("ALARM ACK       ", "1,2,3           ")
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
            } else if (zone1 == 1 && (zone2 == 0 && zone3 == 1)) {
                Display("ALARM ACK       ", "1,3             ")
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("ALARM ACK       ", "2,3             ")
                pins.digitalWritePin(DigitalPin.P14, 1)
            }
        }
    } else if (alarm == 1 && (silence == 1 && ack == 1)) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        LCDbacklight(1)
        if (resetmessage == 0) {
            if (zone1 == 1 && (zone2 == 0 && zone3 == 0)) {
                Display("ALARM SILENCED  ", "1               ")
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 0 && (zone2 == 1 && zone3 == 0)) {
                Display("ALARM SILENCED  ", "2               ")
                pins.digitalWritePin(DigitalPin.P14, 1)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("ALARM SILENCED  ", "3               ")
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 0)) {
                Display("ALARM SILENCED  ", "1,2             ")
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 1)) {
                Display("ALARM SILENCED  ", "1,2,3           ")
                pins.digitalWritePin(DigitalPin.P14, 1)
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 1 && (zone2 == 0 && zone3 == 1)) {
                Display("ALARM SILENCED  ", "1,3             ")
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                Display("ALARM SILENCED  ", "2,3             ")
                pins.digitalWritePin(DigitalPin.P14, 1)
            }
        }
    }
    if (alarm == 0 && (silence == 0 && (ack == 0 && (trouble == 1 && troublesilence == 0)))) {
        LCDbacklight(1)
        if (noac == 1) {
            Display("System in fault ", "NO AC POWER     ")
        } else {
            Display("System in fault ", "")
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
            Display("Fault silenced  ", "NO AC POWER     ")
        } else {
            Display("Fault silenced  ", "")
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
        trouble = 0
    } else {
        noac = 1
        trouble = 1
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
