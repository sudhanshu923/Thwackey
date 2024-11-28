import mongoose from "mongoose";

const StockSubscription_Schema = new mongoose.Schema({

    Stock: {
        type: String,
        required: true,
    },

    Subscribers: [
        {
            UserId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
                required: true,
            },
            Email: {
                type: String,
                required: true,
            },
            FirstNotificationTime: {
                type: String,
                required: true
            },
            NextNotificationTime: {
                type: String,
                required: true,
            },
        },
    ],

});

StockSubscription_Schema.index({ Stock: 1, 'Subscribers.UserId': 1 }, { unique: true });

export const StockSubscription = mongoose.models.StockSubscription || mongoose.model('StockSubscription', StockSubscription_Schema);
