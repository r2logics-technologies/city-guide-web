import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import toast, { Toaster } from "react-hot-toast";
import { Modal as antdModal } from "antd";
import * as BsIcons from "react-icons/bs";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Select } from "antd";
import api from "utility/api";

const Option = Select.Option;
const { confirm } = antdModal;

function CreatePlace() {
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

  const [countriesList, setCountriesList] = useState([]);
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

  const onSubmit = async (data) => {
    console.log("object", data);
    const url = `/api/admin/cities/save/update`;
    api
      .post(url, data)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setTimeout(() => {
            toast.success(data.message);
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
                <CardTitle tag="h4">Create Place </CardTitle>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-12">
                      <p className="fs-4 mb-0 text-muted">Genral</p>
                    </div>
                    <div className="my-2 col-md-8">
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
                    <div className="my-2 col-md-4">
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
                        rows={1}
                      />
                    </div>
                    <div className="col-12">
                      <p className="fs-4 mt-2 mb-0 text-muted">Contact info</p>
                    </div>

                    <div className="my-2 col-md-4">
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
                    <div className="my-2 col-md-4">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted required-field">
                          Phone Number
                        </small>
                        <small className="text-danger">
                          {errors?.phone_number && "Phone Number is required"}
                        </small>
                      </div>
                      <input
                        className="form-control"
                        type="number"
                        {...register("phone_number", { required: true })}
                        placeholder="Enter Phone Number"
                      />
                    </div>
                    <div className="my-2 col-md-4">
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
                        type="number"
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
                    <p className="fs-4 mt-2 mb-0 text-muted">Booking Type</p>
                  </div>
                  <div className="my-2 col-12">
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">Booking Type</small>
                    </div>
                    <input
                      type="radio"
                      {...register("booking_type")}
                      value={'Affiliate Link Booking'}
                    />
                  </div>
                  <div className="col-12">
                    <p className="fs-4 mt-2 mb-0 text-muted">Booking Type</p>
                  </div>
                  <div className="my-2 col-12">
                    <input
                      className="form-control"
                      type="number"
                      {...register("booking_type")}
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
                    <p className="btn btn-outline-danger rounded-pill">
                      Cancel
                    </p>
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

export default CreatePlace;
