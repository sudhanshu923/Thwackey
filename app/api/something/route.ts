import { NextResponse } from "next/server";

import { format } from "date-fns";
import yahooFinance from "yahoo-finance2";

import Connect from "@/connections/localConnect";

import { StockSubscription } from "@/models/subscriptionModel";

export async function GET() {

    await Connect();

    try {

        const currentDateAndTime = new Date();
        const formattedCurrentDateAndTime = format(currentDateAndTime, "dd MMMM yyyy HH:mm");

        const subscriptionsToNotify = await StockSubscription.find({
            "Subscribers.NextNotificationTime": formattedCurrentDateAndTime
        });

        const subscriptionNotifications = await Promise.all(
            subscriptionsToNotify.map(async (subscription) => {
                const stock: string = subscription.Stock;

                const quote = await yahooFinance.quote(stock);
                const { regularMarketPrice, currency } = quote;

                return {
                    stock: stock,
                    currentMarketPrice: regularMarketPrice,
                    currency: currency,
                    emails: subscription.Subscribers.map(
                        (subscriber: { Email: any; }) => subscriber.Email
                    ),
                };
            })
        );

        return NextResponse.json(
            { subscriptionNotifications },
            { status: 200, statusText: "" }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { msg: "error" },
            { status: 500, statusText: "" }
        );
    }
}
