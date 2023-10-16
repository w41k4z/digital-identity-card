export default interface BankTransaction {
  transactionId: number;
  accountId: string;
  amount: number;
  transactionDate: Date;
  description: string;
}
