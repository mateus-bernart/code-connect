import Image from "next/image"
import { Avatar } from "./Avatar"
import styles from "./cardpost.module.css"
import Link from "next/link"

export const CardPost = ({ post }) => {
    return (
        <Link className={styles.link} href={`/posts/${post.slug}`}> 
                    <article className={styles.card}>
                <header className={styles.header}>
                    <figure className={styles.header.figure}>
                        <Image 
                        className={styles.header.img}
                        src={post.cover} 
                        width={438} 
                        height={133} 
                        alt={`Capa do post de titulo ${post.type}`}
                        />
                    </figure>
                </header>
                <section className={styles.body}>
                    <h2 className={styles.body.h2}>{post.title}</h2>
                    <p className={styles.body.p}>{post.body}</p> 
                </section>
                <footer className={styles.footer}>
                    <Avatar imageSrc={post.author.avatar}
                    name={post.author.username}
                    />
                </footer>
            </article>
            </Link>
    )
}