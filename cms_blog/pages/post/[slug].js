import React from 'react'
import { getPost , getPostDetails } from '../../services';
import { PostDetail ,Categories , PostWidget , Author, Comments , CommentsForm } from '../../components';

const PostDetails = () => {
  return (
    <div>
        <div className='container mx-auto px-10 mb-8'>
            <div className='grid grid-cols-1 lg:grid-cols-l2 gap-l2'>
                <div className='col-span-1 lg:col-span-8'>
                    <PostDetail/>
                    <Author/>
                    <CommentsForm/>
                    <Comments/>
                </div>
                <div className='col-span-1 lg:col-span-4'>
                    <div className='relative lg:sticky top-8'>
                        <PostWidget />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetails


export async function getStaticProps( {params} ) {
    const posts = (await getPosts()) || [];
    return {
      props: { posts },
    };
  }