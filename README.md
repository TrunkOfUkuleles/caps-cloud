### LAB - Class 12

## Project: CAPS -Cloud Time
## Auth: Julien Edwards

### Links and Resources


## 12

- [github](https://github.com/TrunkOfUkuleles/caps-cloud)


### Setup

Utilizing the AWS systems, I had vendors Produce the call for pickup to the same pickup topic, and then had that FIFO feed orders to the drivers, who will then set a timeout to Produce an event targeted at the Vendor who sent the requests queue. That is then fed to the vendor. 

#### How to initialize/run your application (where applicable)

- 'node vendor.js'
- 'node driver.js'

#### Tests
ran using two different vendors to see how it would handle the responses. 
#### UML / Application Wiring Diagram

12
![setp1-UML](UML19.jpg)

