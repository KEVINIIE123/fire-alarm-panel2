def on_received_number(receivedNumber):
    global test
    if receivedNumber == 1:
        test = 1
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    pass
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    pass
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global resetmessage
    basic.show_leds("""
        # # # # .
        # . . . #
        # # # # .
        # . . . #
        # # # # .
        """)
    serial.write_line("B")
    if input.pin_is_pressed(TouchPin.P0) or (input.pin_is_pressed(TouchPin.P1) or input.pin_is_pressed(TouchPin.P2)):
        I2C_LCD1602.backlight_on()
        resetmessage = 1
        I2C_LCD1602.show_string("Can't reset", 0, 0)
        I2C_LCD1602.show_string("Zone(s) in alarm", 0, 1)
        basic.pause(2000)
        resetmessage = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

resetmessage = 0
test = 0
boot = 1
I2C_LCD1602.lcd_init(0)
I2C_LCD1602.show_string("Booting...", 0, 0)
I2C_LCD1602.show_string("Setting variable", 0, 1)
pins.set_audio_pin(AnalogPin.P11)
zone1 = 0
zone2 = 0
zone3 = 0
ack = 0
alarm = 0
test = 0
silence = 0
I2C_LCD1602.show_string("################", 0, 1)
I2C_LCD1602.show_string("################", 0, 0)
pins.digital_write_pin(DigitalPin.P3, 1)
pins.digital_write_pin(DigitalPin.P4, 1)
pins.digital_write_pin(DigitalPin.P6, 1)
pins.digital_write_pin(DigitalPin.P7, 1)
pins.digital_write_pin(DigitalPin.P8, 1)
pins.digital_write_pin(DigitalPin.P9, 1)
pins.digital_write_pin(DigitalPin.P11, 1)
basic.show_leds("""
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    """)
basic.pause(500)
basic.clear_screen()
pins.digital_write_pin(DigitalPin.P4, 0)
pins.digital_write_pin(DigitalPin.P5, 0)
pins.digital_write_pin(DigitalPin.P6, 0)
pins.digital_write_pin(DigitalPin.P7, 0)
pins.digital_write_pin(DigitalPin.P8, 0)
pins.digital_write_pin(DigitalPin.P9, 0)
pins.digital_write_pin(DigitalPin.P11, 0)
I2C_LCD1602.clear()
boot = 0

def on_forever():
    basic.pause(100)
    if alarm == 0 and (silence == 0 and ack == 0):
        if resetmessage == 0:
            I2C_LCD1602.show_string("System normal", 0, 0)
basic.forever(on_forever)

def on_forever2():
    basic.pause(100)
    if alarm == 1 and (silence == 0 and ack == 0):
        pins.digital_write_pin(DigitalPin.P11, 1)
        pins.digital_write_pin(DigitalPin.P15, 1)
        basic.pause(100)
        pins.digital_write_pin(DigitalPin.P11, 0)
        basic.pause(100)
        if resetmessage == 0:
            I2C_LCD1602.show_string("FIRE ALARM", 0, 0)
            I2C_LCD1602.show_string("A = acknowledge", 0, 1)
basic.forever(on_forever2)

def on_forever3():
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

def on_forever4():
    global ack, silence
    if pins.digital_read_pin(DigitalPin.P16) == 1:
        basic.show_leds("""
            . # # # .
            # . . . #
            # # # # #
            # . . . #
            # . . . #
            """)
        if alarm == 1 and (silence == 0 and ack == 0):
            ack = 1
        elif alarm == 1 and (silence == 0 and ack == 1):
            silence = 1
            pins.digital_write_pin(DigitalPin.P15, 0)
        else:
            control.reset()
basic.forever(on_forever4)

def on_forever5():
    basic.pause(100)
    if alarm == 1 and (silence == 0 and ack == 1):
        if resetmessage == 0:
            I2C_LCD1602.show_string("FIRE ALARM zones", 0, 0)
            if zone1 == 1 and (zone2 == 0 and zone3 == 0):
                I2C_LCD1602.show_string("1", 0, 1)
            elif zone1 == 0 and (zone2 == 1 and zone3 == 0):
                I2C_LCD1602.show_string("2", 0, 1)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                I2C_LCD1602.show_string("3", 0, 1)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 0):
                I2C_LCD1602.show_string("1,2", 0, 1)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 1):
                I2C_LCD1602.show_string("1,2,3", 0, 1)
            elif zone1 == 1 and (zone2 == 0 and zone3 == 1):
                I2C_LCD1602.show_string("1,3", 0, 1)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                I2C_LCD1602.show_string("2,3", 0, 1)
basic.forever(on_forever5)

def on_forever6():
    basic.pause(100)
    if alarm == 1 and (silence == 1 and ack == 1):
        if resetmessage == 0:
            I2C_LCD1602.show_string("ALARM SILENCED", 0, 0)
            if zone1 == 1 and (zone2 == 0 and zone3 == 0):
                I2C_LCD1602.show_string("1", 0, 1)
            elif zone1 == 0 and (zone2 == 1 and zone3 == 0):
                I2C_LCD1602.show_string("2", 0, 1)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                I2C_LCD1602.show_string("3", 0, 1)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 0):
                I2C_LCD1602.show_string("1,2", 0, 1)
            elif zone1 == 1 and (zone2 == 1 and zone3 == 1):
                I2C_LCD1602.show_string("1,2,3", 0, 1)
            elif zone1 == 1 and (zone2 == 0 and zone3 == 1):
                I2C_LCD1602.show_string("1,3", 0, 1)
            elif zone1 == 0 and (zone2 == 0 and zone3 == 1):
                I2C_LCD1602.show_string("2,3", 0, 1)
basic.forever(on_forever6)
