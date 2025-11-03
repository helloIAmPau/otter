import styles from './styles.css';

export default function Page() {
  return (
    <html>
      <head>
        <style>
          { styles }
        </style>
        <link rel="stylesheet" href="/assets/app.css" />
      </head>
      <body>
        <div id='root'></div>
      </body>
    </html>
  );
};
