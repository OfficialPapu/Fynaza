const DeliverySchema = require("../models/DeliveryModel");

const AddNewAddress = async (req, res) => {
    try {
        const { UserID, Name, Phone, City, Address, PostalCode } = req.body;
        const newAddress = new DeliverySchema({ UserID, Name, Phone, City, Address, PostalCode });
        const savedAddress = await newAddress.save();
        res.status(201).json({ AddressID: savedAddress._id });
    } catch (error) {
        res.sendStatus(500);
    }
}
const AllAddress = async (req, res) => {
    try {
        const { UserID } = req.params;
        const Addresses = await DeliverySchema.find({ UserID }, { _id: 1, Name: 1, Address: 1, City: 1, PostalCode: 1, Phone: 1 });
        const AddressesToSend = Addresses.map(address => ({
            ID: address._id,
            Name: address.Name,
            Address: `${address.Address}, ${address.City}${address.PostalCode ? ", " + address.PostalCode : ""}`,
            Phone: address.Phone,
        }));
        res.status(200).json(AddressesToSend);
    } catch (error) {
        res.sendStatus(500);
    }
}

module.exports = { AddNewAddress, AllAddress };