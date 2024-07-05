import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import styles from './page.module.css'

async function getAllPosts () {
  try {
    const response = await fetch('http://localhost:3042/posts');
    if (!response.ok) throw new Error('Falha na rede');
    return response.json();
  } catch (error) {
    logger.error('Ops, algo correu mal: ' + error.message);
    return [];
  }
}

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <main className={styles.grid}>
      {posts.map(post => <CardPost post={post}/>)}
    </main>
  );
}