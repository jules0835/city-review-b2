/* eslint-disable no-underscore-dangle */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
"use client"

import Button from "@/components/buttons/Button"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { StarBorder, Star, DeleteOutline } from "@mui/icons-material"
import Image from "next/image"
import { DialogPopUp } from "@/components/popups/DialogPopUp"

const initialValues = {
  content: "",
  stars: undefined,
}
const CommentsSection = ({ locationId, initialComments, session }) => {
  const [confirmDeletePopup, setConfirmDeletePopup] = useState(false)
  const [newCommentOpen, setNewCommentOpen] = useState(false)
  const [comments, setComments] = useState(initialComments)
  const [commentToDelete, setCommentToDelete] = useState("")
  const t = useTranslations("Locations.comments")
  const handleDelete = (ratingId) => {
    setConfirmDeletePopup(true)
    setCommentToDelete(ratingId)
  }
  const sendDelete = async (ratingId) => {
    setConfirmDeletePopup(false)

    try {
      await axios.delete(`/api/locations/comments/comment/${ratingId}`)
      setComments(comments.filter((comment) => comment._id !== ratingId))
    } catch (error) {
      /*Empty*/
    }
  }
  const validationSchema = Yup.object().shape({
    stars: Yup.number().required(t("starsRequired")),
  })
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const ratingContent = {
        userId: session.user.userId,
        comment: values.content,
        rating: values.stars,
      }

      try {
        const response = await axios.post(
          `/api/locations/comments/${locationId}`,
          ratingContent
        )
        setComments([response.data.newRating, ...comments])
        formik.resetForm()
        setNewCommentOpen(false)
      } catch (error) {
        /*Empty*/
      }
    },
  })

  return (
    <div className="flex flex-col bg-white p-5 rounded-lg mt-4 shadow-md w-full">
      <DialogPopUp
        isOpen={confirmDeletePopup}
        setIsOpen={setConfirmDeletePopup}
        title={t("deleteComment")}
        buttonMain={{ text: t("cancel") }}
        buttonSecondary={{ text: t("delete") }}
        content={t("deleteCommentMsg")}
        actionSecondaryBtn={() => sendDelete(commentToDelete)}
      />
      <h1 className="text-xl font-bold text-center pb-5">
        {t("title")} ({comments?.length || 0})
      </h1>

      {newCommentOpen && session && (
        <div>
          <h2 className="text-lg font-bold">{t("newCommentsBfSend")}</h2>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="py-3 flex space-x-2 ">
                <div>
                  {[...Array(5)].map((_, star) => {
                    const starRating = star + 1

                    if (formik.values.stars >= starRating) {
                      return (
                        <Star
                          key={star}
                          onClick={() =>
                            formik.setFieldValue("stars", starRating)
                          }
                          className="hover:text-yellow-500 text-yellow-500 cursor-pointer"
                        />
                      )
                    }

                    return (
                      <StarBorder
                        key={star}
                        onClick={() =>
                          formik.setFieldValue("stars", starRating)
                        }
                        className="hover:text-yellow-500 cursor-pointer"
                      />
                    )
                  })}
                </div>
                {formik.values.stars && (
                  <p>
                    {formik.values.stars} {t("stars")}
                  </p>
                )}
              </div>
              {formik.errors.stars && (
                <div className="text-red-500">{formik.errors.stars}</div>
              )}
              <textarea
                placeholder={t("addComment")}
                className="w-full h-20 border border-gray-300 rounded-lg p-2 mt-2"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
              />
              {formik.errors.content && (
                <div className="text-red-500">{formik.errors.content}</div>
              )}
              <div className="flex mt-2 space-x-2">
                <Button isMain isSubmit>
                  {t("send")}
                </Button>
                <Button onClickBtn={() => setNewCommentOpen(false)}>
                  {t("cancel")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {!newCommentOpen && session && (
        <div className="flex flex-col justify-center text-center">
          <h2 className="text-lg font-semibold text-center pb-2">
            {t("newCommentsMsg")}
          </h2>
          <Button onClickBtn={() => setNewCommentOpen(true)} isMain>
            {t("newComment")}
          </Button>
        </div>
      )}
      {!session && (
        <div className="text-center">
          <h2 className="text-lg font-semibold text-center pb-2">
            {t("newCommentsMsg")}
          </h2>
          <p className="mb-5">{t("loginToComment")}</p>
          <Button isMain withLink={"/authentication"}>
            {t("login")}
          </Button>
        </div>
      )}

      <div className="mt-10">
        {comments?.map((comment) => (
          <div key={comment._id} className="flex flex-col mt-8 border-t pt-3">
            <div className="flex items-center space-x-2">
              <Image
                src={`/images/profils/${comment.author.profilePic}`}
                // eslint-disable-next-line max-lines
                alt="author"
                className="rounded-full"
                width={50}
                height={50}
              />
              <div>
                <p>{comment.author.username}</p>
              </div>
              {session && session.user.userId === comment.userId && (
                <div className="flex items-center space-x-2">
                  <p>-</p>
                  <DeleteOutline
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => handleDelete(comment._id)}
                  />
                </div>
              )}
            </div>
            <div className="flex space-x-2 mt-1">
              <div>
                {[...Array(5)].map((_, star) => {
                  const starRating = star + 1

                  if (comment.rating >= starRating) {
                    return <Star key={star} className="text-yellow-500" />
                  }

                  return <StarBorder key={star} />
                })}
              </div>
              <p>
                {comment.rating} {t("stars")}
              </p>
            </div>
            {comment.comment && (
              <div className="mt-4">
                <p>&quot;{comment.comment}&quot;</p>
              </div>
            )}
            <div className="flex space-x-2 mt-4">
              <p>{comment.createdAt.substring(0, 10)}</p>
              <p>-</p>
              <p>{comment.createdAt.substring(11, 16)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentsSection
