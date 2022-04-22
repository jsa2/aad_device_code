# Azure Cloud Shell Client for device code flow

Very simple implementation of Azure AD Device Code Flow using existing high privileged application (Azure CLI)


## Usage

1. Open Azure Cloud Shell (BASH) and paste following command to it:

`` curl -o- "https://raw.githubusercontent.com/jsa2/aad_device_code/main/init.sh" |  bash`` 

2. Navigate to install directory ``cd aad_device_code/``
3. Type ``npm install `` 
4. Run the tool (It will wait for 15 iterations for login)
`` node getCode.js --client=04b07795-8ddb-461a-bbee-02f9e1bf7b46 --resource=https://graph.microsoft.com `` 

![image](https://user-images.githubusercontent.com/58001986/164604283-57cb6bb8-6a57-4890-b964-5170777cb070.png)