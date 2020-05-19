/* eslint-disable linebreak-style */
import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.coverUrl = req.body.coverUrl;
  post.author = req.user;
  post.save()
    .then((result) => {
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
  Post.find({}).then((posts) => {
    res.send(posts);
  })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id).populate('author')
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(300).json({ error });
    });
};


export const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
};

export const updatePost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('author')
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(100).json({ error });
    });
};
