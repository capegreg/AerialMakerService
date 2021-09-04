node modules to install
-----------------------

# For windows service development
# Install node.js runtime

https://nodejs.org/en/

# For windows service
# Dep. 	node.js
#				python
npm install os-service

usage:

Use aerialServiceAdd.bat or run aerialService_add.js from command prompt.

** add service

service startup default: Automatic

command usage
>node.exe aerialService_add.js aerialmaker

Password is not saving correctly to service.
use this workaround.

1. launch services.msc
2. double-click this service
3. click Log On tab, add password
4. click Ok

** remove service

Use aerialServiceRemove.bat or run aerialService_remove.js from command prompt.

command usage
>node.exe aerialService_remove.js <name>

