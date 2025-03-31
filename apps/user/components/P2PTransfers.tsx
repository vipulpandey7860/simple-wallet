type P2PTransaction = {
  amount: number;
  when: string;
  type: "sent" | "received";
  user: {
    name: string;
  };
};

type P2PTransProps = {
  transactions: P2PTransaction[];
};

export const P2PTransfers = ({ transactions }: P2PTransProps) => {
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
    };
    
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-5">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Recent Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">
          No transactions yet.
        </p>
      ) : (
        <div className="space-y-4">
          {transactions.map((trans, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-2 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    trans.type === "sent" ? "bg-red-100" : "bg-green-100"
                  }`}
                >
                  {trans.type === "sent" ? <ArrowUpRight /> : <ArrowDownLeft />}
                </div>
                <div>
                  <p className="font-medium text-gray-700">
                    {trans.type === "sent" ? `Sent to ${trans.user.name}` : `Received from ${trans.user.name}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(trans.when)}
                  </p>
                </div>
              </div>
              <p
                className={`text-sm font-semibold ${
                  trans.type === "sent" ? "text-red-600" : "text-green-600"
                }`}
              >
                {trans.type === "sent" ? "-" : "+"}₹{trans.amount}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function ArrowUpRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="size-6"
    >
      <path d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
    </svg>
  );
}

function ArrowDownLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="size-6"
    >
      <path d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
    </svg>
  );
}
