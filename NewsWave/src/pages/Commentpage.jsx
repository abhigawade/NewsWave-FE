"use client"

import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../auth/ApiUrl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Edit, Trash2, Reply, Send, X } from "lucide-react"
import { format } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "react-toastify"

export default function CommentPage({ articleId, onClose }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [editingComment, setEditingComment] = useState(null)
  const [updatedComment, setUpdatedComment] = useState("")
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState(null)

  const token = Cookies.get("accessToken")

  // Fetch current user info
  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/users/me/`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      console.log("Current user response:", response.data) // Add this debug log
      setCurrentUser(response.data.id)
    } catch (error) {
      console.error("Error fetching user info:", error)
    }
  }, [token])

  // Fetch all comments for the given article
  const fetchComments = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${API_URL}/comments/comments/?article_id=${articleId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })

      console.log("API Response:", response.data)
      setComments(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error("Error fetching comments:", error)
      setComments([])
    } finally {
      setIsLoading(false)
    }
  }, [articleId, token])

  // Add a new comment
  const addComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      await axios.post(
        `${API_URL}/comments/comments/`,
        { comment: newComment, article: articleId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      )
      setNewComment("")
      fetchComments()
      toast.success("Comment added successfully")
    } catch (error) {
      console.error("Error adding comment:", error)
      toast.error("Failed to add comment")
    }
  }

  // Reply to a comment
  const addReply = async (commentId) => {
    if (!replyText.trim()) return

    try {
      await axios.post(
        `${API_URL}/comments/comments/`,
        { comment: replyText, article: articleId, reply: commentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      )
      setReplyingTo(null)
      setReplyText("")
      fetchComments()
      toast.success("Reply added successfully")
    } catch (error) {
      console.error("Error replying to comment:", error)
      toast.error("Failed to add reply")
    }
  }

  // Handle delete comment confirmation
  const handleDeleteClick = (commentId) => {
    setCommentToDelete(commentId)
    setDeleteDialogOpen(true)
  }

  // Delete a comment
  const deleteComment = async () => {
    if (!commentToDelete) return

    try {
      await axios.delete(`${API_URL}/comments/comments/${commentToDelete}/`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      setDeleteDialogOpen(false)
      setCommentToDelete(null)
      fetchComments()
      toast.success("Comment deleted successfully")
    } catch (error) {
      console.error("Error deleting comment:", error)
      toast.error("Failed to delete comment")
    }
  }

  // Update a comment
  const updateComment = async (commentId) => {
    if (!updatedComment.trim()) return

    try {
      await axios.patch(
        `${API_URL}/comments/comments/${commentId}/`,
        { comment: updatedComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      )
      setEditingComment(null)
      setUpdatedComment("")
      fetchComments()
      toast.success("Comment updated successfully")
    } catch (error) {
      console.error("Error updating comment:", error)
      toast.error("Failed to update comment")
    }
  }

  // Format date
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy • h:mm a")
    } catch (error) {
      return dateString
    }
  }

  // Fetch comments and user info when component mounts
  useEffect(() => {
    console.log("Fetching current user...")
    fetchCurrentUser()
  }, [fetchCurrentUser])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  // Get top-level comments (those without a reply parent)
  const topLevelComments = comments.filter((comment) => comment.reply === null)

  // Get replies for a specific comment
  const getReplies = (commentId) => {
    return comments.filter((comment) => comment.reply === commentId)
  }

  // Check if user can edit/delete a comment
  const canModifyComment = (commentUserId) => {
    console.log("Checking permissions:", {
      currentUser,
      commentUserId,
      isMatch: currentUser === commentUserId,
    })
    // Convert both to strings or numbers for comparison
    return String(currentUser) === String(commentUserId)
  }

  return (
    <div className="flex flex-col h-[80vh] w-[50vw] bg-white rounded-lg shadow-lg">
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this comment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your comment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteComment} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-bold">Comments</h2>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {currentUser && <div className="px-4 py-2 bg-gray-50 text-sm text-gray-600">Logged in as User {currentUser}</div>}

      {/* Comment Input - Moved to top */}
      <div className="border-b p-4 bg-white">
        <form onSubmit={addComment} className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-3">
            <Textarea
              placeholder="Add your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] p-3 text-base border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                disabled={!newComment.trim()}
              >
                Post Comment
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Content Area */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6 max-w-3xl mx-auto">
          {isLoading ? (
            <div className="text-center py-8">Loading comments...</div>
          ) : topLevelComments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No comments yet. Be the first to comment!</div>
          ) : (
            topLevelComments.map((comment) => (
              <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-4 relative">
                {console.log("Rendering comment:", {
                  commentId: comment.id,
                  userId: comment.user,
                  currentUser,
                  canModify: canModifyComment(comment.user),
                })}
                {/* Comment Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      {comment.user.toString()[0]}
                    </div>
                    <div>
                      <div className="font-medium">User {comment.user}</div>
                      <div className="text-xs text-gray-500">{formatDate(comment.created_at)}</div>
                    </div>
                  </div>

                  {canModifyComment(comment.user) && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-blue-500"
                        onClick={() => {
                          setEditingComment(comment.id)
                          setUpdatedComment(comment.comment)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => handleDeleteClick(comment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Comment Content */}
                {editingComment === comment.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={updatedComment}
                      onChange={(e) => setUpdatedComment(e.target.value)}
                      className="min-h-[100px] w-full p-3 text-base border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingComment(null)}>
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={() => updateComment(comment.id)}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-800 text-base leading-relaxed mb-3">{comment.comment}</p>
                )}

                {/* Reply Section */}
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                </div>

                {replyingTo === comment.id && (
                  <div className="mt-3 pl-4 border-l-2 border-gray-200">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-grow text-base bg-white text-gray-900 border-gray-200"
                      />
                      <Button
                        onClick={() => addReply(comment.id)}
                        disabled={!replyText.trim()}
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Send
                      </Button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {getReplies(comment.id).length > 0 && (
                  <div className="mt-4 pl-6 border-l-2 border-gray-200 space-y-4">
                    {getReplies(comment.id).map((reply) => (
                      <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xs">
                              {reply.user.toString()[0]}
                            </div>
                            <div>
                              <div className="font-medium text-sm">User {reply.user}</div>
                              <div className="text-xs text-gray-500">{formatDate(reply.created_at)}</div>
                            </div>
                          </div>

                          {canModifyComment(reply.user) && (
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-blue-500"
                                onClick={() => {
                                  setEditingComment(reply.id)
                                  setUpdatedComment(reply.comment)
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-red-500"
                                onClick={() => handleDeleteClick(reply.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>

                        {editingComment === reply.id ? (
                          <div className="mt-2 space-y-2">
                            <Textarea
                              value={updatedComment}
                              onChange={(e) => setUpdatedComment(e.target.value)}
                              className="w-full p-2 text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                            />
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingComment(null)}
                                className="h-7 text-xs"
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => updateComment(reply.id)}
                                className="h-7 text-xs bg-blue-500 hover:bg-blue-600"
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-800 mt-1">{reply.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

