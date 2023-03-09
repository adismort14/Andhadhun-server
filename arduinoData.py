from serial import Serial
import time
import sys

amount = int(sys.argv[1])

# from serial.tools import list_ports
# port = list(list_ports.comports())
# for p in port:
#    print(p.device)

print(f"Reached the py file and the data is {amount}")
serial = Serial("/dev/cu.usbmodem11401", 9600)
# Enter your port

time.sleep(2)
# print("Reached the py file")
serial.write(bytes(str(amount)), encoding="utf-8")
