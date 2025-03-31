import { Card } from "@repo/ui/Card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // can improve type here
    status: string;
    provider: string;
  }[];
}) => {
  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Success":
        return (
          <span className="flex items-center gap-1 text-green-600 text-sm">
            <CheckCircle /> Success
          </span>
        );
      case "Processing":
        return (
          <span className="flex items-center gap-1 text-yellow-600 text-sm">
            <Clock /> Processing
          </span>
        );
      case "Failure":
        return (
          <span className="flex items-center gap-1 text-red-600 text-sm">
            <XCircle /> Failure
          </span>
        );
    }
  };

  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center text-gray-500 py-8">
          No Recent Transactions
        </div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="space-y-4">
        {transactions.map((t, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b pb-3 last:border-none"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">Received INR</p>
              <p className="text-xs text-gray-500">{formatDate(t.time)}</p>
              <p className="text-xs text-gray-500">Provider: {t.provider}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-base font-semibold text-green-600">
                + ₹{t.amount / 100}
              </p>
              {getStatusBadge(t.status)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

function CheckCircle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="size-6"
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  );
}

function XCircle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="size-6"
    >
      <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function Clock() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="size-6"
    >
      <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}
