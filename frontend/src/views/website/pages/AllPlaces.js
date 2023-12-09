import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import api from 'utility/api';
import apiService from 'utility/apiService';

const AllPlaces = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [placetypes, setPlacetypes] = useState([]);
  // const [amenities, setAmenities] = useState([]);
  const [places, setSearch] = useState([]);
  const [total_place, setTotalPlace] = useState([]);
  const [pleaces, setPlaces] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const fetchData = () => {
    const url = `/api/website/places`;
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setCategories(data.categories);
          setPlacetypes(data.placetypes);
          // setAmenities(data.amenities);
          setSearch(data.places);
          setPlaces(data.places);
          setTotalPlace(data.total_place);
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("Something went wrong!");
      });
  };

  useEffect(() => {
    fetchData();
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

  const onChangeType = (typeId) => {
    const index = selectedTypes?.findIndex(item => item === typeId);
    let newselectedTypes = [...selectedTypes];

    if (index !== -1) {
      newselectedTypes.splice(index, 1);
    } else {
      newselectedTypes.push(typeId);
    }

    setSelectedTypes(newselectedTypes);
  };


  const Wishlist = (itemId) => {
    AddWishlist(itemId);
  };

  const AddWishlist = (id) => {
    api
      .get(`/api/website/wishlist/${id}`)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          fetchData();
          setTimeout(() => {
            toast.success(data.message);
          }, 1000);
        } else {
          console.log('error')
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status == 401) {
          navigate("/login", { replace: true });
        }
      });
  };

  const RemoveWishlist = (id) => {
    console.log('w id', id);
    api
      .get(`/api/user/remove-wishlist/${id}`)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          fetchData();
          setTimeout(() => {
            toast.success(data.message);
          }, 1000);
        } else {
          console.log('error')
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    let data = pleaces;
    if (selectedCategories.length > 0 || selectedTypes.length > 0) {
      let filteredData = data.filter(item => selectedCategories.includes(item.category_id) || selectedTypes.includes(item.type_id));
      setSearch(filteredData);
    } else {
      setSearch(data);
    }

  }, [selectedCategories, selectedTypes]);
  return (
    <div>
      <div className="archive-city layout-02">
        <Toaster />
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
              <div className="filter-box">
                <h3>Place Type</h3>
                <div className="filter-list">
                  <div className="filter-group">
                    {placetypes?.map((placetype) => {
                      return (
                        <div className="field-check">
                          <label htmlFor={`placetype_${placetype.id}`}>
                            <input type="checkbox" id={`placetype_${placetype.id}`} onChange={() => onChangeType(placetype.id)} value={placetype.id} />
                            {placetype.name}
                            <span className="checkmark"><i className="la la-check"></i></span>
                          </label>
                        </div>)
                    })}
                  </div>
                </div>
              </div>
              {/* <div className="filter-box">
                <h3>Amenities</h3>
                <div className="filter-list">
                  <div className="filter-group">
                  {amenities?.map((amenitie) => {
                    return (
                    <div className="field-check" key={amenitie.id}>
                      <label htmlFor={`amen_${amenitie.id}`}>
                        <input type="checkbox" id={`amen_${amenitie.id}`} value={amenitie.id} />
                        {amenitie.name}
                        <span className="checkmark"><i className="la la-check"></i></span>
                      </label>
                    </div>)
                  })}
                  </div>
                </div>
              </div> */}
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
              {places?.map((place) => {
                return (
                  <div className="place-item layout-02 place-hover" data-maps_name="mattone_restaurant">
                    <div className="place-inner">
                      <div className="place-thumb">
                        <Link className="entry-thumb" to={`/place-details/${place.place_id}`}><img src={apiService.ledgerUrl + place.place_image} alt="" /></Link>

                        {place.in_wishlist ? (
                          <a href="#" className="golo-add-to-wishlist btn-add-to-wishlist " data-place-id="185" onClick={() => RemoveWishlist(place.place_id)}>
                            <span className="icon-heart">
                              <i className="la la-heart large"></i>
                            </span>
                          </a>
                        ) : (
                          <a href="#" className="golo-add-to-wishlist btn-add-to-wishlist " data-place-id="185" onClick={() => Wishlist(place.place_id)}>
                            <span className="icon-heart">
                              <i className="la la-bookmark large"></i>
                            </span>
                          </a>
                        )}
                      </div>
                      <div className="entry-detail">
                        <div className="entry-head">
                          <div className="place-type list-item">
                            <span>{place.type}</span>
                          </div>
                          <div className="place-city">
                            <Link to={`/city-details/${place.city_id}`}>{place.city}</Link>
                          </div>
                        </div>
                        <h3 className="place-title"><Link to={`/place-details/${place.place_id}`}>{place.place_name}</Link></h3>
                        <div className="place-address"><i className="las la-map-marker"></i>{place.address}</div>
                        <div className="entry-bottom">
                          <div className="place-preview">
                            <div className="place-rating">
                              <span>{place.avg_reviews}</span>
                              <i className="la la-star"></i>
                            </div>
                            <span className="count-reviews">({place.total_review} Reviews)</span>
                          </div>
                          <div className="place-price">
                            <span>{place.currency_icon}{place.place_price}</span>
                          </div>
                        </div>
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

export default AllPlaces