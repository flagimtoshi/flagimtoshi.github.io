clear
echo Hello, this program will install the current packages from the Flagimtoshi repo
beep 1000 100
wget https://raw.githubusercontent.com/flagimtoshi/flagimtoshi.github.io/refs/heads/master/esp32/wifi-scan.fsh wifi-scan.fsh
wget https://raw.githubusercontent.com/flagimtoshi/flagimtoshi.github.io/refs/heads/master/esp32/hello.fsh hello.fsh
clear
echo Done.
beep 1000 70
beep 1200 70
beep 1500 150
echo Creating startup.fsh file...
write startup.fsh "wget https://raw.githubusercontent.com/flagimtoshi/flagimtoshi.github.io/refs/heads/master/esp32/setup.fsh setup.fsh"
append startup.fsh "run setup.fsh"
clear
echo Created setup-routine for OTA-Updates!
