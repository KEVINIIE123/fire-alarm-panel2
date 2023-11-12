def on_received_number(receivedNumber):
    global test
    if receivedNumber == 1:
        test = 1
radio.on_received_number(on_received_number)

# Button A

def on_button_pressed_a():
    global ack, troublesilence
    if alarm == 1 and (silence == 0 and ack == 0):
        ack = 1
    elif alarm == 0 and (silence == 0 and (ack == 0 and (trouble == 1 and troublesilence == 0))):
        troublesilence = 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def Display(_1: number, _2: number):
    if True:
        pass
# Button AB reset

def on_button_pressed_ab():
    control.reset()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

# Button B

def on_button_pressed_b():
    global silence
    if alarm == 1 and (silence == 0 and ack == 1):
        silence = 1
        pins.digital_write_pin(DigitalPin.P15, 0)
input.on_button_pressed(Button.B, on_button_pressed_b)

zone3 = 0
zone2 = 0
zone1 = 0
resetmessage = 0
troublesilence = 0
ack = 0
silence = 0
alarm = 0
noac = 0
trouble = 0
test = 0
led.enable(False)
boot = 1
I2C_LCD1602.lcd_init(0)
I2C_LCD1602.show_string("Booting...", 0, 0)
I2C_LCD1602.show_string("Setting variable", 0, 1)
pins.set_audio_pin(AnalogPin.P16)
I2C_LCD1602.show_string("Setting radio...", 0, 1)
radio.set_group(1)
I2C_LCD1602.show_string("AC test...      ", 0, 1)
for index in range(10):
    if test == 1:
        break
    else:
        basic.pause(500)
if test == 0:
    trouble = 1
    noac = 1
    I2C_LCD1602.show_string("AC test fail    ", 0, 1)
    basic.pause(1000)
I2C_LCD1602.show_string("################", 0, 1)
I2C_LCD1602.show_string("################", 0, 0)
pins.digital_write_pin(DigitalPin.P3, 1)
pins.digital_write_pin(DigitalPin.P6, 1)
pins.digital_write_pin(DigitalPin.P8, 1)
pins.digital_write_pin(DigitalPin.P10, 1)
pins.digital_write_pin(DigitalPin.P13, 1)
pins.digital_write_pin(DigitalPin.P14, 1)
pins.digital_write_pin(DigitalPin.P16, 1)
basic.pause(500)
pins.digital_write_pin(DigitalPin.P3, 0)
pins.digital_write_pin(DigitalPin.P6, 0)
pins.digital_write_pin(DigitalPin.P8, 0)
pins.digital_write_pin(DigitalPin.P10, 0)
pins.digital_write_pin(DigitalPin.P13, 0)
pins.digital_write_pin(DigitalPin.P14, 0)
pins.digital_write_pin(DigitalPin.P16, 0)
I2C_LCD1602.clear()
boot = 0

def on_forever():
    global resetmessage, alarm, zone1, zone2, zone3
    if pins.digital_read_pin(DigitalPin.P7) == 1:
        basic.pause(2000)
        if pins.digital_read_pin(DigitalPin.P7) == 1:
            if input.pin_is_pressed(TouchPin.P0) or (input.pin_is_pressed(TouchPin.P1) or input.pin_is_pressed(TouchPin.P2)):
                resetmessage = 1
                I2C_LCD1602.show_string("Can't reset     ", 0, 0)
                I2C_LCD1602.show_string("Zone(s) in alarm", 0, 1)
                basic.pause(2000)
                resetmessage = 0
            else:
                I2C_LCD1602.clear()
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
            I2C_LCD1602.show_string("System normal   ", 0, 0)
            I2C_LCD1602.show_string("                ", 0, 1)
    elif alarm == 1 and (silence == 0 and ack == 0):
        pins.digital_write_pin(DigitalPin.P3, 1)
        pins.digital_write_pin(DigitalPin.P16, 1)
        basic.pause(100)
        pins.digital_write_pin(DigitalPin.P3, 0)
        pins.digital_write_pin(DigitalPin.P16, 0)
        basic.pause(100)
        if resetmessage == 0:
            I2C_LCD1602.show_string("FIRE ALARM      ", 0, 0)
            I2C_LCD1602.show_string("Click to ack    ", 0, 1)
    elif alarm == 1 and (silence == 0 and ack == 1):
        if resetmessage == 0:
            I2C_LCD1602.show_string("FIRE ALARM zones", 0, 0)
            if zone1 == 1 and (zone2 == 0 and zone3 == 0):
                pins.digital_write_pin(DigitalPin.P13, 1)
                I2C_LCD1602.show_string("1               ", 0, 1)
            elif zone1 == 0 and (zone2 == 1 and zone3 == 0):
                pins.digital_write_pin(DigitalPin.P14, 1)
                I2C_LCD1602.show_string("2               ", 0, 1)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                I2C_LCD1602.show_string("3               ", 0, 1)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 0):
                pins.digital_write_pin(DigitalPin.P13, 1)
                pins.digital_write_pin(DigitalPin.P14, 1)
                I2C_LCD1602.show_string("1,2             ", 0, 1)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 1):
                I2C_LCD1602.show_string("1,2,3           ", 0, 1)
                pins.digital_write_pin(DigitalPin.P13, 1)
                pins.digital_write_pin(DigitalPin.P14, 1)
            elif zone1 == 1 and (zone2 == 0 and zone3 == 1):
                I2C_LCD1602.show_string("1,3             ", 0, 1)
                pins.digital_write_pin(DigitalPin.P13, 1)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                I2C_LCD1602.show_string("2,3             ", 0, 1)
                pins.digital_write_pin(DigitalPin.P14, 1)
    elif alarm == 1 and (silence == 1 and ack == 1):
        pins.digital_write_pin(DigitalPin.P8, 1)
        if resetmessage == 0:
            I2C_LCD1602.show_string("ALARM SILENCED  ", 0, 0)
            if zone1 == 1 and (zone2 == 0 and zone3 == 0):
                I2C_LCD1602.show_string("1               ", 0, 1)
                pins.digital_write_pin(DigitalPin.P13, 1)
            elif zone1 == 0 and (zone2 == 1 and zone3 == 0):
                I2C_LCD1602.show_string("2               ", 0, 1)
                pins.digital_write_pin(DigitalPin.P14, 1)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                I2C_LCD1602.show_string("3               ", 0, 1)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 0):
                I2C_LCD1602.show_string("1,2             ", 0, 1)
                pins.digital_write_pin(DigitalPin.P13, 1)
                pins.digital_write_pin(DigitalPin.P14, 1)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 1):
                I2C_LCD1602.show_string("1,2,3           ", 0, 1)
                pins.digital_write_pin(DigitalPin.P14, 1)
                pins.digital_write_pin(DigitalPin.P13, 1)
            elif zone1 == 1 and (zone2 == 0 and zone3 == 1):
                I2C_LCD1602.show_string("1,3             ", 0, 1)
                pins.digital_write_pin(DigitalPin.P13, 1)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                I2C_LCD1602.show_string("2,3             ", 0, 1)
                pins.digital_write_pin(DigitalPin.P14, 1)
    if alarm == 0 and (silence == 0 and (ack == 0 and (trouble == 1 and troublesilence == 0))):
        I2C_LCD1602.show_string("System in fault ", 0, 0)
        if noac == 1:
            I2C_LCD1602.show_string("NO AC POWER     ", 0, 1)
        pins.digital_write_pin(DigitalPin.P10, 1)
        pins.digital_write_pin(DigitalPin.P16, 1)
        basic.pause(1000)
        pins.digital_write_pin(DigitalPin.P10, 0)
        pins.digital_write_pin(DigitalPin.P16, 0)
        basic.pause(1000)
    elif alarm == 0 and (silence == 0 and (ack == 0 and (trouble == 1 and troublesilence == 1))):
        pins.digital_write_pin(DigitalPin.P16, 0)
        pins.digital_write_pin(DigitalPin.P10, 1)
        I2C_LCD1602.show_string("Fault silenced  ", 0, 0)
        if noac == 1:
            I2C_LCD1602.show_string("NO AC POWER     ", 0, 1)
basic.forever(on_forever2)

def on_forever3():
    global alarm, zone1, ack, silence, zone2, zone3
    if boot == 0:
        if input.pin_is_pressed(TouchPin.P0):
            if zone1 == 0:
                I2C_LCD1602.clear()
                basic.pause(250)
                alarm = 1
                zone1 = 1
                ack = 0
                silence = 0
        elif input.pin_is_pressed(TouchPin.P1):
            if zone2 == 0:
                I2C_LCD1602.clear()
                basic.pause(250)
                alarm = 1
                zone2 = 1
                ack = 0
                silence = 0
        elif input.pin_is_pressed(TouchPin.P2):
            if zone3 == 0:
                I2C_LCD1602.clear()
                basic.pause(250)
                alarm = 1
                zone3 = 1
                ack = 0
                silence = 0
basic.forever(on_forever3)
