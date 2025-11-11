import { wrapper } from './styles.module.css'

export default function Button({ onClick, className = '', children }) {
  return (
    <div className={ `${ wrapper } ${ className }` } onClick={ onClick }>
      { children }
    </div>
  );
}
