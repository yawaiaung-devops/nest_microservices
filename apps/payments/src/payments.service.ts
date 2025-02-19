import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { NOTIFICATION_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY') as string,
    {
      apiVersion: '2025-01-27.acacia',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notifcationService: ClientProxy,
  ) {}

  async createCharge({ card, amount, email }: PaymentDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    /**
     ** Amount intended to be collected by this PaymentIntent. A positive integer representing how much to charge in the [smallest currency unit](https://stripe.com/docs/currencies#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US or [equivalent in charge currency](https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).
     */
    const paymentIntent = await this.stripe.paymentIntents.create({
      // payment_method: paymentMethod.id,
      payment_method: 'pm_card_visa',
      amount: 100 * amount,
      currency: 'usd',
      confirm: true,
      // payment_method_types: ['card'],
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    // ** after paymentIntent is created, we need to notify the user
    this.notifcationService.emit('notify_email', {
      email,
    });
    return paymentIntent;
  }
}
