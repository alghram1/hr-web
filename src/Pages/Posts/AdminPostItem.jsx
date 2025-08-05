import React, { useState } from 'react';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import { BiLike, BiCommentDetail, BiShow, BiSend } from 'react-icons/bi';

const AdminPostItem = ({ post, isFirst, onLike, onComment, onView }) => {
    // 🎨 ألوان الهوية
    const primaryColor = '#02365B';
    const accentColor = '#00BAC6';
    const lightGray = '#F8F9FA';
    const textMain = '#212529';
    const textMuted = '#6C757D';

    const backgroundColor = isFirst ? primaryColor : lightGray;
    const textColor = isFirst ? '#fff' : textMain;
    const subTextColor = isFirst ? '#e2e6ea' : textMuted;

    const [comment, setComment] = useState('');

    const handleCommentSubmit = () => {
        if (comment.trim()) {
            onComment(post.id, comment);
            setComment('');
        }
    };

    return (
        <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 20 }}>
            <Card.Body
                className="px-5 py-4 d-flex flex-column justify-content-between"
                style={{
                    backgroundColor,
                    minHeight: 260,
                    borderRadius: '1.25rem',
                }}
            >
                {/* ✅ محتوى المنشور */}
                <p
                    className="fw-bold mb-4"
                    style={{
                        fontSize: '1.5rem',
                        color: textColor,
                        lineHeight: '2.1rem',
                        wordSpacing: '1px',
                        letterSpacing: '0.3px',
                    }}
                >
                    “{post.content}”
                </p>

                {/* ✅ تفاصيل الأسفل */}
                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <small style={{ color: subTextColor }}>
                        {post.author} • {post.time}
                    </small>
                    <div className="d-flex gap-4 small" style={{ color: subTextColor }}>
                        <span
                            onClick={() => onLike(post.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <BiLike className="me-1" /> {post.stats.likes}
                        </span>
                        <span>
                            <BiCommentDetail className="me-1" /> {post.stats.comments.length}
                        </span>
                        <span>
                            <BiShow className="me-1" /> {post.stats.views}
                        </span>
                    </div>
                </div>
            </Card.Body>

            {/* ✅ حقل التعليق */}
            <div className="px-4 pb-4 pt-3 bg-white border-top rounded-bottom">
                <InputGroup>
                    <Form.Control
                        size="sm"
                        placeholder="أضف تعليقًا..."
                        className="bg-light"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={{
                            fontSize: '0.95rem',
                            borderRadius: '12px 0 0 12px',
                        }}
                    />
                    <Button
                        size="sm"
                        onClick={handleCommentSubmit}
                        style={{
                            backgroundColor: accentColor,
                            borderColor: accentColor,
                            color: '#fff',
                            borderRadius: '0 12px 12px 0',
                        }}
                        disabled={!comment.trim()}
                    >
                        <BiSend />
                    </Button>
                </InputGroup>
            </div>
        </Card>
    );
};

export default AdminPostItem;
