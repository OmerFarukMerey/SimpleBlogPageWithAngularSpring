package com.OFMwebsite.OFMwebsite.service;

import java.util.List;

import com.OFMwebsite.OFMwebsite.entity.Post;

public interface PostService {
    Post savePost(Post post);

    List<Post> getAllPost();

    Post getPostById(Long postId);

    void likePost(Long postId);

    List<Post> searchByName(String name);
}
