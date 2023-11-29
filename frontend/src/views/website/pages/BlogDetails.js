import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from 'utility/api';
import apiService from 'utility/apiService';

const BlogDetails = () => {

    const { id } = useParams();
    const [blog, setBlog] = useState([]);
    const fetchData = () => {
        let url = "/api/website/blog/"+id;
        api
            .get(url)
            .then((res) => {
                const data = res.data;
                console.log('first', data);
                if (data.status === "success") {
                    setBlog(data.blog);
                } else {
                    console.log('error', data.message);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderHTML = (escapedHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } });

    return (
        <div>
            <div class="blog-banner">
                <img src={apiService.ledgerUrl+blog.thumb} alt={blog.title} />
            </div>
            <div class="blog-content">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="blog-left">
                                <ul class="breadcrumbs">
                                    <li><a title="Unique stay" href="#">{blog.category_name}</a></li>
                                </ul>
                                <div class="entry-content">
                                    <h1>{blog.title}</h1>
                                    <ul class="entry-meta">
                                        <li>{blog.created_date}</li>
                                    </ul>
                                    <div class="entry-desc">
                                        <p>{renderHTML(blog.content)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails