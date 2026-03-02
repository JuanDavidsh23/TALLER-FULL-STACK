import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    _id: String, 
    transaction_date: Date,
    customer: {
        name: String,
        email: { type: String, index: true },
        address: String,
        phone: String
    },
    items: [{
        product_name: String,
        product_sku: String,
        category: String,
        quantity: Number,
        unit_price: Number,
        supplier_name: String
    }],
    total_amount: Number
}, { timestamps: true });

export const Transaction = mongoose.model('Transaction', TransactionSchema);
