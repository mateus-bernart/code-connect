import logger from "@/logger";
import { remark } from 'remark';
import html from 'remark-html';
import styles from '@/components/CardPost/cardpost.module.css'
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/CardPost/Avatar";
import flexstyle from "@/app/pagepost.module.css"


async function getPostBySlug(slug){
    const url = `http://localhost:3042/posts?slug=${slug}`
    const response = await fetch(url);
    if (!response.ok){
        logger.error('Ops, alguma coisa correu mal');
        return {}
    }
    logger.info('Posts obtidos com sucesso!');
    const data = await response.json()
    if (data.length == 0){
        return {}
    }

    const post = data[0];

    const processedContent = await remark()
        .use(html)
        .process(post.markdown);
    const contentHtml = processedContent.toString();

    post.markdown = contentHtml

    return post

}

export const CardPost = ({ post }) => {
    return (
        <Link className={styles.link} href={`/posts/${post.slug}`}>
            <article className={flexstyle.card}>
                <header className={styles.header}>
                    <figure className={styles.header_figure}>
                        <Image 
                            className={styles.header_img}
                            src={post.cover} 
                            width={1150} 
                            height={280} 
                            alt={`Capa do post de titulo ${post.type}`}
                        />
                    </figure>
                </header>
                <section className={styles.body}>
                    <h2 className={styles.body_h2}>{post.title}</h2>
                    <p className={styles.body_p}>{post.body}</p>
                </section>
                <footer className={styles.footer}>
                    <Avatar imageSrc={post.author.avatar} name={post.author.username} />
                </footer>
            </article>
        </Link>
    );
};


const PagePost = async ({ params }) => { // we want to get the params slug
    const post = await getPostBySlug(params.slug);
    return (
    <>
    <div className={flexstyle.form__group.field}>
        <input type="input" className={flexstyle.form__field} placeholder="Digite o que você procura" name="name" id='name' required />
        <button className={flexstyle.button37} role="button">Buscar</button>
    </div>
    <div> 
        <CardPost post = {post} />
    </div>
    
    
    </>);
}

export default PagePost