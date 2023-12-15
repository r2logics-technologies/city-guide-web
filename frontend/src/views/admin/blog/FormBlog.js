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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadImg from "assets/img/img-upload.png";

const Option = Select.Option;
const { confirm } = antdModal;

function FormBlog() {
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;
  const [imgUpload, setImgUpload] = useState(uploadImg);
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
    setValue,
    formState: { errors },
  } = useForm();

  const removeThumImg = () => {
    setthumbnailImgUrl("");
    setValue("thumb", null);
  };
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  useEffect(() => {
    if (postId) fetchPlaceData(postId);
  }, [postId]);

  const fetchCategoriesData = () => {
    let url = "/api/admin/posts/categories";
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

  const fetchPlaceData = (id) => {
    let url = `/api/admin/post/${id}`;
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data.status === "success") {
          const post = data.post;
          setValue("title", post.title);
          setValue("content", post.content);
          setValue("post_category_id", post.post_category_id);
          if (post.thumb != null) {
            setImgUpload(apiService.ledgerUrl + post.thumb);
          }
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
    if (postId) {
      formData.append("edited", postId);
    }
    formData.append("title", data.title != null && data.title);
    formData.append("content", data.content != null && data.content);
    formData.append(
      "post_category_id",
      data.post_category_id != null && data.post_category_id
    );
    formData.append("thumb", data.thumb[0] != null && data.thumb[0]);

    const url = `/api/admin/posts/save/update`;
    api
      .post(url, formData)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setTimeout(() => {
            toast.success(data.message);
            navigate("/admin/blog");
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

  // Define your custom toolbar options
  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    [{ script: "sub" }, { script: "super" }],
  ];

  return (
    <>
      <Toaster />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="border-bottom">
                <CardTitle tag="h4" className="border-bottom">
                  {postId ? "Edit" : "Create"} Post{" "}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="my-2 col-md-4">
                      <div className="p-2 text-center position-relative">
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
                              style={{ height: "120px", maxWidth: "100%" }}
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src={imgUpload}
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
                            <label className="mt-2">
                              Select Thumbnail Image
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="my-2">
                        <div className="d-flex justify-content-between">
                          <small className="text-muted required-field">
                            Title
                          </small>
                          <small className="text-danger">
                            {errors?.title && "Title is required"}
                          </small>
                        </div>
                        <input
                          className="form-control"
                          type="text"
                          {...register("title", { required: true })}
                          placeholder="What the title of place"
                        />
                      </div>
                      <div className="my-2">
                        <div className="d-flex justify-content-between">
                          <small className="text-muted required-field">
                            Category
                          </small>
                          <small className="text-danger">
                            {errors?.post_category_id && "Category is required"}
                          </small>
                        </div>
                        <Controller
                          name="post_category_id"
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
                      <div className="my-2">
                        <div className="d-flex justify-content-between">
                          <small className="text-muted">Content</small>
                          <small className="text-danger">
                            {errors?.content && "Content is required"}
                          </small>
                        </div>
                        <Controller
                          name="content"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <ReactQuill
                              className="border rounded"
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                              modules={{
                                toolbar: toolbarOptions,
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex border-top mt-4 justify-content-end gap-3">
                    <button
                      className="btn btn-outline-primary rounded-pill"
                      type="submit"
                    >
                      Submit
                    </button>
                    <Link
                      to="/admin/blog"
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

export default FormBlog;
