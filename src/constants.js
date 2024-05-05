import * as Yup from "yup"
export const validationSchemaLocation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.object().shape({
    street: Yup.string()
      .min(5, "Street is too short")
      .required("Street is required"),
    city: Yup.string().min(3, "City is too short").required("City is required"),
    zipcode: Yup.number()
      .min(5, "Zipcode is too short")
      .required("Zipcode is required"),
    country: Yup.string()
      .min(3, "Country is too short")
      .required("Country is required"),
  }),
  structure: Yup.string()
    .min(3, "Structure is too short")
    .required("Structure is required"),
  description: Yup.string()
    .min(10, "Description is too short")
    .required("Description is required"),
  price: Yup.number().required("Price is required"),
  pictures: Yup.array().min(1, "At least one picture is required"),
  priceRange: Yup.number().when("isFree", {
    is: false,
    then: () => Yup.number().required("Price Range is required"),
  }),
  isExactPrice: Yup.boolean().required("Is Exact Price is required"),
  type: Yup.object().shape({
    typeName: Yup.string().required("Type is required"),
    artisticPeriod: Yup.string().when("type.typeName", {
      is: "Art",
      then: Yup.string().required("Artistic Period is required"),
    }),
    artType: Yup.string().when("type.typeName", {
      is: "Art",
      then: Yup.string().required("Art Type is required"),
    }),
    isPublic: Yup.boolean().when("type.typeName", {
      is: "Park",
      then: Yup.boolean().required("Is Public is required"),
    }),
  }),
  isFree: Yup.boolean().required("Is Free is required"),
})
