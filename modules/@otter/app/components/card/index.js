import { wrapper, bottom } from './styles.module.css';

export default function Card({ children, title, footer }) {
  return (
    <div className={ wrapper }>
      <div>{ title }</div>
      <div>{ children }</div>
      <div className={ bottom }>{ footer }</div>
    </div>
  );
};
