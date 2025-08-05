import React, { useState, useEffect } from 'react';
import { Card, Button, Form, InputGroup } from 'react-bootstrap';
import { BiWorld, BiBuilding, BiLike, BiCommentDetail, BiShow, BiSend } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
import theme from '../theme';
import AdminPostForm from './Posts/AdminPostForm';
import CommentItem from '../Pages/Comments/CommentItem';

const visibilityOptions = [
    { label: 'عام - الجميع', value: 'public', icon: <BiWorld /> },
    { label: 'قسم الموارد البشرية', value: 'hr', icon: <BiBuilding /> },
];

const AdminPosts = () => {

    const currentUserId = 'user-1'; // مستقبلاً يكون من جلسة تسجيل الدخول

    const {
        colors: { primary },
    } = theme;

    const [viewedPostIds, setViewedPostIds] = useState(new Set());
    const [content, setContent] = useState('');
    const [visibility, setVisibility] = useState(visibilityOptions[0]);
    const [posts, setPosts] = useState([
        {
            id: 1,
            content: "يسر الإدارة إعلامكم بأنه سيتم اعتماد لائحة الحضور الجديدة اعتباراً من الأسبوع المقبل.",
            author: 'الإدارة العامة',
            time: 'منذ ساعتين',
            visibility: 'public',
            stats: {
                likes: 12,
                views: 98,
                comments: [
                    {
                        id: uuidv4(),
                        author: "أنت",
                        time: "الآن",
                        text: "مرحبًا بالجميع",
                        likes: 0,
                        isAuthor: true,
                        replies: [],
                    },
                ],
            },
        },
    ]);

    const [commentInputs, setCommentInputs] = useState({});
    const [visibleComments, setVisibleComments] = useState({});

    const toggleComments = (postId) => {
        setVisibleComments((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    const handlePost = () => {
        if (!content.trim()) return;

        const newPost = {
            id: Date.now(),
            content,
            author: visibility.label,
            time: 'الآن',
            visibility: visibility.value,
            stats: {
                likes: 0,
                views: 0,
                likedBy: [], //  هذا السطر 👈
                comments: [],
            },
        };

        setPosts((prev) => [newPost, ...prev]);
        setContent('');
        setVisibility(visibilityOptions[0]);
    };
    const handleLike = (postId) => {
        setPosts(prev =>
            prev.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        stats: {
                            ...post.stats,
                            likedBy: post.stats.likedBy?.includes(currentUserId)
                                ? post.stats.likedBy.filter(id => id !== currentUserId)
                                : [...(post.stats.likedBy || []), currentUserId],
                            likes: post.stats.likedBy?.includes(currentUserId)
                                ? post.stats.likes - 1
                                : post.stats.likes + 1,
                        }
                    }
                    : post
            )
        );
    };


    const handleView = (postId) => {
        setPosts((prev) =>
            prev.map((post) =>
                post.id === postId
                    ? { ...post, stats: { ...post.stats, views: post.stats.views + 1 } }
                    : post
            )
        );
    };

    const handleComment = (postId, commentText) => {
        if (!commentText.trim()) return;

        const newComment = {
            id: uuidv4(),
            text: commentText,
            author: 'أنت',
            time: 'الآن',
            likes: 0,
            isAuthor: true,
            replies: [],
            likedBy: [],
        };


        setPosts((prev) =>
            prev.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        stats: {
                            ...post.stats,
                            comments: [...post.stats.comments, newComment],
                        },
                    }
                    : post
            )
        );

        setCommentInputs((prev) => ({
            ...prev,
            [postId]: '',
        }));
    };
    const toggleLikeRecursive = (comments, commentId, currentUserId) => {
        return comments.map(comment => {
            if (comment.id === commentId) {
                const alreadyLiked = comment.likedBy?.includes(currentUserId);

                return {
                    ...comment,
                    likedBy: alreadyLiked
                        ? comment.likedBy.filter(id => id !== currentUserId)
                        : [...(comment.likedBy || []), currentUserId],
                    likes: alreadyLiked
                        ? (comment.likes || 0) - 1
                        : (comment.likes || 0) + 1,
                };
            }

            if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: toggleLikeRecursive(comment.replies, commentId, currentUserId),
                };
            }

            return comment;
        });
    };

    const handleCommentLike = (postId, commentId) => {
        setPosts(prev =>
            prev.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        stats: {
                            ...post.stats,
                            comments: toggleLikeRecursive(post.stats.comments, commentId, currentUserId),
                        },
                    }
                    : post
            )
        );
    };


    // دالة مساعدة: تضيف الرد في أي مستوى داخل الشجرة
    const addReplyRecursive = (comments, commentId, reply) => {
        return comments.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies || []), reply],
                };
            }

            if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: addReplyRecursive(comment.replies, commentId, reply),
                };
            }

            return comment;
        });
    };

    // تعديل دالة handleCommentReply لاستخدام الدالة المساعدة الذكية
    const handleCommentReply = (postId, commentId, replyText) => {
        const newReply = {
            id: uuidv4(),
            author: "أنت",
            time: "الآن",
            text: replyText,
            likes: 0,
            isAuthor: true,
            replies: [] // مهم عشان الرد عليه يكون ممكن
        };

        setPosts((prev) =>
            prev.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        stats: {
                            ...post.stats,
                            comments: addReplyRecursive(post.stats.comments, commentId, newReply),
                        },
                    }
                    : post
            )
        );
    };


    const deleteCommentRecursive = (comments, commentId) => {
        return comments
            .filter(comment => comment.id !== commentId)
            .map(comment => ({
                ...comment,
                replies: comment.replies ? deleteCommentRecursive(comment.replies, commentId) : [],
            }));
    };

    const handleCommentDelete = (postId, commentId) => {
        setPosts(prev =>
            prev.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        stats: {
                            ...post.stats,
                            comments: deleteCommentRecursive(post.stats.comments, commentId),
                        },
                    }
                    : post
            )
        );
    };

    useEffect(() => {
        const newViewed = new Set(viewedPostIds);
        posts.forEach((post) => {
            if (!newViewed.has(post.id)) {
                handleView(post.id);
                newViewed.add(post.id);
            }
        });
        setViewedPostIds(newViewed);
    }, [posts]);

    return (
        <>
            <AdminPostForm
                content={content}
                setContent={setContent}
                visibility={visibility}
                setVisibility={setVisibility}
                onSubmit={handlePost}
            />

            <div className="posts-container">
                {posts.map((post) => {
                    const commentText = commentInputs[post.id] || '';
                    const isPrimaryPost = post.id === posts[0]?.id;

                    return (
                        <Card
                            key={post.id}
                            className="shadow-sm border-0 mb-4"
                            style={{
                                borderRadius: '16px',
                                overflow: 'hidden',
                                minHeight: '320px',
                                backgroundColor: isPrimaryPost ? '#02365B' : '#ffffff',
                                color: isPrimaryPost ? '#ffffff' : '#212529',
                            }}
                        >
                            {/* Header */}
                            <div className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom">
                                <div className="d-flex align-items-center gap-3">
                                    <img
                                        src="https://i.pravatar.cc/40"
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{ width: 40, height: 40, objectFit: 'cover' }}
                                    />
                                    <div>
                                        <div className="fw-bold" style={{ fontSize: '0.95rem', color: '#212529' }}>{post.author}</div>
                                        <div style={{ color: '#6C757D', fontSize: '0.8rem' }}>{post.time}</div>
                                    </div>
                                </div>
                                <div className="fs-4 fw-bold text-muted" style={{ cursor: 'pointer' }}>⋯</div>
                            </div>

                            {/* Content */}
                            <Card.Body className="p-4 d-flex flex-column justify-content-between">
                                <p
                                    className="fw-semibold mb-4"
                                    style={{
                                        fontSize: '1.4rem',
                                        lineHeight: '1.9',
                                        color: isPrimaryPost ? '#fff' : '#02365B',
                                    }}
                                >
                                    "{post.content}"
                                </p>

                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <small style={{ color: isPrimaryPost ? '#cfe3f2' : '#6C757D' }}>
                                        {post.visibility === 'public' ? 'عام - الجميع' : 'خاص - الموارد البشرية'}
                                    </small>
                                    <div className="d-flex gap-4 small" style={{ color: isPrimaryPost ? '#cfe3f2' : '#00BAC6', fontSize: '0.9rem' }}>
                                        <span onClick={() => handleLike(post.id)} style={{ cursor: 'pointer' }}>
                                            <BiLike className="me-1" /> {post.stats.likes}
                                        </span>
                                        <span onClick={() => toggleComments(post.id)} style={{ cursor: 'pointer' }}>
                                            <BiCommentDetail className="me-1" /> {post.stats.comments.length}
                                        </span>
                                        <span>
                                            <BiShow className="me-1" /> {post.stats.views}
                                        </span>
                                    </div>
                                </div>
                            </Card.Body>

                            {/* Comment input */}
                            <div className="px-4 py-3 bg-white border-top">
                                <InputGroup>
                                    <Form.Control
                                        size="sm"
                                        placeholder="💬 أضف تعليقك..."
                                        value={commentText}
                                        onChange={(e) =>
                                            setCommentInputs((prev) => ({
                                                ...prev,
                                                [post.id]: e.target.value,
                                            }))
                                        }
                                        style={{
                                            backgroundColor: '#F8F9FA',
                                            borderRadius: '10px 0 0 10px',
                                            fontSize: '0.9rem',
                                            border: '1px solid #CED4DA',
                                            color: '#212529',
                                        }}
                                    />
                                    <Button
                                        size="sm"
                                        onClick={() => handleComment(post.id, commentText)}
                                        style={{
                                            backgroundColor: '#00BAC6',
                                            borderColor: '#00BAC6',
                                            borderRadius: '0 10px 10px 0',
                                            color: '#fff',
                                        }}
                                        disabled={!commentText.trim()}
                                    >
                                        <BiSend />
                                    </Button>
                                </InputGroup>
                            </div>

                            {/* Comments section */}
                            {visibleComments[post.id] && post.stats.comments.length > 0 && (
                                <div className="mt-2 px-3 pb-3" style={{ maxHeight: '200px', overflowY: 'auto', direction: 'rtl' }}>
                                    {post.stats.comments.map((comment) => (
                                        <CommentItem
                                            key={comment.id}
                                            comment={comment}
                                            currentUserId={currentUserId}
                                            onLike={(commentId) => handleCommentLike(post.id, commentId)}
                                            onReply={(commentId, replyText) => handleCommentReply(post.id, commentId, replyText)}
                                            onDelete={(commentId) => handleCommentDelete(post.id, commentId)}
                                        />
                                    ))}
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </>
    );

};

export default AdminPosts;
