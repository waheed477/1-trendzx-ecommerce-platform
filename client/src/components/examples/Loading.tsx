import Loading from '../common/Loading';

export default function LoadingExample() {
  return (
    <div className="space-y-8">
      <Loading size="sm" text="Loading products..." />
      <Loading size="md" text="Processing your order..." />
      <Loading size="lg" />
    </div>
  );
}

