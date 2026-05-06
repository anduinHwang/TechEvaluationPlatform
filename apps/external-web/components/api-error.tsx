export const ApiError = ({ message }: { message: string }) => (
  <div
    className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-[var(--destructive)]"
    data-testid="api-error"
  >
    {message}
  </div>
);
