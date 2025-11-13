import Filters from '../products/Filters';

export default function FiltersExample() {
  return (
    <div className="max-w-xs">
      <Filters showCloseButton onClose={() => console.log('Filters closed')} />
    </div>
  );
}

