def on_received_number(receivedNumber):
    global ack, troublesilence
    if receivedNumber == 0:
        if alarm == 1 and (silence == 0 and ack == 0):
            ack = 1
        elif alarm == 0 and (silence == 0 and (ack == 0 and (trouble == 1 and troublesilence == 0))):
            troublesilence = 1
radio.on_received_number(on_received_number)

# Button A

def on_button_pressed_a():
    global ack, troublesilence
    if alarm == 1 and (silence == 0 and ack == 0):
        ack = 1
    elif alarm == 0 and (silence == 0 and (ack == 0 and (trouble == 1 and troublesilence == 0))):
        troublesilence = 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def Display(_1: str, _2: str, _3: str, _4: str, _1align: number, _2align: number, _3align: number, _4align: number):
    global display1, display2, display3, display4
    if _1 != display1 or _2 != display2 or (_3 != display3 or _4 != display4):
        makerbit.clear_lcd2004()
        basic.pause(100)
        if _1align == 0:
            makerbit.show_string_on_lcd2004(_1,
                makerbit.position2004(LcdPosition2004.POS1),
                20,
                TextOption.ALIGN_LEFT)
        elif _1align == 1:
            makerbit.show_string_on_lcd2004(_1,
                makerbit.position2004(LcdPosition2004.POS1),
                20,
                TextOption.ALIGN_RIGHT)
        elif _1align == 2:
            makerbit.show_string_on_lcd2004(_1,
                makerbit.position2004(LcdPosition2004.POS1),
                20,
                TextOption.ALIGN_CENTER)
        elif _1align == 2:
            makerbit.show_string_on_lcd2004(_1,
                makerbit.position2004(LcdPosition2004.POS1),
                20,
                TextOption.PAD_WITH_ZEROS)
        else:
            makerbit.show_string_on_lcd2004(_1,
                makerbit.position2004(LcdPosition2004.POS1),
                20,
                TextOption.ALIGN_LEFT)
        if _2align == 0:
            makerbit.show_string_on_lcd2004(_2,
                makerbit.position2004(LcdPosition2004.POS21),
                20,
                TextOption.ALIGN_LEFT)
        elif _2align == 1:
            makerbit.show_string_on_lcd2004(_2,
                makerbit.position2004(LcdPosition2004.POS21),
                20,
                TextOption.ALIGN_RIGHT)
        elif _2align == 2:
            makerbit.show_string_on_lcd2004(_2,
                makerbit.position2004(LcdPosition2004.POS21),
                20,
                TextOption.ALIGN_CENTER)
        elif _2align == 2:
            makerbit.show_string_on_lcd2004(_2,
                makerbit.position2004(LcdPosition2004.POS21),
                20,
                TextOption.PAD_WITH_ZEROS)
        else:
            makerbit.show_string_on_lcd2004(_2,
                makerbit.position2004(LcdPosition2004.POS21),
                20,
                TextOption.ALIGN_LEFT)
        if _3align == 0:
            makerbit.show_string_on_lcd2004(_3,
                makerbit.position2004(LcdPosition2004.POS41),
                20,
                TextOption.ALIGN_LEFT)
        elif _3align == 1:
            makerbit.show_string_on_lcd2004(_3,
                makerbit.position2004(LcdPosition2004.POS41),
                20,
                TextOption.ALIGN_RIGHT)
        elif _3align == 2:
            makerbit.show_string_on_lcd2004(_3,
                makerbit.position2004(LcdPosition2004.POS41),
                20,
                TextOption.ALIGN_CENTER)
        elif _3align == 2:
            makerbit.show_string_on_lcd2004(_3,
                makerbit.position2004(LcdPosition2004.POS41),
                20,
                TextOption.PAD_WITH_ZEROS)
        else:
            makerbit.show_string_on_lcd2004(_3,
                makerbit.position2004(LcdPosition2004.POS41),
                20,
                TextOption.ALIGN_LEFT)
        if _4align == 0:
            makerbit.show_string_on_lcd2004(_4,
                makerbit.position2004(LcdPosition2004.POS61),
                20,
                TextOption.ALIGN_LEFT)
        elif _4align == 1:
            makerbit.show_string_on_lcd2004(_4,
                makerbit.position2004(LcdPosition2004.POS61),
                20,
                TextOption.ALIGN_RIGHT)
        elif _4align == 2:
            makerbit.show_string_on_lcd2004(_4,
                makerbit.position2004(LcdPosition2004.POS61),
                20,
                TextOption.ALIGN_CENTER)
        elif _4align == 2:
            makerbit.show_string_on_lcd2004(_4,
                makerbit.position2004(LcdPosition2004.POS61),
                20,
                TextOption.PAD_WITH_ZEROS)
        else:
            makerbit.show_string_on_lcd2004(_4,
                makerbit.position2004(LcdPosition2004.POS61),
                20,
                TextOption.ALIGN_LEFT)
        display1 = _1
        display2 = _2
        display3 = _3
        display4 = _4
    else:
        pass
# Button AB reset

def on_button_pressed_ab():
    global resetmessage
    if input.pin_is_pressed(TouchPin.P0) or (input.pin_is_pressed(TouchPin.P1) or input.pin_is_pressed(TouchPin.P2)):
        resetmessage = 1
        LCDbacklight(1)
        Display("Can't reset",
            "Zone(s) in alarm",
            "Metsamarja 31",
            "Garaaž",
            2,
            2,
            2,
            2)
        basic.pause(2000)
        resetmessage = 0
    else:
        makerbit.clear_lcd2004()
        control.reset()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

# Button B

def on_button_pressed_b():
    global silence
    if alarm == 1 and (silence == 0 and ack == 1):
        silence = 1
        pins.digital_write_pin(DigitalPin.P15, 0)
    elif alarm == 1 and (silence == 1 and ack == 1):
        silence = 0
        pins.digital_write_pin(DigitalPin.P15, 1)
input.on_button_pressed(Button.B, on_button_pressed_b)

def LCDbacklight(disableenable: number):
    global backlight
    if disableenable == 0 and backlight != 0:
        backlight = 0
        makerbit.set_lcd_backlight(LcdBacklight.OFF)
    elif disableenable == 1 and backlight != 1:
        backlight = 1
        makerbit.set_lcd_backlight(LcdBacklight.ON)
ACtimer = 0
noac = 0
zone3 = 0
zone2 = 0
zone1 = 0
resetmessage = 0
troublesilence = 0
trouble = 0
ack = 0
silence = 0
alarm = 0
display4 = ""
display3 = ""
display2 = ""
display1 = ""
backlight = 0
led.enable(False)
boot = 1
makerbit.connect_lcd(39)
backlight = 1
display1 = ""
display2 = ""
display3 = ""
display4 = ""
pins.set_audio_pin(AnalogPin.P16)
makerbit.show_string_on_lcd2004("####################",
    makerbit.position2004(LcdPosition2004.POS1),
    20)
makerbit.show_string_on_lcd2004("####################",
    makerbit.position2004(LcdPosition2004.POS21),
    20)
makerbit.show_string_on_lcd2004("####################",
    makerbit.position2004(LcdPosition2004.POS41),
    20)
makerbit.show_string_on_lcd2004("####################",
    makerbit.position2004(LcdPosition2004.POS61),
    20)
pins.digital_write_pin(DigitalPin.P3, 1)
pins.digital_write_pin(DigitalPin.P6, 1)
pins.digital_write_pin(DigitalPin.P8, 1)
pins.digital_write_pin(DigitalPin.P10, 1)
pins.digital_write_pin(DigitalPin.P13, 1)
pins.digital_write_pin(DigitalPin.P14, 1)
pins.digital_write_pin(DigitalPin.P16, 1)
basic.pause(2000)
pins.digital_write_pin(DigitalPin.P3, 0)
pins.digital_write_pin(DigitalPin.P6, 0)
pins.digital_write_pin(DigitalPin.P8, 0)
pins.digital_write_pin(DigitalPin.P10, 0)
pins.digital_write_pin(DigitalPin.P13, 0)
pins.digital_write_pin(DigitalPin.P14, 0)
pins.digital_write_pin(DigitalPin.P16, 0)
makerbit.clear_lcd2004()
boot = 0

def on_forever():
    global resetmessage, alarm, zone1, zone2, zone3
    if pins.digital_read_pin(DigitalPin.P7) == 1:
        basic.pause(2000)
        if pins.digital_read_pin(DigitalPin.P7) == 1:
            if input.pin_is_pressed(TouchPin.P0) or (input.pin_is_pressed(TouchPin.P1) or input.pin_is_pressed(TouchPin.P2)):
                resetmessage = 1
                Display("Can't reset",
                    "Zone(s) in alarm",
                    "Metsamarja 31",
                    "",
                    2,
                    2,
                    2,
                    0)
                basic.pause(2000)
                resetmessage = 0
            else:
                makerbit.clear_lcd2004()
                control.reset()
    elif pins.digital_read_pin(DigitalPin.P9) == 1:
        basic.pause(5000)
        if pins.digital_read_pin(DigitalPin.P9) == 1:
            alarm = 1
            zone1 = 1
            zone2 = 1
            zone3 = 1
basic.forever(on_forever)

def on_forever2():
    if alarm == 0 and (silence == 0 and (ack == 0 and trouble == 0)):
        if resetmessage == 0:
            Display("System normal", "", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
    elif alarm == 1 and (silence == 0 and ack == 0):
        LCDbacklight(1)
        pins.digital_write_pin(DigitalPin.P15, 1)
        if resetmessage == 0:
            if zone1 == 1 and (zone2 == 0 and zone3 == 0):
                Display("FIRE ALARM", "1", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
                pins.digital_write_pin(DigitalPin.P13, 1)
            elif zone1 == 0 and (zone2 == 1 and zone3 == 0):
                pins.digital_write_pin(DigitalPin.P14, 1)
                Display("FIRE ALARM", "2", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                Display("FIRE ALARM", "3", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 0):
                pins.digital_write_pin(DigitalPin.P13, 1)
                pins.digital_write_pin(DigitalPin.P14, 1)
                Display("FIRE ALARM", "1,2", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 1):
                Display("FIRE ALARM", "1,2,3", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
                pins.digital_write_pin(DigitalPin.P13, 1)
                pins.digital_write_pin(DigitalPin.P14, 1)
            elif zone1 == 1 and (zone2 == 0 and zone3 == 1):
                Display("FIRE ALARM", "1,3", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
                pins.digital_write_pin(DigitalPin.P13, 1)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                Display("FIRE ALARM", "2,3", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
                pins.digital_write_pin(DigitalPin.P14, 1)
        pins.digital_write_pin(DigitalPin.P3, 1)
        pins.digital_write_pin(DigitalPin.P16, 1)
        basic.pause(100)
        LCDbacklight(1)
        if resetmessage == 0:
            if zone1 == 1 and (zone2 == 0 and zone3 == 0):
                Display("FIRE ALARM", "1", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
                pins.digital_write_pin(DigitalPin.P13, 0)
            elif zone1 == 0 and (zone2 == 1 and zone3 == 0):
                pins.digital_write_pin(DigitalPin.P14, 0)
                Display("FIRE ALARM", "2", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                Display("FIRE ALARM", "3", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 0):
                pins.digital_write_pin(DigitalPin.P13, 0)
                pins.digital_write_pin(DigitalPin.P14, 0)
                Display("FIRE ALARM", "1,2", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 1):
                Display("FIRE ALARM", "1,2,3", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
                pins.digital_write_pin(DigitalPin.P13, 0)
                pins.digital_write_pin(DigitalPin.P14, 0)
            elif zone1 == 1 and (zone2 == 0 and zone3 == 1):
                Display("FIRE ALARM", "1,3", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
                pins.digital_write_pin(DigitalPin.P13, 0)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                Display("FIRE ALARM", "2,3", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
                pins.digital_write_pin(DigitalPin.P14, 0)
        pins.digital_write_pin(DigitalPin.P3, 0)
        pins.digital_write_pin(DigitalPin.P16, 0)
        basic.pause(100)
    elif alarm == 1 and (silence == 0 and ack == 1):
        LCDbacklight(1)
        if resetmessage == 0:
            if zone1 == 1 and (zone2 == 0 and zone3 == 0):
                Display("ALARM ACKNOWLEDGED",
                    "1",
                    "Metsamarja 31",
                    "Garaaž",
                    2,
                    0,
                    2,
                    2)
                pins.digital_write_pin(DigitalPin.P13, 1)
            elif zone1 == 0 and (zone2 == 1 and zone3 == 0):
                pins.digital_write_pin(DigitalPin.P14, 1)
                Display("ALARM ACKNOWLEDGED",
                    "2",
                    "Metsamarja 31",
                    "Garaaž",
                    2,
                    0,
                    2,
                    2)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                Display("ALARM ACKNOWLEDGED",
                    "3",
                    "Metsamarja 31",
                    "Garaaž",
                    2,
                    0,
                    2,
                    2)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 0):
                pins.digital_write_pin(DigitalPin.P13, 1)
                pins.digital_write_pin(DigitalPin.P14, 1)
                Display("ALARM ACKNOWLEDGED",
                    "1,2",
                    "Metsamarja 31",
                    "Garaaž",
                    2,
                    0,
                    2,
                    2)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 1):
                Display("ALARM ACKNOWLEDGED",
                    "1,2,3",
                    "Metsamarja 31",
                    "Garaaž",
                    2,
                    0,
                    2,
                    2)
                pins.digital_write_pin(DigitalPin.P13, 1)
                pins.digital_write_pin(DigitalPin.P14, 1)
            elif zone1 == 1 and (zone2 == 0 and zone3 == 1):
                Display("ALARM ACKNOWLEDGED",
                    "1,3",
                    "Metsamarja 31",
                    "Garaaž",
                    2,
                    0,
                    2,
                    2)
                pins.digital_write_pin(DigitalPin.P13, 1)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                Display("ALARM ACKNOWLEDGED",
                    "2,3",
                    "Metsamarja 31",
                    "Garaaž",
                    2,
                    0,
                    2,
                    2)
                pins.digital_write_pin(DigitalPin.P14, 1)
    elif alarm == 1 and (silence == 1 and ack == 1):
        pins.digital_write_pin(DigitalPin.P8, 1)
        LCDbacklight(1)
        if resetmessage == 0:
            if zone1 == 1 and (zone2 == 0 and zone3 == 0):
                Display("ALARM SILENCED", "1", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
                pins.digital_write_pin(DigitalPin.P13, 1)
            elif zone1 == 0 and (zone2 == 1 and zone3 == 0):
                Display("ALARM SILENCED", "2", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
                pins.digital_write_pin(DigitalPin.P14, 1)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                Display("ALARM SILENCED", "3", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 0):
                Display("ALARM SILENCED",
                    "1,2",
                    "Metsamarja 31",
                    "Garaaž",
                    2,
                    0,
                    2,
                    2)
                pins.digital_write_pin(DigitalPin.P13, 1)
                pins.digital_write_pin(DigitalPin.P14, 1)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 1):
                Display("ALARM SILENCED",
                    "1,2,3",
                    "Metsamarja 31",
                    "Garaaž",
                    2,
                    0,
                    2,
                    2)
                pins.digital_write_pin(DigitalPin.P14, 1)
                pins.digital_write_pin(DigitalPin.P13, 1)
            elif zone1 == 1 and (zone2 == 0 and zone3 == 1):
                Display("ALARM SILENCED",
                    "1,3",
                    "Metsamarja 31",
                    "Garaaž",
                    2,
                    0,
                    2,
                    2)
                pins.digital_write_pin(DigitalPin.P13, 1)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                Display("ALARM SILENCED",
                    "2,3",
                    "Metsamarja 31",
                    "Garaaž",
                    2,
                    0,
                    2,
                    2)
                pins.digital_write_pin(DigitalPin.P14, 1)
    if alarm == 0 and (silence == 0 and (ack == 0 and (trouble == 1 and troublesilence == 0))):
        LCDbacklight(1)
        if noac == 1:
            Display("System in fault",
                "NO AC POWER",
                "Metsamarja 31",
                "Garaaž",
                2,
                2,
                2,
                2)
        else:
            Display("System in fault", "", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
        pins.digital_write_pin(DigitalPin.P10, 1)
        pins.digital_write_pin(DigitalPin.P16, 1)
        basic.pause(1000)
        pins.digital_write_pin(DigitalPin.P10, 0)
        pins.digital_write_pin(DigitalPin.P16, 0)
        basic.pause(1000)
    elif alarm == 0 and (silence == 0 and (ack == 0 and (trouble == 1 and troublesilence == 1))):
        LCDbacklight(1)
        pins.digital_write_pin(DigitalPin.P16, 0)
        pins.digital_write_pin(DigitalPin.P10, 1)
        if noac == 1:
            Display("Fault silenced",
                "NO AC POWER",
                "Metsamarja 31",
                "Garaaž",
                2,
                2,
                2,
                2)
        else:
            Display("Fault silenced", "", "Metsamarja 31", "Garaaž", 2, 0, 2, 2)
    elif trouble == 1 and alarm == 1:
        pins.digital_write_pin(DigitalPin.P10, 1)
basic.forever(on_forever2)

def on_forever3():
    global ACtimer
    if 1 == 1:
        ACtimer = 10
basic.forever(on_forever3)

def on_forever4():
    global ACtimer, noac, trouble
    if ACtimer != 0:
        ACtimer += -1
        basic.pause(1000)
        noac = 0
    else:
        noac = 1
        trouble = 1
    if noac == 0:
        trouble = 0
basic.forever(on_forever4)

def on_forever5():
    global alarm, zone1, ack, silence, zone2, zone3
    if boot == 0:
        if input.pin_is_pressed(TouchPin.P0):
            if zone1 == 0:
                alarm = 1
                zone1 = 1
                ack = 0
                silence = 0
        elif input.pin_is_pressed(TouchPin.P1):
            if zone2 == 0:
                alarm = 1
                zone2 = 1
                ack = 0
                silence = 0
        elif input.pin_is_pressed(TouchPin.P2):
            if zone3 == 0:
                alarm = 1
                zone3 = 1
                ack = 0
                silence = 0
basic.forever(on_forever5)
