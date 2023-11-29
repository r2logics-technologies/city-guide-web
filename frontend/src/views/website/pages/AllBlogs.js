import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import api from 'utility/api';
import apiService from 'utility/apiService';

const AllBlogs = () => {
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [filterblogs, setfilterBlogs] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        const url = `/api/website/blogs`;
        api
            .get(url)
            .then((res) => {
                const data = res.data;
                if (data.status === "success") {
                    setCategories(data.categories);
                    setBlogs(data.blogs);
                    setfilterBlogs(data.blogs);
                } else {
                }
            })
            .catch((err) => {
                console.error(err);
                console.log("Something went wrong!");
            });
    }, []);

    const onChangeCategory = (categoryId) => {
        const index = selectedCategories?.findIndex(item => item === categoryId);
        let newSelectedCategories = [...selectedCategories];

        if (index !== -1) {
            newSelectedCategories.splice(index, 1);
        } else {
            newSelectedCategories.push(categoryId);
        }

        setSelectedCategories(newSelectedCategories);
    };

    useEffect(() => {
        let data = filterblogs;
        if (selectedCategories.length > 0) {
            let filteredData = data.filter(item => selectedCategories.includes(item.category_id));
            setBlogs(filteredData);
        } else {
            setBlogs(data);
        }

    }, [selectedCategories]);

    return (
        <div>
            <div className="archive-city layout-02">
                <div className="col-left">
                    <div className="archive-filter">
                        <form action="#" className="filterForm" id="filterForm">
                            <div className="filter-head">
                                <h2>Filter</h2>
                                <a href="#" className="clear-filter"><i className="fal fa-sync"></i>Clear all</a>
                                <a href="#" className="close-filter"><i className="las la-times"></i></a>
                            </div>
                            <div className="filter-box">
                                <h3>Categories</h3>
                                <div className="filter-list">
                                    <div className="filter-group">
                                        {categories?.map((category) => {
                                            return (
                                                <div key={category.id} className="field-check">
                                                    <label for="restaurant" htmlFor={`category_${category.id}`}>
                                                        <input type="checkbox" id={`category_${category.id}`} onChange={() => onChangeCategory(category.id)} value={category.id} />
                                                        {category.name}
                                                        <span className="checkmark"><i className="la la-check"></i></span>
                                                    </label>
                                                </div>)
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="form-button align-center">
                                <a href="#" className="btn">Apply</a>
                            </div>
                        </form>
                    </div>
                    <div className="main-primary">
                        <div className="filter-mobile">
                            <ul>
                                <li><a className="mb-filter mb-open" href="#filterForm">Filter</a></li>
                                <li><a className="mb-sort mb-open" href="#sortForm">Sort</a></li>
                            </ul>
                            <div className="mb-maps"><a className="mb-maps" href="#"><i className="las la-map-marked-alt"></i></a></div>
                        </div>
                        <div className="top-area top-area-filter">
                            <div className="filter-left">
                                {/* <span className="result-count"><span className="count">{total_place}</span> results</span> */}
                            </div>
                        </div>
                        <div className="area-places layout-3col">
                            {blogs?.map((blog) => {
                                return (
                                    <div className="place-item layout-02 place-hover" key={blog.id} data-maps_name="mattone_restaurant">
                                        <div className="place-inner">
                                            <div className="place-thumb">
                                                <Link className="entry-thumb" to={`/blog-details/${blog.id}`}><img src={apiService.ledgerUrl + blog.thumb} alt="" /></Link>
                                            </div>
                                            <div className="entry-detail">
                                                <div className="entry-head">
                                                    <div className="place-type list-item">
                                                        <span>{blog.category_name}</span>
                                                    </div>
                                                </div>
                                                <h3 className="place-title"><Link to={`/blog-details/${blog.id}`}>{blog.title}</Link></h3>
                                            </div>
                                        </div>
                                    </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllBlogs