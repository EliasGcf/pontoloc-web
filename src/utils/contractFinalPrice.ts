import { differenceInCalendarDays, parseISO } from 'date-fns';

interface Data {
  created_at: string;
  daily_total_price: number;
  delivery_price: number;
  collect_price: number;
}

export default function contractFinalPrice(contract: Data): number {
  const timeOffRent = differenceInCalendarDays(
    new Date(),
    parseISO(contract.created_at),
  );

  const final_price =
    contract.daily_total_price * timeOffRent +
    contract.delivery_price +
    contract.collect_price;

  return final_price;
}
