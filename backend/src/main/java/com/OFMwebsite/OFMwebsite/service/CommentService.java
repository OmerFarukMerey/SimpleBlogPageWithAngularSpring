package com.OFMwebsite.OFMwebsite.service;

import java.util.List;

import com.OFMwebsite.OFMwebsite.entity.Comment;

public interface CommentService {
    Comment createComment(Long postId, String postedBy, String content);
    List<Comment> getCommentByPostId(Long postId);
}
