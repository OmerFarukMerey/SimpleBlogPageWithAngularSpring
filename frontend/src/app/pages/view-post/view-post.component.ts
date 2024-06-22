import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../service/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss',
})
export class ViewPostComponent {
  postId = this.activatedRoute.snapshot.params['id'];
  postData: any;
  comments: any;

  commentForm!: FormGroup;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    console.log(this.postId);
    this.getPostById();

    this.commentForm = this.fb.group({
      postedBy: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  getPostById() {
    this.postService.getPostById(this.postId).subscribe({
      next: (res) => {
        this.postData = res;
        console.log(res);
        this.getCommentsByPostId();
      },
      error: (err) => {
        this.matSnackBar.open('Something is not right.', 'Ok');
      },
    });
  }

  likePostById() {
    this.postService.likePostById(this.postId).subscribe({
      next: (res) => {
        this.matSnackBar.open('Post liked successfully', 'Ok');
        this.getPostById();
      },
      error: (err) => {
        this.matSnackBar.open('Something is not right.', 'Ok');
      },
    });
  }

  publishComment() {
    const postedBy = this.commentForm.get('postedBy')?.value;
    const content = this.commentForm.get('content')?.value;

    this.commentService
      .createComment(this.postId, postedBy, content)
      .subscribe({
        next: (res) => {
          this.matSnackBar.open('Comment published successfully', 'Ok');
          this.getCommentsByPostId();
        },
        error: (err) => {
          this.matSnackBar.open('Something is not right.', 'Ok');
        },
      });
  }

  getCommentsByPostId() {
    this.commentService.getAllCommentsByPostId(this.postId).subscribe({
      next: (res) => {
        this.comments = res;
      },
      error: (err) => {
        this.matSnackBar.open('Something is not right.', 'Ok');
      },
    });
  }
}
