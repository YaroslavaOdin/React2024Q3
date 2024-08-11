import styles from "../styles/notFoundPage.module.css";

export default function NotFoundPage(): JSX.Element {
  return <div className={styles.notFoundPage} data-testid='not-found-page'> 404 Not Found </div>;
}
