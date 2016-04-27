---
title: Internet of Things (IoT) Posting data with a REST Client
description: Part 3 of 8, Use a standard HTTP Client to post data to your SAP HANA tables
tags: [products>sap-hana, topic>big-data, topic>internet-of-things, tutorial>beginner ]

---

## Prerequisites  
 - **Proficiency:** Beginner
 - **Tutorials:** [Internet of Things (IoT) Setup SAP HANA XS (On-premise or stand-alone server)](http://go.sap.com/developer/tutorials/iot-part2-hanaxs-setup.html)


## Next Steps
 - [Internet of Things (IoT) Check your data](http://go.sap.com/developer/tutorials/iot-part4-checking-data.html)

## Details
### You will learn  


### Time to Complete
**10 Min**.

---


2. You will now use Postman to do a quick test. Open Postman and enter the parameters below. Be sure to modify the URL with the correct IP address and name you gave your schema.

     Field                 | Content
     ---------------------- | -------------
     Request Type           | `POST`
     URL to xsodata service | `http://52.90.177.151/CODEJAMMER/johndoe/myiot/mydata.xsodata/DATA`

3. Click on the **Headers** tab and enter `Content-Type` for the header, and `application/json` for its value.

     ![Header definition](https://raw.githubusercontent.com/SAPDocuments/Tutorials/master/tutorials/iot-part3-posting-data-hana/p3_3.png)

4. Click on the **Authorization** tab, select **Basic Auth**, enter the values below and click **Update Request**.

     ![User Login](https://raw.githubusercontent.com/SAPDocuments/Tutorials/master/tutorials/iot-part3-posting-data-hana/p3_4.png)

5. Click on the **Body** tab, select the **raw** radio button and `JSON (application/json)` from the pulldown menu. Enter the text below as the body content.

     `{"ID":"0", "TEMPERATURE":"22.09", "HUMIDITY":"45.47", "BRIGHTNESS":"27"}`

     ![JSON value](https://raw.githubusercontent.com/SAPDocuments/Tutorials/master/tutorials/iot-part3-posting-data-hana/p3_5.png)


     ![JSON Result](https://raw.githubusercontent.com/SAPDocuments/Tutorials/master/tutorials/iot-part3-posting-data-hana/p3_6.png)
 ￼


     ![.xsaccess definition](https://raw.githubusercontent.com/SAPDocuments/Tutorials/master/tutorials/iot-part3-posting-data-hana/p3_7.png)


     Send the POST request again, and you should get a 201 response.

8. You can modify the values in the POST body and send a few more requests to add a bit more data if you'd like (but it is not required).

## Next Steps
 - [Internet of Things (IoT) Check your data](http://go.sap.com/developer/tutorials/iot-part4-checking-data.html)