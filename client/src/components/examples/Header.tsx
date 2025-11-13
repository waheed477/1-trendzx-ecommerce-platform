import Header from '../common/Header';

export default function HeaderExample() {
  return <Header cartItemCount={3} onCartClick={() => console.log('Cart clicked')} />;
}

