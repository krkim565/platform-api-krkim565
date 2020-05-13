/* eslint-disable linebreak-style */
import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.coverUrl = req.body.coverUrl;
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
    // res.json({ posts });
    res.send(posts);
  })
    .catch((error) => {
      res.status(400).json({ error });
    });
  // res.send('posts should be returned');
};

export const getPost = (req, res) => {
  // res.send(req.params.id);
  Post.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(300).json({ error });
    });
};
// might need to be changed to remove, but I don't think so
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
  Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(100).json({ error });
    });
  // res.send(req.body);
};
