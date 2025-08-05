import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { BiSend, BiLike, BiTrash, BiReply } from 'react-icons/bi';

const CommentItem = ({
    comment,
    currentUserId,
    onLike,
    onReply,
    onDelete
}) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleReplySubmit = () => {
        if (replyText.trim()) {
            onReply(comment.id, replyText.trim());
            setReplyText('');
            setShowReplyBox(false);
        }
    };

    const isLiked = comment.likedBy?.includes(currentUserId);

    // 🎨 الهوية البصرية
    const primary = '#02365B';
    const accent = '#00BAC6';
    const gray = '#F8F9FA';
    const border = '#DEE2E6';
    const muted = '#6C757D';

    return (
        <div
            className="rounded px-3 py-2 mb-2"
            style={{
                backgroundColor: '#ffffff',
                border: `1px solid ${border}`,
                fontSize: '0.9rem',
                color: primary,
                direction: 'rtl',
            }}
        >
            <div>
                <strong style={{ color: primary }}>{comment.author}</strong>
                <span className="mx-2" style={{ color: muted, fontSize: '0.8rem' }}>{comment.time}</span>
            </div>

            <div className="mt-1" style={{ whiteSpace: 'pre-wrap', color: '#212529' }}>
                {comment.text}
            </div>

            {/* ✅ إجراءات التعليق */}
            <div className="d-flex gap-3 mt-2 small" style={{ color: muted }}>
                <span
                    style={{
                        cursor: 'pointer',
                        color: isLiked ? accent : muted
                    }}
                    onClick={() => onLike(comment.id)}
                >
                    <BiLike className="me-1" /> {isLiked ? 'إلغاء الإعجاب' : 'إعجاب'} ({comment.likedBy?.length || 0})
                </span>
                <span style={{ cursor: 'pointer' }} onClick={() => setShowReplyBox(!showReplyBox)}>
                    <BiReply className="me-1" /> رد
                </span>
                {comment.isAuthor && (
                    <span style={{ cursor: 'pointer' }} onClick={() => onDelete(comment.id)}>
                        <BiTrash className="me-1" /> حذف
                    </span>
                )}
            </div>

            {/* ✅ حقل الرد */}
            {showReplyBox && (
                <InputGroup size="sm" className="mt-2">
                    <Form.Control
                        placeholder="✍️ اكتب ردك..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        style={{
                            fontSize: '0.85rem',
                            backgroundColor: gray,
                            border: `1px solid ${border}`,
                            color: '#212529'
                        }}
                    />
                    <Button
                        style={{
                            backgroundColor: accent,
                            borderColor: accent,
                            color: '#fff'
                        }}
                        onClick={handleReplySubmit}
                    >
                        <BiSend />
                    </Button>
                </InputGroup>
            )}

            {/* 🔁 ردود متداخلة */}
            {Array.isArray(comment.replies) && comment.replies.length > 0 && (
                <div
                    className="mt-3 ps-3"
                    style={{
                        borderRight: `3px solid ${accent}`,
                        paddingRight: '1rem',
                        marginRight: '0.25rem'
                    }}
                >
                    {comment.replies.map((reply) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            currentUserId={currentUserId}
                            onLike={onLike}
                            onReply={onReply}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;
