import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import api from 'utility/api';
import apiService from 'utility/apiService';
import { no_place } from 'assets/website/img';

const PlaceSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');
  const [searches, setSearch] = useState([]);
  const [total_place, setTotalPlace] = useState([]);

  useEffect(() => {
    const url = `/api/website/search`;
    const formData = new FormData();
    formData.append("search", searchQuery);
    api
      .post(url, formData)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setSearch(data.searches);
          setTotalPlace(data.total_place);
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("Something went wrong!");
      });
  }, []);

  const Wishlist = (itemId) => {
    AddWishlist(itemId);
  };

  const AddWishlist = (id) => {
    api
      .get(`/api/website/wishlist/${id}`)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
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

  return (
    <div>
      {searches.length > 0 ? (
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
                    <div className="field-check">
                      <label for="restaurant">
                        <input type="checkbox" id="restaurant" value="" />
                        Restaurant
                        <span className="checkmark"><i className="la la-check"></i></span>
                      </label>
                    </div>
                    <div className="field-check">
                      <label for="shopping">
                        <input type="checkbox" id="shopping" value="" />
                        Shopping
                        <span className="checkmark"><i className="la la-check"></i></span>
                      </label>
                    </div>
                    <div className="field-check">
                      <label for="nightlife">
                        <input type="checkbox" id="nightlife" value="" />
                        Nightlife
                        <span className="checkmark"><i className="la la-check"></i></span>
                      </label>
                    </div>
                    <div className="field-check">
                      <label for="hostel">
                        <input type="checkbox" id="hostel" value="" />
                        Hostel
                        <span className="checkmark"><i className="la la-check"></i></span>
                      </label>
                    </div>
                    <div className="field-check">
                      <label for="luxury">
                        <input type="checkbox" id="luxury" value="" />
                        Luxury
                        <span className="checkmark"><i className="la la-check"></i></span>
                      </label>
                    </div>
                    <div className="field-check">
                      <label for="market">
                        <input type="checkbox" id="market" value="" />
                        Market
                        <span className="checkmark"><i className="la la-check"></i></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-box">
                <h3>Place Type</h3>
                <div className="filter-list">
                  <div className="filter-group">
                    <div className="field-check">
                      <label for="coffe_shop">
                        <input type="checkbox" id="coffe_shop" value="" />
                        Coffe Shop
                        <span className="checkmark"><i className="la la-check"></i></span>
                      </label>
                    </div>
                    <div className="field-check">
                      <label for="clothing_shop">
                        <input type="checkbox" id="clothing_shop" value="" />
                        Clothing Shop
                        <span className="checkmark"><i className="la la-check"></i></span>
                      </label>
                    </div>
                    <div className="field-check">
                      <label for="spa">
                        <input type="checkbox" id="spa" value="" />
                        Spa
                        <span className="checkmark"><i className="la la-check"></i></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-box">
                <h3>Amenities</h3>
                <div className="filter-list">
                  <div className="filter-group">
                    <div className="field-check">
                      <label for="amen_res">
                        <input type="checkbox" id="amen_res" value="" />
                        Restaurant
                        <span className="checkmark"><i className="la la-check"></i></span>
                      </label>
                    </div>
                    <div className="field-check">
                      <label for="amen_coffee">
                        <input type="checkbox" id="amen_coffee" value="" />
                        Coffee Shop
                        <span className="checkmark"><i className="la la-check"></i></span>
                      </label>
                    </div>
                    <div className="field-check">
                      <label for="museum">
                        <input type="checkbox" id="museum" value="" />
                        Museum
                        <span className="checkmark"><i className="la la-check"></i></span>
                      </label>
                    </div>
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
                <span className="result-count"><span className="count">{total_place}</span> results</span>
              </div>
            </div>
            <div className="area-places layout-3col">
              {searches?.map((place) => {
                return (
                  <div className="place-item layout-02 place-hover" data-maps_name="mattone_restaurant">
                    <div className="place-inner">
                      <div className="place-thumb">
                        <Link className="entry-thumb" to={`/place-details/${place.place_id}`}><img src={apiService.ledgerUrl + place.place_image} alt="" /></Link>
                        <a href="#" className="golo-add-to-wishlist btn-add-to-wishlist " data-place-id="185" onClick={() => Wishlist(place.place_id)}>
                          <span className="icon-heart">
                            <i className="la la-bookmark large"></i>
                          </span>
                        </a>
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
                            <span>${place.place_price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>)
              })}
            </div>
          </div>
        </div>
      </div>) : (
        <div className='container'>
          <div className='row'>
            <div className='offset-md-4 col-md-4 text-center'>
              <img src={no_place} />
              <p>Sorry no place found !</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlaceSearch