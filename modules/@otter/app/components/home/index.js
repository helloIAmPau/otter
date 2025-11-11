import CurrentWeightCard from '../current-weight-card';

import { wrapper } from './styles.module.css';

export default function Home() {
  return (
    <div className={ wrapper }>
      <CurrentWeightCard />
    </div>
  );
}
