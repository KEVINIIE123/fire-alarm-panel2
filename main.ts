radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        test = 1
    }
})
input.onButtonPressed(Button.A, function () {
    if (alarm == 1 && (silence == 0 && ack == 0)) {
        ack = 1
    } else if (alarm == 0 && (silence == 0 && (ack == 0 && (trouble == 1 && troublesilence == 0)))) {
        troublesilence = 1
    }
})
input.onButtonPressed(Button.AB, function () {
    control.reset()
})
input.onButtonPressed(Button.B, function () {
    if (alarm == 1 && (silence == 0 && ack == 1)) {
        silence = 1
        pins.digitalWritePin(DigitalPin.P15, 0)
    }
})
let zone3 = 0
let zone2 = 0
let zone1 = 0
let resetmessage = 0
let troublesilence = 0
let ack = 0
let silence = 0
let alarm = 0
let noac = 0
let trouble = 0
let test = 0
led.enable(false)
let boot = 1
I2C_LCD1602.LcdInit(0)
I2C_LCD1602.ShowString("Booting...", 0, 0)
I2C_LCD1602.ShowString("Setting variable", 0, 1)
pins.setAudioPin(AnalogPin.P16)
I2C_LCD1602.ShowString("Setting radio...", 0, 1)
radio.setGroup(1)
I2C_LCD1602.ShowString("AC test...      ", 0, 1)
for (let index = 0; index < 10; index++) {
    if (test == 1) {
        break;
    } else {
        basic.pause(500)
    }
}
if (test == 0) {
    trouble = 1
    noac = 1
    I2C_LCD1602.ShowString("AC test fail    ", 0, 1)
    basic.pause(1000)
}
I2C_LCD1602.ShowString("################", 0, 1)
I2C_LCD1602.ShowString("################", 0, 0)
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
I2C_LCD1602.clear()
boot = 0
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P7) == 1) {
        basic.pause(2000)
        if (pins.digitalReadPin(DigitalPin.P7) == 1) {
            if (input.pinIsPressed(TouchPin.P0) || (input.pinIsPressed(TouchPin.P1) || input.pinIsPressed(TouchPin.P2))) {
                resetmessage = 1
                I2C_LCD1602.ShowString("Can't reset     ", 0, 0)
                I2C_LCD1602.ShowString("Zone(s) in alarm", 0, 1)
                basic.pause(2000)
                resetmessage = 0
            } else {
                I2C_LCD1602.clear()
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
            I2C_LCD1602.ShowString("System normal   ", 0, 0)
        }
    } else if (alarm == 1 && (silence == 0 && ack == 0)) {
        pins.digitalWritePin(DigitalPin.P3, 1)
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P3, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
        basic.pause(100)
        if (resetmessage == 0) {
            I2C_LCD1602.ShowString("FIRE ALARM      ", 0, 0)
            I2C_LCD1602.ShowString("Click to ack    ", 0, 1)
        }
    } else if (alarm == 1 && (silence == 0 && ack == 1)) {
        if (resetmessage == 0) {
            I2C_LCD1602.ShowString("FIRE ALARM zones", 0, 0)
            if (zone1 == 1 && (zone2 == 0 && zone3 == 0)) {
                pins.digitalWritePin(DigitalPin.P13, 1)
                I2C_LCD1602.ShowString("1               ", 0, 1)
            } else if (zone1 == 0 && (zone2 == 1 && zone3 == 0)) {
                pins.digitalWritePin(DigitalPin.P14, 1)
                I2C_LCD1602.ShowString("2               ", 0, 1)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                I2C_LCD1602.ShowString("3               ", 0, 1)
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 0)) {
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
                I2C_LCD1602.ShowString("1,2             ", 0, 1)
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 1)) {
                I2C_LCD1602.ShowString("1,2,3           ", 0, 1)
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
            } else if (zone1 == 1 && (zone2 == 0 && zone3 == 1)) {
                I2C_LCD1602.ShowString("1,3             ", 0, 1)
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                I2C_LCD1602.ShowString("2,3             ", 0, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
            }
        }
    } else if (alarm == 1 && (silence == 1 && ack == 1)) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        if (resetmessage == 0) {
            I2C_LCD1602.ShowString("ALARM SILENCED  ", 0, 0)
            if (zone1 == 1 && (zone2 == 0 && zone3 == 0)) {
                I2C_LCD1602.ShowString("1               ", 0, 1)
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 0 && (zone2 == 1 && zone3 == 0)) {
                I2C_LCD1602.ShowString("2               ", 0, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                I2C_LCD1602.ShowString("3               ", 0, 1)
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 0)) {
                I2C_LCD1602.ShowString("1,2             ", 0, 1)
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
            } else if (zone1 == 1 && (zone2 == 1 && zone3 == 1)) {
                I2C_LCD1602.ShowString("1,2,3           ", 0, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 1 && (zone2 == 0 && zone3 == 1)) {
                I2C_LCD1602.ShowString("1,3             ", 0, 1)
                pins.digitalWritePin(DigitalPin.P13, 1)
            } else if (zone1 == 0 && (zone2 == 0 && zone3 == 1)) {
                I2C_LCD1602.ShowString("2,3             ", 0, 1)
                pins.digitalWritePin(DigitalPin.P14, 1)
            }
        }
    }
    if (alarm == 0 && (silence == 0 && (ack == 0 && (trouble == 1 && troublesilence == 0)))) {
        I2C_LCD1602.ShowString("System in fault ", 0, 0)
        if (noac == 1) {
            I2C_LCD1602.ShowString("NO AC POWER     ", 0, 1)
        }
        pins.digitalWritePin(DigitalPin.P10, 1)
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(1000)
        pins.digitalWritePin(DigitalPin.P10, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
        basic.pause(1000)
    } else if (alarm == 0 && (silence == 0 && (ack == 0 && (trouble == 1 && troublesilence == 1)))) {
        pins.digitalWritePin(DigitalPin.P16, 0)
        pins.digitalWritePin(DigitalPin.P10, 1)
        I2C_LCD1602.ShowString("Fault silenced  ", 0, 0)
        if (noac == 1) {
            I2C_LCD1602.ShowString("NO AC POWER     ", 0, 1)
        }
    }
})
basic.forever(function () {
    if (boot == 0) {
        if (input.pinIsPressed(TouchPin.P0)) {
            if (zone1 == 0) {
                I2C_LCD1602.clear()
                basic.pause(250)
                alarm = 1
                zone1 = 1
                ack = 0
                silence = 0
            }
        } else if (input.pinIsPressed(TouchPin.P1)) {
            if (zone2 == 0) {
                I2C_LCD1602.clear()
                basic.pause(250)
                alarm = 1
                zone2 = 1
                ack = 0
                silence = 0
            }
        } else if (input.pinIsPressed(TouchPin.P2)) {
            if (zone3 == 0) {
                I2C_LCD1602.clear()
                basic.pause(250)
                alarm = 1
                zone3 = 1
                ack = 0
                silence = 0
            }
        }
    }
})
