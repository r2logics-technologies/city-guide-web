import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import toast, { Toaster } from "react-hot-toast";
import { Modal as antdModal } from "antd";
import * as BsIcons from "react-icons/bs";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Select } from "antd";
import api from "utility/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiService from "utility/apiService";
import uploadImg from "../../../assets/img/img-upload.png";

const Option = Select.Option;
const { confirm } = antdModal;

function FormPlace() {
  const navigate = useNavigate();
  const params = useParams();
  const placeId = params.id;
  const [thumbnailImgUrl, setthumbnailImgUrl] = useState("");

  const selectThumbnailImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setthumbnailImgUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      placesocial: [
        {
          social_type: "",
          social_url: "",
        },
      ],
      placeopen: [
        {
          day: "",
          time: "",
        },
      ],
    },
  });

  const removeThumImg = () => {
    setthumbnailImgUrl("");
    setValue("thumb", null);
  };
  const [countriesList, setCountriesList] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [placeTypesList, setPlaceTypesList] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: "placesocial",
  });

  const {
    fields: openingFields,
    append: appendOpening,
    remove: removeOpening,
  } = useFieldArray({
    control,
    name: "placeopen",
  });

  useEffect(() => {
    fetchCountriesData();
    fetchCurrenciesData();
    fetchCitiesData();
    fetchCategoriesData();
    fetchPlaceTypesData();
    fetchAmenitiesData();
  }, []);

  const fetchCountriesData = () => {
    let url = "/api/admin/countries";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setCountriesList(data.countries);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const fetchCurrenciesData = () => {
    let url = "/api/admin/currencies";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setCurrencies(data.currencies);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const fetchCitiesData = () => {
    let url = "/api/admin/cities";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setCitiesList(data.cities);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const fetchCategoriesData = () => {
    let url = "/api/admin/categories";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setCategoriesList(data.categories);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const fetchPlaceTypesData = () => {
    let url = "/api/admin/placetypes";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setPlaceTypesList(data.placetypes);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const fetchAmenitiesData = () => {
    let url = "/api/admin/amenities";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setAmenitiesList(data.amenities);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (placeId) fetchPlaceData(placeId);
  }, [placeId]);

  const fetchPlaceData = (id) => {
    let url = `/api/admin/place/${id}`;
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data.status === "success") {
          const place = data.place;
          setValue("name", place.name);
          setValue("price_range", place.price_range);
          setValue("description", place.description);
          setValue("address", place.address);
          setValue("details", place.details);
          setValue("lat", place.lat);
          setValue("lng", place.lng);
          setValue("email", place.email);
          setValue("phone_number", place.phone_number);
          setValue("website", place.website);
          setValue("video", place.video);
          setValue("booking_type", place.booking_type); 
          setValue("link_bookingcom", place.link_bookingcom);
          setValue("country_id", place.country_id);
          setValue("city_id", place.city_id);
          setValue("currency_id", place.currency_id);
          setValue("category", place.category);
          setValue("place_type", place.place_type);

          if (place.amenities && place.amenities.length > 0) {
            setValue(
              "amenities",
              place.amenities.map((amenity) => String(amenity.amenities_id))
            );
          }
          if (place.placesocials && place.placesocials.length > 0) {
            setValue("placesocial", place.placesocials);
          }
          if (place.placeopens && place.placeopens.length > 0) {
            setValue("placeopen", place.placeopens);
          }

          setthumbnailImgUrl(apiService.ledgerUrl + place.thumb);
        } else {
          toast(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    if (placeId) {
      formData.append("edited", placeId);
    }
    formData.append("name", data.name != null && data.name);
    formData.append("thumb", data.thumb[0] != null && data.thumb[0]);
    formData.append(
      "currency_id",
      data.currency_id != null && data.currency_id
    );
    formData.append(
      "price_range",
      data.price_range != null && data.price_range
    );
    formData.append(
      "description",
      data.description != null && data.description
    );
    formData.append("address", data.address != null && data.address);
    formData.append("details", data.details != null && data.details);
    formData.append("lat", data.lat != null && data.lat);
    formData.append("lng", data.lng != null && data.lng);
    formData.append("email", data.email != null && data.email);
    formData.append(
      "phone_number",
      data.phone_number != null && data.phone_number
    );
    formData.append("website", data.website != null && data.website);
    formData.append("video", data.video != null && data.video);
    formData.append(
      "booking_type",
      data.booking_type != null && data.booking_type
    );
    formData.append(
      "link_bookingcom",
      data.link_bookingcom != null && data.link_bookingcom
    );
    formData.append("category", data.category != null && data.category);
    formData.append("place_type", data.place_type != null && data.place_type);
    formData.append("country_id", data.country_id != null && data.country_id);
    formData.append("city_id", data.city_id != null && data.city_id);

    if (data.amenities != null) {
      const amenitiesArray = Array.isArray(data.amenities)
        ? data.amenities.map((id) => ({ id: id }))
        : [{ id: data.amenities }];

      formData.append("amenities", JSON.stringify(amenitiesArray));
    } else {
      // Handle the case when amenities is null
      formData.append("amenities", null);
    }

    // Fix for placeopen and placesocial fields
    formData.append(
      "placesocial",
      data.placesocial != null && JSON.stringify(data.placesocial)
    );
    formData.append(
      "placeopen",
      data.placeopen != null && JSON.stringify(data.placeopen)
    );

    console.log(formData);
    const url = `/api/admin/places/save/update`;
    api
      .post(url, formData)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setTimeout(() => {
            toast.success(data.message);
            navigate("/admin/place");
          }, 1000);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      });
  };
  return (
    <>
      <Toaster />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <CardTitle tag="h4" className="border-bottom">
                  {placeId ? "Edit" : "Create"} Place{" "}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-12">
                      <p className="fs-4 mb-0 text-muted">Genral</p>
                    </div>
                    <div className="my-2 col-md-6">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted required-field">
                          Place Name
                        </small>
                        <small className="text-danger">
                          {errors?.name && "Place Name is required"}
                        </small>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="What the name of place"
                      />
                    </div>
                    <div className="my-2 col-md-3">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted required-field">
                          Currency
                        </small>
                        <small className="text-danger">
                          {errors?.currency_id && "Currency is required"}
                        </small>
                      </div>
                      <Controller
                        name="currency_id"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            className="w-100"
                            placeholder="Select Currency"
                            {...field}
                          >
                            {currencies.map((currency) => (
                              <Option key={currency.id} value={currency.id}>
                                {currency.title}
                              </Option>
                            ))}
                          </Select>
                        )}
                      />
                    </div>
                    <div className="my-2 col-md-3">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted required-field">
                          Price Range
                        </small>
                        <small className="text-danger">
                          {errors?.price_range && "Price Range is required"}
                        </small>
                      </div>
                      <input
                        className="form-control"
                        type="number"
                        {...register("price_range", { required: true })}
                        placeholder="Enter price range"
                      />
                    </div>
                    <div className="my-2 col-md-12">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">Description</small>
                      </div>
                      <textarea
                        className="form-control"
                        {...register("description")}
                      />
                    </div>
                    <div className="my-2 col-md-6">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted required-field">
                          Category
                        </small>
                        <small className="text-danger">
                          {errors?.category && "Category is required"}
                        </small>
                      </div>
                      <Controller
                        name="category"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            className="w-100"
                            placeholder="Select Category"
                            {...field}
                          >
                            {categoriesList.map((category) => (
                              <Option key={category.id} value={category.id}>
                                {category.name}
                              </Option>
                            ))}
                          </Select>
                        )}
                      />
                    </div>
                    <div className="my-2 col-md-6">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted required-field">
                          Place Type
                        </small>
                        <small className="text-danger">
                          {errors?.place_type && "Place Type is required"}
                        </small>
                      </div>
                      <Controller
                        name="place_type"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            className="w-100"
                            placeholder="Select Place Type"
                            {...field}
                          >
                            {placeTypesList.map((placeType) => (
                              <Option key={placeType.id} value={placeType.id}>
                                {placeType.name}
                              </Option>
                            ))}
                          </Select>
                        )}
                      />
                    </div>
                    <div className="col-12">
                      <p className="fs-4 mt-2 mb-0 text-muted">Amenities</p>
                    </div>
                    <div className="row">
                      {amenitiesList?.map((amenity) => (
                        <div
                          key={amenity.id}
                          className="d-flex col-md-3 gap-2 justify-content-start align-items-baseline"
                        >
                          <input
                            type="checkbox"
                            id={`amenity-${amenity.id}`}
                            {...register("amenities")}
                            value={amenity.id}
                          />
                          <label htmlFor={`amenity-${amenity.id}`}>
                            {amenity.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="col-12">
                      <p className="fs-4 mt-2 mb-0 text-muted">Location</p>
                    </div>
                    <div className="my-2 col-md-6">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted required-field">
                          Country
                        </small>
                        <small className="text-danger">
                          {errors?.country_id && "Country is required"}
                        </small>
                      </div>
                      <Controller
                        name="country_id"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            className="w-100"
                            placeholder="Select Country"
                            {...field}
                          >
                            {countriesList.map((country) => (
                              <Option key={country.id} value={country.id}>
                                {country.name}
                              </Option>
                            ))}
                          </Select>
                        )}
                      />
                    </div>
                    <div className="my-2 col-md-6">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted required-field">
                          City
                        </small>
                        <small className="text-danger">
                          {errors?.city_id && "City is required"}
                        </small>
                      </div>
                      <Controller
                        name="city_id"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            className="w-100"
                            placeholder="Select City"
                            {...field}
                          >
                            {citiesList.map((city) => (
                              <Option key={city.id} value={city.id}>
                                {city.name}
                              </Option>
                            ))}
                          </Select>
                        )}
                      />
                    </div>
                    <div className="my-2 col-12">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted required-field">
                          Place Address
                        </small>
                      </div>
                      <textarea
                        className="form-control"
                        {...register("address")}
                        rows={2}
                      />
                    </div>
                    <div className="my-2 col-12">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">Map Address</small>
                      </div>
                      <textarea
                        className="form-control"
                        {...register("details")}
                        rows={2}
                      />
                    </div>
                    <div className="my-2 col-md-6">
                      <small className="text-muted required-field">
                        Latitude
                      </small>
                      {errors.lat?.type === "required" && (
                        <>
                          {" "}
                          <small className="text-danger">
                            Latitude is required
                          </small>
                        </>
                      )}
                      {errors.lat?.type === "pattern" && (
                        <>
                          {" "}
                          <small className="text-danger">
                            Invalid latitude format
                          </small>
                        </>
                      )}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ex. 23.8571654"
                        autoComplete="off"
                        {...register("lat", {
                          pattern: /^-?([0-8]?[0-9]?[0-9]\.\d+|90\.0+)$/,
                          required: true,
                        })}
                      />
                    </div>
                    <div className="my-2 col-md-6">
                      <small className="text-muted required-field">
                        Longitude
                      </small>
                      {errors.lng?.type === "required" && (
                        <>
                          {" "}
                          <small className="text-danger">
                            Longitude is required
                          </small>
                        </>
                      )}
                      {errors.lng?.type === "pattern" && (
                        <>
                          {" "}
                          <small className="text-danger">
                            Invalid longitude format
                          </small>
                        </>
                      )}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ex. 77.2548755"
                        autoComplete="off"
                        {...register("lng", {
                          pattern: /^-?([0-8]?[0-9]?[0-9]\.\d+|90\.0+)$/,
                          required: true,
                        })}
                      />
                    </div>
                    <div className="col-12">
                      <p className="fs-4 mt-2 mb-0 text-muted">Contact info</p>
                    </div>

                    <div className="my-2 col-md-6">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted required-field">
                          Email
                        </small>

                        <small className="text-danger">
                          {errors?.email && "Email is required"}
                        </small>
                      </div>
                      <input
                        className="form-control"
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="Enter Email"
                      />
                    </div>
                    <div className="my-2 col-md-6">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted required-field">
                          Mobile Number
                        </small>
                        {errors.phone_number?.type === "required" && (
                          <>
                            {" "}
                            <small className="text-danger">
                              Mobile Number is required
                            </small>
                          </>
                        )}
                        {errors.phone_number?.type === "pattern" && (
                          <>
                            {" "}
                            <small className="text-danger">
                              Invalid Mobile Number format
                            </small>
                          </>
                        )}
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        {...register("phone_number", {
                          pattern: /^[0-9]{10}$/,
                          required: true,
                        })}
                        placeholder="Enter Phone Number"
                      />
                    </div>
                    <div className="my-2 col-md-12">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted required-field">
                          Website
                        </small>
                        <small className="text-danger">
                          {errors?.website && "Website is required"}
                        </small>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        {...register("website", { required: true })}
                        placeholder="Enter Website"
                      />
                    </div>
                    <div className="col-12">
                      <p className="fs-4 mt-2 mb-0 text-muted">
                        Social Networks
                      </p>
                    </div>
                    <div className="col-12 mb-3 px-3 pt-2 pb-1">
                      {socialFields.map(({ id, name }, index) => {
                        return (
                          <div
                            className="my-2 d-flex justify-content-start gap-2 align-items-center"
                            key={id}
                          >
                            <div className="w-50">
                              <input
                                type="text"
                                {...register(
                                  `placesocial.${index}.social_type`
                                )}
                                placeholder="Enter Type facebook,instagram etc."
                                className="form-control"
                              />
                            </div>
                            <div className="w-50">
                              <input
                                type="text"
                                {...register(`placesocial.${index}.social_url`)}
                                className="form-control"
                                placeholder="Enter URL include with http or www"
                              />
                            </div>
                            <div className="w-25">
                              <div className="d-flex align-items-center add_de_icons_hub">
                                {index === 0 ? (
                                  ""
                                ) : (
                                  <BsIcons.BsTrash
                                    onClick={() => removeSocial(index)}
                                    name="BsTrash"
                                    className="text-danger cr-pointer"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <span
                        className="add_de_icons_hub mt-2"
                        onClick={() =>
                          appendSocial({
                            social_type: "",
                            social_url: "",
                          })
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <BsIcons.BsPlusCircle
                          name="add-circle-outline"
                          className="icon"
                        />{" "}
                        Add more
                      </span>
                    </div>
                    <div className="col-12">
                      <p className="fs-4 mt-2 mb-0 text-muted">Opening hours</p>
                    </div>
                    <div className="col-12 mb-3 px-3 pt-2 pb-1">
                      {openingFields.map(({ id, name }, index) => {
                        return (
                          <div
                            className="my-2 d-flex justify-content-start gap-2 align-items-center"
                            key={id}
                          >
                            <div className="w-50">
                              <input
                                type="text"
                                {...register(`placeopen.${index}.day`)}
                                placeholder="Enter day sunday - monday etc."
                                className="form-control"
                              />
                            </div>
                            <div className="w-50">
                              <input
                                type="text"
                                {...register(`placeopen.${index}.time`)}
                                className="form-control"
                                placeholder="Enter value Exp:9:00 - 21:00"
                              />
                            </div>
                            <div className="w-25">
                              <div className="d-flex align-items-center add_de_icons_hub">
                                {index === 0 ? (
                                  ""
                                ) : (
                                  <BsIcons.BsTrash
                                    onClick={() => removeOpening(index)}
                                    name="BsTrash"
                                    className="text-danger cr-pointer"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <span
                        className="add_de_icons_hub mt-2"
                        onClick={() =>
                          appendOpening({
                            day: "",
                            time: "",
                          })
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <BsIcons.BsPlusCircle
                          name="add-circle-outline"
                          className="icon"
                        />{" "}
                        Add more
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <p className="fs-4 mt-2 mb-0 text-muted">Media</p>
                  </div>
                  <div className="my-2 col-12">
                    <small className="text-muted">Thumbnail Image :</small>
                    <div className="col-md-3 rounded p-2 text-center position-relative">
                      {thumbnailImgUrl ? (
                        <>
                          <BsIcons.BsX
                            className="img-remove-btn"
                            onClick={() => {
                              removeThumImg();
                            }}
                          />
                          <img
                            src={thumbnailImgUrl}
                            className="img-fluid rounded"
                            style={{ height: "120px", maxWidth: "100%" }}
                          />
                        </>
                      ) : (
                        <>
                          <img
                            src={uploadImg}
                            className="img-fluid rounded"
                            style={{ height: "120px", maxWidth: "100%" }}
                          />
                        </>
                      )}
                      <input
                        type="file"
                        className="image-input"
                        {...register("thumb")}
                        accept="image/jpeg, image/jpg, image/png, application/pdf"
                        onChange={selectThumbnailImg}
                      />
                      {!thumbnailImgUrl && (
                        <div>
                          <label className="mt-2">Select Thumbnail Image</label>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="my-2 col-12">
                    <small className="text-muted">Video :</small>
                    <input
                      className="form-control"
                      type="text"
                      {...register("video")}
                      placeholder="YouTube, Vimeo video url"
                    />
                  </div>
                  <div className="col-12 mt-4">
                    <p className="fs-4 mt-2 mb-0 text-muted">Booking Type</p>
                  </div>
                  <div className="my-2 d-flex justify-content-start gap-5">
                    <div className="d-flex justify-content-start gap-2">
                      <small className="fs-5 text-muted">Booking Form</small>
                      <input
                        type="radio"
                        {...register("booking_type")}
                        value={"Booking Form"}
                      />
                    </div>
                    <div className="d-flex justify-content-start gap-2">
                      <small className="fs-5 text-muted">Contact Form</small>
                      <input
                        type="radio"
                        {...register("booking_type")}
                        value={"Contact Form"}
                      />
                    </div>{" "}
                    <div className="d-flex justify-content-start gap-2">
                      <small className="fs-5 text-muted">
                        Affiliate Link Booking
                      </small>
                      <input
                        type="radio"
                        {...register("booking_type")}
                        value={"Affiliate Link Booking"}
                      />
                    </div>
                    <div className="d-flex justify-content-start gap-2">
                      <small className="fs-5 text-muted">Banner Link</small>
                      <input
                        type="radio"
                        {...register("booking_type")}
                        value={"Banner Link"}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <p className="fs-6 mt-2 mb-0 text-muted">
                      Booking Link(booking.com)
                    </p>
                  </div>
                  <div className="my-2 col-12">
                    <input
                      className="form-control"
                      type="text"
                      {...register("link_bookingcom")}
                      placeholder="Enter Website"
                    />
                  </div>
                  <div className="d-flex border-top mt-4 justify-content-end gap-3">
                    <button
                      className="btn btn-outline-primary rounded-pill"
                      type="submit"
                    >
                      Submit
                    </button>
                    <Link
                      to="/admin/place"
                      className="btn btn-outline-danger rounded-pill"
                    >
                      Cancel
                    </Link>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default FormPlace;
