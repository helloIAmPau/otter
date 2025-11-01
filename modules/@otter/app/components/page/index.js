import styles from './styles.css';

export default function Page() {
  return (
    <html>
      <head>
        <style>
          { styles }
        </style>
      </head>
      <body>
        <div id='root'></div>
      </body>
    </html>
  );
};
